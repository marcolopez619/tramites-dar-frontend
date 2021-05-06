import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { BandejaDar } from '../../../tramites/models/tramites.models';
import { DarService } from '../../dar.service';

@Component({
  selector: 'app-bandeja-dar',
  templateUrl: './bandeja-dar.component.html',
  styleUrls: ['./bandeja-dar.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaDarComponent extends BaseComponent  implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['nombreCompleto', 'carrera', 'tipoTramite', 'fechaSolicitud', 'estado', 'acciones' ];
  dataSource = new MatTableDataSource<BandejaDar>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private darService: DarService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaTramites();
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

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getListaTramites(): void {

    this.darService.getTramitesPorAtender().pipe( takeUntil( this.unsubscribe$ )).subscribe( resp =>{
      this.dataSource.data = resp.data;
    });
  }

  onVerDetalleTramite(pElement : BandejaDar ): void {
    // console.log( `Seleccionaste : ${pElement.idSolicitudTramite}` );

    /* const dlgTraspasoUniversidad = this.dialog.open( TraspasoUniversidadComponent,  {
      disableClose: false,
      width: '1000px',
      data: { }
    });
    dlgTraspasoUniversidad.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        console.log( `---> ${result}` );
        // TODO: ACTUALIZAR LA BANDEJA PRINCIPAL.
      }
    }); */
  }

}
