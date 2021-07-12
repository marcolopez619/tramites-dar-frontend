import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
import { BandejaCambioCarrera, BandejaSuspencion } from '../../../../tramites/models/tramites.models';
import { EstudianteService } from '../../../estudiante.service';
import { ImpresionFormularioCambioCarrera } from '../../../models/cambio_carrera.model';
import { CambioCarreraService } from '../../cambio-carrera.service';
import { CambioCarreraComponent } from '../cambio-carrera/cambio-carrera.component';

@Component({
  selector: 'app-bandeja-cambio-carrera',
  templateUrl: './bandeja-cambio-carrera.component.html',
  styleUrls: ['./bandeja-cambio-carrera.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaCambioCarreraComponent extends BaseComponent  implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['origen', 'destino', 'fechaSolicitud', 'motivo', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<BandejaCambioCarrera>();
  isTramiteHabilitado: boolean;
  existenTramitesEnCurso: boolean;
  eEstado = eEstado;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private dialog: MatDialog,
    private cambioCarreraService: CambioCarreraService,
    private matSnackBar: MatSnackBar,
    private reportesService: ReportesService,
    private tramitesAcademicosService: TramitesAcademicosService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaCambiosCarrera();
    this.verificarTramitesEncCurso();
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

    this.tramitesAcademicosService.verificarHabilitacionTramite( eTipoTramite.CAMBIO_DE_CARRERA, idEstudiante ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( resp => {
      this.isTramiteHabilitado = resp.data.isTramiteHabilitado;

      if ( !this.isTramiteHabilitado ) {
        this.matSnackBar.open( 'NOTA: EL TRAMITE PARA REALIZAR CAMBIOS DE CARRERA HA FINALIZADO', 'Cerrar', {
          panelClass : 'mensaje-snack'
        } );
      }
    });
  }

  private verificarTramitesEncCurso(): void {
    const idEstudiante = this.contextService.getItemContexto( 'idEstudiante' );

    this.tramitesAcademicosService.verificarExistenciaTramiteEnCursoOrFinalizado(idEstudiante ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( resp => {
      this.existenTramitesEnCurso = resp.data.existenTramitesEnCurso;
    });
  }

  getListaCambiosCarrera(): void {

    const idEstudiante = this.contextService.getItemContexto('idEstudiante');

    this.cambioCarreraService.getAllListaCambiosCarrera( idEstudiante ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( resp =>{
      this.dataSource.data = resp.data ?? [];

      if ( resp.data ) {
        const itemBandeja = this.dataSource.data[ 0 ];
        this.isTramiteHabilitado = (this.dataSource.data.length > 0 && itemBandeja.idEstado === eEstado.RECHAZADO);
      }
    });

  }

  onNuevaSolicitud(): void {
    const dlgNuevoCambioCarrera = this.dialog.open( CambioCarreraComponent,  {
      disableClose: false,
      width: '1000px',
      data: { }
    });
    dlgNuevoCambioCarrera.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        console.log( `---> ${result}` );
        this.getListaCambiosCarrera();
      }
    });
  }

  async imprimirFormulario(element: BandejaCambioCarrera) {
    const dataForReport : ImpresionFormularioCambioCarrera  =  ( await this.cambioCarreraService.getDatosParaImpresionFormularioCambioCarrera(element.idCambioCarrera, element.idEstudiante).toPromise()).data;

    this.reportesService.printCambioCarreraEstudiante(dataForReport);
  }

  onVerSeguimiento(element: BandejaCambioCarrera) : void{
    const dlgSeguimiento = this.dialog.open( SeguimientoComponent,  {
      disableClose: false,
      width: '1000px',
      data: {
        idTramite : element.idCambioCarrera,
        idTipoTramite : eTipoTramite.CAMBIO_DE_CARRERA
      }
    });
    dlgSeguimiento.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      /* if (result) {
        this.getListaAnulaciones();
      } */
    });
  }

}
