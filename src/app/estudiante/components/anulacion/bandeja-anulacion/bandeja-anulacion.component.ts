import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { fadeInAnim, slideInLeftAnim } from '../../../../shared/animations/template.animation';
import { BaseComponent } from '../../../../shared/base.component';
import { eTipoTramite } from '../../../../shared/enums/tipoTramite.enum';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { TramitesAcademicosService } from '../../../../shared/services/tramites-academicos.service';
import { BandejaAnulacion } from '../../../models/anulacion.models';
import { AnulacionComponent } from '../anulacion.component';
import { AnulacionService } from '../anulacion.service';

@Component({
  selector: 'app-bandeja-anulacion',
  templateUrl: './bandeja-anulacion.component.html',
  styleUrls: ['./bandeja-anulacion.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaAnulacionComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['carrera', 'fechaSolicitud', 'motivo', 'estado', 'entidadDestino', 'acciones'];
  dataSource = new MatTableDataSource<BandejaAnulacion>([]);
  isTramiteHabilitado: boolean;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private dialog: MatDialog,
    private anulacionService: AnulacionService,
    private matSnackBar: MatSnackBar,
    private tramitesAcademicosService: TramitesAcademicosService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaAnulaciones();
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

  private getListaAnulaciones(): void {
    const idEstudiante = this.contextService.getItemContexto('idEstudiante');

    this.anulacionService.getAllListaAnulaciones( idEstudiante ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( resp => {
      this.dataSource.data = resp.data ?? [];
    });

  }

  private verificarHabilitacionTramite(): void{
    this.tramitesAcademicosService.verificarHabilitacionTramite( eTipoTramite.ANULACION ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( resp => {
      this.isTramiteHabilitado = resp.data.isTramiteHabilitado;

      if ( !this.isTramiteHabilitado ) {
        this.matSnackBar.open( 'NOTA: EL TRAMITE PARA REALIZAR LAS ANULACIONES HA FINALIZADO', 'Cerrar' );
      }
    });
  }

  actualizarBandeja(): void {
    this.getListaAnulaciones();
  }

  onNuevaSolicitud(): void {
    const dlgNuevaSolicitud = this.dialog.open( AnulacionComponent,  {
      disableClose: false,
      width: '1000px',
      data: {
        idEstudiante : this.contextService.getItemContexto('idEstudiante')
      }
    });
    dlgNuevaSolicitud.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        console.log( `---> ${result}` );
        this.getListaAnulaciones();
      }
    });
  }

}
