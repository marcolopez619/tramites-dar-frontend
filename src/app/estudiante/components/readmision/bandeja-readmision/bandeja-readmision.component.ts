import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../../shared/animations/template.animation';
import { BaseComponent } from '../../../../shared/base.component';
import { eEstado } from '../../../../shared/enums/estado.enum';
import { eTipoTramite } from '../../../../shared/enums/tipoTramite.enum';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
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
  eEstado = eEstado;

  displayedColumns = ['carrera', 'fechaSolicitudSuspencion', 'fechaSolicitudReadmision', 'motivo', 'tiempo', 'estado', 'acciones' ];
  dataSource = new MatTableDataSource<BandejaReadmision>([]);

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private dialog: MatDialog,
    private readmisionService: ReadmisionService,
    private matSnackBar: MatSnackBar,
    private tramitesAcademicosService: TramitesAcademicosService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaReadmisiones();
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
    this.tramitesAcademicosService.verificarHabilitacionTramite( eTipoTramite.READMISION ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( resp => {
      this.isTramiteHabilitado = resp.data.isTramiteHabilitado;

      if ( !this.isTramiteHabilitado ) {
        this.matSnackBar.open( 'NOTA: EL TRAMITE PARA REALIZAR LAS READMISIONES HA FINALIZADO', 'Cerrar' );
      }
    });
  }

  getListaReadmisiones(): void {
    const idEstudiante = this.contextService.getItemContexto('idEstudiante');

    this.readmisionService.getAllListaReadmisiones( idEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.dataSource.data = resp.data ?? [];
    });
  }

  onNuevaSolicitud(): void {
    const dlgReadmision = this.dialog.open( ReadmisionComponent,  {
      disableClose: false,
      width: '1000px',
      data: { }
    });
    dlgReadmision.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        this.getListaReadmisiones();
      }
    });
  }

}
