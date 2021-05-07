import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../../shared/animations/template.animation';
import { BaseComponent } from '../../../../shared/base.component';
import { UniversidadCarreraComponent } from '../../../../shared/components/universidad-carrera/universidad-carrera.component';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { UniversidadService } from '../../../../shared/services/universidad.service';
import { BandejaUniversidades } from '../../../../tramites/models/tramites.models';
import { UniversidadComponent } from '../universidad/universidad.component';

@Component({
  selector: 'app-bandeja-universidades',
  templateUrl: './bandeja-universidades.component.html',
  styleUrls: ['./bandeja-universidades.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaUniversidadesComponent extends BaseComponent  implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['universidad', 'estado' , 'acciones'];
  dataSource = new MatTableDataSource<BandejaUniversidades>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private dialog: MatDialog,
    private universidadService: UniversidadService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaUniversidades();
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

  /* aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } */

  private getListaUniversidades(): void {
    this.universidadService.getAllListaUniversidades().pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      /* // TODO:  Filtrar la suniversidades que no pertenescan al usuario loggeado
      const idUniversidadUsuarioLoggeado = 1; // FIXME: dato quemado
      this.dataSource.data = (resp.data as Array<BandejaUniversidades>).filter( x=> x.idUniversidad != idUniversidadUsuarioLoggeado); */
      this.dataSource.data = (resp.data as Array<BandejaUniversidades>);
    });
  }

  onAnadirEditUniversidad(universidadSelected?: BandejaUniversidades): void{
    const dlgEditUniversidad = this.dialog.open( UniversidadCarreraComponent,  {
      disableClose: false,
      width: '1000px',
      data: {
        universidadSelected : universidadSelected,
        isUniversidadOperation : true
        /* isEditarUniversidad : true,
        selectedData: { nombre: 'ALGUNA UNIVERSIDAD', estado : true } */
      }
    });
    dlgEditUniversidad.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        this.getListaUniversidades()
      }
    });
  }

  /* onAnadirEditarUniversidad(isAnadir?: boolean): void{
    const dlgAnadirUniversidad = this.dialog.open( UniversidadComponent,  {
      disableClose: false,
      width: '1000px',
      data: {
        isAnadir : isAnadir
      }
    });
    dlgAnadirUniversidad.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        console.log( `---> ${result}` );
        // TODO: ACTUALIZAR LA BANDEJA PRINCIPAL.
      }
    });
  } */

}
