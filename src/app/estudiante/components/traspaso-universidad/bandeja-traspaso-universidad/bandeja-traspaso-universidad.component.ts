import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../../shared/animations/template.animation';
import { BaseComponent } from '../../../../shared/base.component';
import { eTipoTramite } from '../../../../shared/enums/tipoTramite.enum';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { TramitesAcademicosService } from '../../../../shared/services/tramites-academicos.service';
import { BandejaTraspasoUniversidad } from '../../../../tramites/models/tramites.models';
import { TraspasoUniversidadService } from '../traspaso-universidad.service';
import { TraspasoUniversidadComponent } from '../traspaso-universidad/traspaso-universidad.component';

@Component({
  selector: 'app-bandeja-traspaso-universidad',
  templateUrl: './bandeja-traspaso-universidad.component.html',
  styleUrls: ['./bandeja-traspaso-universidad.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaTraspasoUniversidadComponent extends BaseComponent  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns = ['universidadDestino', 'carreraDestino', 'periodo', 'motivo', 'fechaSolicitud', 'estado', 'acciones' ];
  dataSource = new MatTableDataSource<BandejaTraspasoUniversidad>([]);
  isTramiteHabilitado: boolean;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private dialog: MatDialog,
    private traspasoUniversidadService: TraspasoUniversidadService,
    private matSnackBar: MatSnackBar,
    private tramitesAcademicosService: TramitesAcademicosService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaTraspasos();
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
    this.tramitesAcademicosService.verificarHabilitacionTramite( eTipoTramite.ANULACION ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( resp => {
      this.isTramiteHabilitado = resp.data.isTramiteHabilitado;

      if ( !this.isTramiteHabilitado ) {
        this.matSnackBar.open( 'NOTA: EL TRAMITE PARA REALIZAR LOS TRASPASOS ENTRE UNIVERSIDADE HA FINALIZADO', 'Cerrar' );
      }
    });
  }

  getListaTraspasos(): void {

    const idEstudiante = this.contextService.getItemContexto('idEstudiante');

    this.traspasoUniversidadService.getAllTraspasos( idEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.dataSource.data = resp.data ?? [];
    });

  }

  onNuevaSolicitud(): void {
    const dlgTraspasoUniversidad = this.dialog.open( TraspasoUniversidadComponent,  {
      disableClose: false,
      width: '1000px',
      data: { }
    });
    dlgTraspasoUniversidad.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        console.log( `---> ${JSON.stringify(result) }` );
        this.getListaTraspasos();
      }
    });
  }
}
