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
import { ReadmisionService } from '../readmision.service';
import { ReadmisionComponent } from '../readmision/readmision.component';

@Component({
  selector: 'app-bandeja-readmision',
  templateUrl: './bandeja-readmision.component.html',
  styleUrls: ['./bandeja-readmision.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaReadmisionComponent extends BaseComponent  implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns = ['carrera', 'fechaSolicitudSuspencion', 'fechaSolicitudReadmision', 'tiempo', 'estado', 'acciones' ];
  dataSource = new MatTableDataSource<BandejaReadmision>([]);


  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private dialog: MatDialog,
    private readmisionService: ReadmisionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaReadmisiones();
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

  private getListaReadmisiones(): void {
    const idEstudiante = 1; // FIXME: dato quemado para recuperar del contexto

    this.readmisionService.getAllListaSuspenciones( idEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.dataSource.data = resp.data;
    });
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
