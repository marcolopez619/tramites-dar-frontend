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
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { ReportesService } from '../../../../shared/services/reportes.service';
import { TramitesAcademicosService } from '../../../../shared/services/tramites-academicos.service';
import { BandejaReadmision } from '../../../../tramites/models/tramites.models';
import { ReadmisionService } from '../readmision.service';
import { ReadmisionComponent } from '../readmision/readmision.component';

@Component({
  selector: 'app-bandeja-readmision',
  templateUrl: './bandeja-readmision.component.html',
  styleUrls: ['./bandeja-readmision.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaReadmisionComponent extends BaseComponent  implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  isTramiteHabilitado: boolean;
  existenTramitesEnCurso: boolean;
  eEstado = eEstado;

  displayedColumns = ['carrera', 'fechaSolicitudSuspencion', 'fechaSolicitudReadmision', 'motivo', 'tiempo', 'estado', 'acciones' ];
  dataSource = new MatTableDataSource<BandejaReadmision>([]);

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private dialog: MatDialog,
    private readmisionService: ReadmisionService,
    private reportesService: ReportesService,
    private matSnackBar: MatSnackBar,
    private tramitesAcademicosService: TramitesAcademicosService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaReadmisiones();
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
  private verificarHabilitacionTramite(): void {
    const idEstudiante = this.contextService.getItemContexto( 'idEstudiante' );

    this.tramitesAcademicosService.verificarHabilitacionTramite( eTipoTramite.READMISION, idEstudiante ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( resp => {
      this.isTramiteHabilitado = resp.data.isTramiteHabilitado;

      if ( !this.isTramiteHabilitado ) {
        this.matSnackBar.open( 'NOTA: EL TRAMITE PARA REALIZAR LAS READMISIONES HA FINALIZADO', 'Cerrar', {
          panelClass : 'mensaje-snack'
        } );
      }
    });
  }

  private getIdSuspencionesUtilizadas(): Array<number>{
    let listaIdSuspenciones = [];

    if (this.dataSource.data?.length > 0) {
      listaIdSuspenciones = this.dataSource.data.map( x => x.suspencion[ 0 ].idSuspencion);
    }

    return listaIdSuspenciones;
  }

  private verificarTramitesEncCurso(): void {
    const idEstudiante = this.contextService.getItemContexto( 'idEstudiante' );

    this.tramitesAcademicosService.verificarExistenciaTramiteEnCurso(idEstudiante ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( resp => {
      this.existenTramitesEnCurso = resp.data.existenTramitesEnCurso;
    });
  }

  getListaReadmisiones(): void {
    const idEstudiante = this.contextService.getItemContexto('idEstudiante');

    this.readmisionService.getAllListaReadmisiones( idEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.dataSource.data = resp.data ?? [];
    });
  }

  onNuevaSolicitud(): void {
    // const listaIdsSuspencionesUtilizadas = this.getIdSuspencionesUtilizadas()
    const dlgReadmision = this.dialog.open( ReadmisionComponent,  {
      disableClose: false,
      width: '1000px',
      data: {
        listaIdsSuspencionesUtilizadas : this.getIdSuspencionesUtilizadas()
       }
    });
    dlgReadmision.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        this.getListaReadmisiones();
      }
    });
  }

  async imprimirFormulario(element: BandejaReadmision) {
    const dataForReport =  ( await this.readmisionService.getDatosParaImpresionFormularioReadmision(element.idReadmision, element.idEstudiante) .toPromise()).data;
    this.reportesService.printReadmisionEstudiante( dataForReport );
  }

  onVerSeguimiento(element: BandejaReadmision) : void{
    const dlgSeguimiento = this.dialog.open( SeguimientoComponent,  {
      disableClose: false,
      width: '1000px',
      data: {
        idTramite : element.idReadmision,
        idTipoTramite : eTipoTramite.READMISION
      }
    });
    dlgSeguimiento.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      /* if (result) {
        this.getListaAnulaciones();
      } */
    });
  }

}
