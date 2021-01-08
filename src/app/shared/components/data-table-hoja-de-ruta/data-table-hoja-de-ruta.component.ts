import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HojaRutaBandejaModel } from '../../../hoja-de-ruta/models/hoja-de-ruta.model';
import { fadeInAnim, slideInLeftAnim, zoomInAnim } from '../../animations/template.animation';
import { BaseComponent } from '../../base.component';
import { ContextoService } from '../../services/contexto.service';
import { LangService } from '../../services/lang.service';
import { DataTableHRMouseModel, Estado, Accion } from '../../models/data-table-hr-mouse.model';

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

  mouseOverModel: DataTableHRMouseModel = {};

  @Input()
  listaBandejaHojaRuta: Array<HojaRutaBandejaModel>;

  @Input()
  bandeja: string;

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
    this.crearAccionesMouseOver();
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

  private crearAccionesMouseOver(): void {

    switch (this.bandeja.toUpperCase()) {
      case 'PRINCIPAL': {
        const acciones : Array<Accion> = [{
          descAccion : 'enviar',
          tooltipText : 'Enviar',
          icono : 'send'
        },
        {
          descAccion : 'editar',
          tooltipText : 'Editar',
          icono : 'edit'
        },
        {
          descAccion : 'adjuntar_documento',
          tooltipText : 'Adjuntar documento',
          icono : 'attachment'
        }
      ];

        const estados: Array<Estado> = [{
          descEstado : 'creado',
          acciones : acciones
        }];

        this.mouseOverModel.descBandeja = this.bandeja;
        this.mouseOverModel.estados = estados;
        break;
      }

      default:
        break;
    }
  }

  onMouseOver(row: HojaRutaBandejaModel): void {
    row.isRowMouseOver = true;
    this.showMouseOverActions = true;
  }
  onMouseLeave(row: HojaRutaBandejaModel): void {
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
