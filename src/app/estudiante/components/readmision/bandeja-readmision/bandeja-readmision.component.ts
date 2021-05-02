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
import { BandejaReadmision } from '../../../../tramites/models/tramites.models';
import { ReadmisionComponent } from '../readmision/readmision.component';

@Component({
  selector: 'app-bandeja-readmision',
  templateUrl: './bandeja-readmision.component.html',
  styleUrls: ['./bandeja-readmision.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaReadmisionComponent extends BaseComponent  implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['carrera', 'fechaSolicitudSuspencion', 'fechaSolicitudReadmision', 'tiempo', 'estado', 'acciones' ];
  dataSource = new MatTableDataSource<BandejaReadmision>([]);

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
    this.getListaReadmisiones(32926);
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

  private getListaReadmisiones(pRu: number ): void {
    const data :  Array<BandejaReadmision> = [{
      idReadmision            : 1,
      idCarrera               : 1,
      carrera                 : 'INGENIERIA MECANICA',
      fechaSolicitudSuspencion: new Date(),
      fechaSolicitudReadmision: new Date(),
      tiempo                  : '1 Gestion',
      estado                  : 4
    },{
      idReadmision            : 2,
      idCarrera               : 2,
      carrera                 : 'INGENIERIA MECANICA',
      fechaSolicitudSuspencion: new Date(),
      fechaSolicitudReadmision: new Date(),
      tiempo                  : '4 Gestiones',
      estado                  : 3
    }];
    this.dataSource.data = data;
  }

  onNuevaSolicitud(): void {
    const dlgReadmision = this.dialog.open( ReadmisionComponent,  {
      disableClose: false,
      width: '1000px',
      data: { }
    });
    dlgReadmision.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        console.log( `---> ${result}` );
        // TODO: ACTUALIZAR LA BANDEJA PRINCIPAL.
      }
    });
  }

}
