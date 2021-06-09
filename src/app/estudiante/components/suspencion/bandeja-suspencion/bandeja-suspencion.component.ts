import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../../shared/animations/template.animation';
import { BaseComponent } from '../../../../shared/base.component';
import { SeguimientoComponent } from '../../../../shared/components/seguimiento/seguimiento.component';
import { eEstado } from '../../../../shared/enums/estado.enum';
import { eTipoTramite } from '../../../../shared/enums/tipoTramite.enum';
import { EstudianteModel } from '../../../../shared/models/estudiante.model';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { ReportesService } from '../../../../shared/services/reportes.service';
import { TramitesAcademicosService } from '../../../../shared/services/tramites-academicos.service';
import { BandejaSuspencion } from '../../../../tramites/models/tramites.models';
import { EstudianteService } from '../../../estudiante.service';
import { SuspencionService } from '../suspencion.service';
import { SuspencionComponent } from '../suspencion/suspencion.component';

@Component({
  selector: 'app-bandeja-suspencion',
  templateUrl: './bandeja-suspencion.component.html',
  styleUrls: ['./bandeja-suspencion.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaSuspencionComponent extends BaseComponent  implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['carrera', 'tiempo', 'motivo', 'fechaSolicitud', 'estado', 'acciones' ];
  dataSource = new MatTableDataSource<BandejaSuspencion>([]);
  isTramiteHabilitado: boolean;
  datosEstudiante: EstudianteModel;
  eEstado = eEstado;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private estudianteService: EstudianteService,
    private dialog: MatDialog,
    private suspencionService: SuspencionService,
    private reportesService: ReportesService,
    private matSnackBar: MatSnackBar,
    private tramitesAcademicosService: TramitesAcademicosService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaSuspenciones();
  }

  ngAfterViewInit(): void {
    if (this.dataSource !== undefined) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    this.verificarHabilitacionTramite();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.matSnackBar.dismiss();
  }

  private verificarHabilitacionTramite(): void{
    const idEstudiante = this.contextService.getItemContexto( 'idEstudiante' );

    this.tramitesAcademicosService.verificarHabilitacionTramite( eTipoTramite.SUSPENCION, idEstudiante ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( resp => {
      this.isTramiteHabilitado = resp.data.isTramiteHabilitado;

      if ( !this.isTramiteHabilitado ) {
        this.matSnackBar.open( 'NOTA: EL TRAMITE PARA REALIZAR LAS SUSPENCIONES HA FINALIZADO', 'Cerrar' );
      }
    });
  }

  getListaSuspenciones(): void {
    const idEstudiante = this.contextService.getItemContexto('idEstudiante');

    this.suspencionService.getAllListaSuspenciones(idEstudiante).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.dataSource.data = resp.data ?? [];
    });
  }

  onNuevaSolicitud(): void {
    const dlgSuspencion = this.dialog.open( SuspencionComponent,  {
      disableClose: false,
      width: '1000px',
      data: { }
    });
    dlgSuspencion.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        console.log( `---> ${result}` );
        this.getListaSuspenciones();
      }
    });
  }

  async imprimirFormulario(element: BandejaSuspencion) {
    this.datosEstudiante =  ( await this.estudianteService.getInformacionEstudiante(element.idEstudiante).toPromise()).data;
    this.datosEstudiante.fechaSolicitud = element.fechaSolicitud;
    this.reportesService.printSuspencionEstudiante(this.datosEstudiante, element.descripcion, element.tiempoSolicitado);
  }

  onVerSeguimiento(element: BandejaSuspencion) : void{
    const dlgSeguimiento = this.dialog.open( SeguimientoComponent,  {
      disableClose: false,
      width: '1000px',
      data: {
        idTramite : element.idSuspencion,
        idTipoTramite : eTipoTramite.SUSPENCION
      }
    });
    dlgSeguimiento.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      /* if (result) {
        this.getListaAnulaciones();
      } */
    });
  }
}
