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
import { BandejaCambioCarrera } from '../../../../tramites/models/tramites.models';
import { CambioCarreraComponent } from '../cambio-carrera/cambio-carrera.component';

@Component({
  selector: 'app-bandeja-cambio-carrera',
  templateUrl: './bandeja-cambio-carrera.component.html',
  styleUrls: ['./bandeja-cambio-carrera.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaCambioCarreraComponent extends BaseComponent  implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['origen', 'destino', 'fechaSolicitud', 'motivo', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<BandejaCambioCarrera>([]);

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
    this.getListaCambiosCarrera(32926);
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

  private getListaCambiosCarrera(pRu: number ): void {

    const data :  Array<
    BandejaCambioCarrera> = [{
      idCambioCarrera : 1,
      idOrigen      : 1,
      origen        : 'INGENIERIA INFORMATICA',
      idDestino     : 2,
      destino       : 'TRABAJO SOCIAL',
      fechaSolicitud: new Date(),
      estado        : 'EN PROCESO',
      motivo        : 'MOTIVOS PERSONALES Y LABORALESSSS'
    }, {
      idCambioCarrera : 2,
      idOrigen      : 4,
      origen        : 'INGENIERIA AGROINDUSTRIAL',
      idDestino     : 1,
      destino       : 'INGENIERIA INFORMATICA',
      fechaSolicitud: new Date(),
      estado        : 'FINALIZADO',
      motivo        : 'POR ALGUN MOTIVO QUE NO TE INTERESA'
    }]

    this.dataSource.data = data;
  }

  onNuevaSolicitud(): void {
    const dlgNuevoCambioCarrera = this.dialog.open( CambioCarreraComponent,  {
      disableClose: false,
      width: '1000px',
      data: { }
    });
    dlgNuevoCambioCarrera.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        console.log( `---> ${result}` );
        // TODO: ACTUALIZAR LA BANDEJA PRINCIPAL.
      }
    });
  }

}
