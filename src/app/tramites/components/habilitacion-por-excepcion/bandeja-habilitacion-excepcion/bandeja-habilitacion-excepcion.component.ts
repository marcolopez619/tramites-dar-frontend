import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../../shared/animations/template.animation';
import { BaseComponent } from '../../../../shared/base.component';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { BandejaHabilitacionPorExcepcion, BandejaTramite } from '../../../models/tramites.models';
import { TramitesService } from '../../../tramites.service';
import { NuevoTramiteComponent } from '../../nuevo-tramite/nuevo-tramite.component';

@Component({
  selector: 'app-bandeja-habilitacion-excepcion',
  templateUrl: './bandeja-habilitacion-excepcion.component.html',
  styleUrls: ['./bandeja-habilitacion-excepcion.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaHabilitacionExcepcionComponent  extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['ci', 'nombreCompleto', 'carrera', 'rangoFechas', 'tiempo', 'tramite', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<BandejaHabilitacionPorExcepcion>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private dialog: MatDialog,
    private tramitesService: TramitesService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaTramitesPorExcepcion();
  }

  ngAfterViewInit(): void {
    if (this.dataSource !== undefined) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  private getListaTramitesPorExcepcion(): void {
    this.tramitesService.getAllListaTramitesPorExcepcion().pipe( takeUntil(this.unsubscribe$)).subscribe( allTramites => {
      this.dataSource.data = allTramites.data;
    });
  }

  onAddEditTramite(elementToEdit?: BandejaTramite): void {
    const dlgNuevoTramite = this.dialog.open( NuevoTramiteComponent,  {
      disableClose: false,
      width: '1000px',
      data: {
        elementBandejaTramite : elementToEdit
       }
    });
    dlgNuevoTramite.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        this.getListaTramitesPorExcepcion();
      }
    });
  }

}
