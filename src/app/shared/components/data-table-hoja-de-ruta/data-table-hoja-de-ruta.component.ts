import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HojaRutaBandejaModel } from '../../../hoja-de-ruta/models/hoja-de-ruta.model';
import { fadeInAnim, slideInLeftAnim, zoomInAnim } from '../../animations/template.animation';
import { BaseComponent } from '../../base.component';
import { ContextoService } from '../../services/contexto.service';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'sh-data-table-hoja-de-ruta',
  templateUrl: './data-table-hoja-de-ruta.component.html',
  styleUrls: ['./data-table-hoja-de-ruta.component.css'],
  animations: [fadeInAnim, zoomInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@zoomInAnim]': 'true', 'fadeInAnim' : 'true' }
})
export class DataTableHojaDeRutaComponent extends BaseComponent  implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['tipoTramiteDes', 'nombreRemitente', 'descripcionDoc', 'cite', 'nombreDestinatario', 'referencia', 'estado'];
  dataSource = new MatTableDataSource<HojaRutaBandejaModel>([]);

  @Input()
  listaBandejaHojaRuta: Array<HojaRutaBandejaModel>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  showMouseOverActions = false;

  constructor(
    public contextService: ContextoService,
    public langService: LangService
  ) {
    super();
  }

  ngOnInit(): void {
    this.dataSource.data = this.listaBandejaHojaRuta;
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  onMouseOver(row: HojaRutaBandejaModel): void{
    row.isRowMouseOver = true;
    this.showMouseOverActions = true;
  }
  onMouseLeave(row: HojaRutaBandejaModel): void{
    row.isRowMouseOver = false;
    this.showMouseOverActions = false;
  }

  onCrearHojadeRuta(): void {
    /* const dlgNuevoCite = this.dialog.open( HojaDeRutaComponent,  {
      disableClose: false,
      width: '1000px',
      data: {
      }
    });
      dlgNuevoCite.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        //..
      }
    }); */
  }


}
