import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { DarService } from '../../../dar/dar.service';
import { DirectorService } from '../../../director/director.service';
import { BandejaDar, BandejaDirector } from '../../../tramites/models/tramites.models';
import { fadeInAnim, slideInLeftAnim } from '../../animations/template.animation';
import { BaseComponent } from '../../base.component';
import { ContextoService } from '../../services/contexto.service';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-bandeja-tramites-atendidos',
  templateUrl: './bandeja-tramites-atendidos.component.html',
  styleUrls: ['./bandeja-tramites-atendidos.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaTramitesAtendidosComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['nombreCompleto', 'carrera', 'tipoTramite', 'fechaProceso', 'estado', 'observaciones' ];
  dataSource = new MatTableDataSource<BandejaDar | BandejaDirector >([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private darService: DarService,
    private directorService: DirectorService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaTramitesAtendidos();
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

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListaTramitesAtendidos(): void {

    const idPerfil = this.contextService.getItemContexto('recursos')[ 0 ].idPerfil;
    const idCarrera = this.contextService.getItemContexto('idCarrera');

    if (idCarrera >= 1000) {
      // => es encargado del DAR
      this.darService.getTramitesAtendidos().pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
        this.dataSource.data = resp.data ?? [];
      });

    } else {
      // Sino , es Director de cualquier tipo
      this.directorService.getTramitesAtendidos(idPerfil).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
        this.dataSource.data = resp.data ?? [];
      });

    }

  }

  goToMenu(): void{
    this.router.navigate([ '/menu' ]);
  }

 /*  onVerDetalleTramite(pElement: BandejaDar ): void {
    localStorage.setItem( 'selectedTramite', JSON.stringify( pElement ) );
    this.router.navigate([ 'dar/detalle/tramite' ]);
  } */

}
