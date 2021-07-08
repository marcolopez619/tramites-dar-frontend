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
import { BandejaTranseferencia } from '../../../../tramites/models/tramites.models';
import { ImpresionFormularioTransferenciaCarrera } from '../../../models/transferencia.model';
import { CambioCarreraService } from '../../cambio-carrera.service';
import { TransferenciaService } from '../transferencia.service';
import { TransferenciaComponent } from '../transferencia/transferencia.component';

@Component({
  selector: 'app-bandeja-transferencia',
  templateUrl: './bandeja-transferencia.component.html',
  styleUrls: ['./bandeja-transferencia.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaTransferenciaComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['origen', 'destino', 'fechaSolicitud', 'motivo', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<BandejaTranseferencia>([]);
  isTramiteHabilitado: boolean;
  existenTramitesEnCurso: boolean;
  eEstado = eEstado;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private dialog: MatDialog,
    private reportesService: ReportesService,
    private transferenciaService: TransferenciaService,
    private matSnackBar: MatSnackBar,
    private tramitesAcademicosService: TramitesAcademicosService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaTranseferencias();
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

    this.tramitesAcademicosService.verificarHabilitacionTramite( eTipoTramite.TRANSFERENCIA, idEstudiante ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( resp => {
      this.isTramiteHabilitado = resp.data.isTramiteHabilitado;

      if ( !this.isTramiteHabilitado ) {
        this.matSnackBar.open( 'NOTA: EL TRAMITE PARA REALIZAR LAS TRANSFERENCIAS HA FINALIZADO', 'Cerrar', {
          panelClass : 'mensaje-snack'
        } );
      }
    });
  }

  private verificarTramitesEncCurso(): void {
    const idEstudiante = this.contextService.getItemContexto( 'idEstudiante' );

    this.tramitesAcademicosService.verificarExistenciaTramiteEnCurso(idEstudiante ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( resp => {
      this.existenTramitesEnCurso = resp.data.existenTramitesEnCurso;
    });
  }

  getListaTranseferencias(): void {

    const idEstudiante = this.contextService.getItemContexto('idEstudiante');

    this.transferenciaService.getListaTransferencias( idEstudiante ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( resp => {
      this.dataSource.data = resp.data ?? [];

      if ( resp.data ) {
        const itemBandeja = this.dataSource.data[ 0 ];
        this.isTramiteHabilitado = (this.dataSource.data.length > 0 && itemBandeja.idEstado === eEstado.RECHAZADO);
      }
    });

  }

  onNuevaSolicitud(): void {
    const dlgNuevoCambioCarrera = this.dialog.open( TransferenciaComponent,  {
      disableClose: false,
      width: '1000px',
      data: { }
    });
    dlgNuevoCambioCarrera.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        console.log( `---> ${result}` );
        this.getListaTranseferencias();
      }
    });
  }

  async imprimirFormulario(element: BandejaTranseferencia) {
    const dataForReport: ImpresionFormularioTransferenciaCarrera = ( await this.transferenciaService.getDatosParaImpresionFormularioTransferenciaCarrera(element.idTransferencia, element.idEstudiante).toPromise()).data;
    this.reportesService.printTransferenciaCarreraEstudiante(dataForReport);
  }

  onVerSeguimiento(element: BandejaTranseferencia): void {
    const dlgSeguimiento = this.dialog.open( SeguimientoComponent,  {
      disableClose: false,
      width: '1000px',
      data: {
        idTramite : element.idTransferencia,
        idTipoTramite : eTipoTramite.TRANSFERENCIA
      }
    });
    dlgSeguimiento.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      /* if (result) {
        this.getListaAnulaciones();
      } */
    });
  }
}
