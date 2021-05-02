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
import { BandejaSuspencion } from '../../../../tramites/models/tramites.models';
import { CambioCarreraComponent } from '../../cambio-carrera/cambio-carrera/cambio-carrera.component';
import { SuspencionComponent } from '../suspencion/suspencion.component';

@Component({
  selector: 'app-bandeja-suspencion',
  templateUrl: './bandeja-suspencion.component.html',
  styleUrls: ['./bandeja-suspencion.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaSuspencionComponent extends BaseComponent  implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['carrera', 'tiempo', 'rango', 'motivo', 'fechaSolicitud', 'estado', 'acciones' ];
  dataSource = new MatTableDataSource<BandejaSuspencion>([]);

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
    this.getListaSuspenciones(32926);
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

  private getListaSuspenciones(pRu: number ): void {
    const data :  Array<
    BandejaSuspencion> = [{
      idSuspencion  : 1,
      idCarrera     : 1,
      carrera       : 'INGENIERIA MECANICA',
      tiempo        : '1 Gestion',
      fechaInicio   : new Date(),
      fechaFinal    : new Date(),
      motivo        : 'ALGUN MOTIVO LARRRGOOO QUE NO ME INTERASA',
      fechaSolicitud: new Date(),
      estado        : 5
    },{
      idSuspencion  : 2,
      idCarrera     : 2,
      carrera       : 'INGENIERIA MECANICA',
      tiempo        : '4 Gestiones',
      fechaInicio   : new Date(),
      fechaFinal    : new Date(),
      motivo        : 'MOTIVOS LABORALES Y FAMILIARES',
      fechaSolicitud: new Date(),
      estado        : 4
    }];
    this.dataSource.data = data;
  }

  onNuevaSolicitud(): void {
    const dlgSuspencion = this.dialog.open( SuspencionComponent,  {
      disableClose: false,
      width: '1000px',
      data: { }
    });
    dlgSuspencion.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        console.log( `---> ${result}` );
        // TODO: ACTUALIZAR LA BANDEJA PRINCIPAL.
      }
    });
  }
}
