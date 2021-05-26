import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../../shared/animations/template.animation';
import { BaseComponent } from '../../../../shared/base.component';
import { PeriodoGestion } from '../../../../shared/models/periodo_gestion.model';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { PeriodoGestionService } from '../../../../shared/services/periodo-gestion.service';
import { HabilitacionGestionComponent } from '../habilitacion-gestion/habilitacion-gestion.component';

@Component({
  selector: 'app-bandeja-habilitacion-gestiones',
  templateUrl: './bandeja-habilitacion-gestiones.component.html',
  styleUrls: ['./bandeja-habilitacion-gestiones.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaHabilitacionGestionesComponent  extends BaseComponent  implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['periodoGestion', 'fechaModificacion', 'estado', 'acciones' ];
  dataSource = new MatTableDataSource<PeriodoGestion>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private dialog: MatDialog,
    private periodoGestionService: PeriodoGestionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaGestiones();
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

  /* aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } */

  getListaGestiones(): void {
    this.periodoGestionService.getAllPeriodos().pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.dataSource.data = resp.data ?? [];
    });
  }

  onAnadirEditarGestion(pElement?: PeriodoGestion ): void {
    const dlgGestion = this.dialog.open( HabilitacionGestionComponent,  {
      disableClose: false,
      width: '1000px',
      data: {
        elementSelected : pElement
       }
    });
    dlgGestion.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        this.getListaGestiones();
      }
    });
  }
}
