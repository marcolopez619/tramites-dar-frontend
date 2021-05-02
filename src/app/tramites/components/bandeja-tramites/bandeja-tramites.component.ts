import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { BandejaTramite } from '../../models/tramites.models';
import { TramitesService } from '../../tramites.service';
import { NuevoTramiteComponent } from '../nuevo-tramite/nuevo-tramite.component';

@Component({
  selector: 'app-bandeja-tramites',
  templateUrl: './bandeja-tramites.component.html',
  styleUrls: ['./bandeja-tramites.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaTramitesComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['tramite', 'rangoFechas', 'gestion', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<BandejaTramite>([]);

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
    this.getListaTramites();
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

  private getListaTramites(): void {
    this.tramitesService.getAllListaTramites().pipe( takeUntil(this.unsubscribe$)).subscribe( allTramites => {
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
        this.getListaTramites();
      }
    });
  }

}
