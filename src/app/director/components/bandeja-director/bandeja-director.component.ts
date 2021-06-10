import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { DarService } from '../../../dar/dar.service';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { eEstado } from '../../../shared/enums/estado.enum';
import { eTipoTramite } from '../../../shared/enums/tipoTramite.enum';
import { EstadoTramiteUpdate } from '../../../shared/models/tramites.models';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { TramitesAcademicosService } from '../../../shared/services/tramites-academicos.service';
import { BandejaDirector } from '../../../tramites/models/tramites.models';
import { TramitesService } from '../../../tramites/tramites.service';
import { DirectorService } from '../../director.service';

@Component({
  selector: 'app-bandeja-director',
  templateUrl: './bandeja-director.component.html',
  styleUrls: ['./bandeja-director.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaDirectorComponent extends BaseComponent  implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['nombreCompleto', 'carrera', 'tipoTramite', 'fechaSolicitud', 'estado' ];
  dataSource = new MatTableDataSource<BandejaDirector>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private directorService: DirectorService,
    private router: Router
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

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getListaTramites(): void {
    const idCarrera = this.contextService.getItemContexto( 'idCarrera' );

    this.directorService.getTramitesPorAtender( idCarrera ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.dataSource.data = resp.data ?? [];
    });
  }

  onVerDetalleTramite(pElement: BandejaDirector ): void {
    localStorage.setItem( 'selectedTramite', JSON.stringify( pElement ) );
    this.router.navigate([ 'director/detalle/tramite' ]);
  }
}
