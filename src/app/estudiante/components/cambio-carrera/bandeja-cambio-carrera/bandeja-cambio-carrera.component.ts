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
import { CambioCarreraService } from '../../cambio-carrera.service';
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
    private dialog: MatDialog,
    private cambioCarreraService: CambioCarreraService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaCambiosCarrera();
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

  private getListaCambiosCarrera(): void {

    const idEstudiante = 1; // FIXME: Obtener del contexto del sistema

    this.cambioCarreraService.getAllListaCambiosCarrera( idEstudiante ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( resp =>{
      this.dataSource.data = resp.data;
    });

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
