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
import { BandejaTraspasoUniversidad } from '../../../../tramites/models/tramites.models';
import { TraspasoUniversidadComponent } from '../traspaso-universidad/traspaso-universidad.component';

@Component({
  selector: 'app-bandeja-traspaso-universidad',
  templateUrl: './bandeja-traspaso-universidad.component.html',
  styleUrls: ['./bandeja-traspaso-universidad.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaTraspasoUniversidadComponent extends BaseComponent  implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['universidadDestino', 'carreraDestino', 'periodo', 'motivo', 'fechaSolicitud', 'estado', 'acciones' ];
  dataSource = new MatTableDataSource<BandejaTraspasoUniversidad>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaTraspasoUniversidad(32926);
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

  private getListaTraspasoUniversidad(pRu: number ): void {
    const data :  Array<BandejaTraspasoUniversidad> = [{
      idTramite : 1,
      idUniversidadDestino : 1,
      universidadDestino : 'UNIVERSIDAD MAYOR, REAL Y PONTIFICIA DE SAN FRANCISCO XAVIER DE CHUQUISACA',
      idCarreraDestino : 1,
      carreraDestino : 'INGENIERIA EN SISTEMAS',
      idPeriodo : 1,
      periodo : '1/2021',
      motivo : 'ALGUN MOTIVO DE MIERDA PARA Q NO JODAN',
      estado : 'EN PROCESO',
      fechaSolicitud : new Date(2020, 0)
    },{
      idTramite : 2,
      idUniversidadDestino : 2,
      universidadDestino : 'UNIVERSIDAD AUTONOMA GABRIEL RENE MORENO',
      idCarreraDestino : 2,
      carreraDestino : 'ingeniería Agrícola (Montero)'.toUpperCase(),
      idPeriodo : 2,
      periodo : '2/2021',
      motivo : 'SOLICITUD REALIZADA POR MOTIVOS LABORALES Y FAMILIARES',
      estado : 'EN PROCESO',
      fechaSolicitud : new Date(2020, 3)
    }
     ];
    this.dataSource.data = data;
  }

  onNuevaSolicitud(): void {
    const dlgTraspasoUniversidad = this.dialog.open( TraspasoUniversidadComponent,  {
      disableClose: false,
      width: '1000px',
      data: { }
    });
    dlgTraspasoUniversidad.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        console.log( `---> ${result}` );
        // TODO: ACTUALIZAR LA BANDEJA PRINCIPAL.
      }
    });
  }
}
