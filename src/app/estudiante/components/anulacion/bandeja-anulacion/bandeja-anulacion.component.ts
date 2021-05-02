import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { fadeInAnim, slideInLeftAnim } from '../../../../shared/animations/template.animation';
import { BaseComponent } from '../../../../shared/base.component';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { BandejaAnulacion } from '../../../models/anulacion.models';
import { AnulacionComponent } from '../anulacion.component';

@Component({
  selector: 'app-bandeja-anulacion',
  templateUrl: './bandeja-anulacion.component.html',
  styleUrls: ['./bandeja-anulacion.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaAnulacionComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['carrera', 'fechaSolicitud', 'motivo', 'estado'];
  dataSource = new MatTableDataSource<BandejaAnulacion>([]);

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
    this.getListaAnulaciones(32926);
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

  private getListaAnulaciones(pRu: number ): void {
    const data :  Array<BandejaAnulacion> = [{
      idCarrera     : 1,
      carrera       : 'INGENIERIA ELECTRONICA',
      fechaSolicitud: new Date(),
      motivo        : 'SOLICITUD POR NUEVA INSCRIPCION JAJAJAJAJAJJAJA',
      estado        : 5
    }, {
      idCarrera     : 2,
      carrera       : 'ENFERMERIA',
      fechaSolicitud: new Date(),
      motivo        : 'PORQUE NO ME GUSTA LA CARRERA',
      estado        : 2
    }]

    this.dataSource.data = data;
  }

  onNuevaSolicitud(): void {
    const dlgNuevaSolicitud = this.dialog.open( AnulacionComponent,  {
      disableClose: false,
      width: '1000px',
      data: { }
    });
    dlgNuevaSolicitud.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        console.log( `---> ${result}` );
        // TODO: ACTUALIZAR LA BANDEJA PRINCIPAL.
      }
    });
  }

}
