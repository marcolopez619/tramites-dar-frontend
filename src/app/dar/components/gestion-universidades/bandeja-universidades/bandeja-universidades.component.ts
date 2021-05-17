import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../../shared/animations/template.animation';
import { BaseComponent } from '../../../../shared/base.component';
import { UniversidadCarreraComponent } from '../../../../shared/components/universidad-carrera/universidad-carrera.component';
import { eTipoObjetoUniversidad } from '../../../../shared/enums/tipo_objeto_universidad.enum';
import { eTipoOperacion } from '../../../../shared/enums/tipo_operacion.enum';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { UniversidadService } from '../../../../shared/services/universidad.service';
import { BandejaUniversidades } from '../../../../tramites/models/tramites.models';

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
  isButtonAddEditPressed: boolean;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private dialog: MatDialog,
    private router: Router,
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

  getListaUniversidades(): void {
    this.universidadService.getAllListaUniversidades().pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      /* Filtrar la suniversidades que no pertenescan al usuario loggeado */
      const idUniversidadUsuarioLoggeado = this.contextService.getItemContexto( 'idUniversidad' );
      this.dataSource.data = (resp.data as Array<BandejaUniversidades>).filter( x => x.idUniversidad !== idUniversidadUsuarioLoggeado);
    });
  }

  onAnadirEditUniversidad(universidadSelected?: BandejaUniversidades): void {
    this.isButtonAddEditPressed = true;

    const dlgEditUniversidad = this.dialog.open( UniversidadCarreraComponent,  {
      disableClose: false,
      width: '1000px',
      data: {
        objetoUniversidad: eTipoObjetoUniversidad.UNIVERSIDAD,
        operationType    : universidadSelected ? eTipoOperacion.ACTUALIZACION : eTipoOperacion.INSERCION,
        selectedData     : universidadSelected
      }
    });
    dlgEditUniversidad.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        this.getListaUniversidades();
      }
    });
  }

  goToFacultades(selectedUniversidad: BandejaUniversidades): void {
    if ( !this.isButtonAddEditPressed ) {
      localStorage.setItem( 'selectedUniversidad', JSON.stringify( selectedUniversidad ) );
      this.router.navigate( [ 'dar/universidad/facultades' ] );
    }
    this.isButtonAddEditPressed = false;
  }

}
