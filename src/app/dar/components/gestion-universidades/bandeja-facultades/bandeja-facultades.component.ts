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
import { BandejaFacultad, BandejaUniversidades } from '../../../../tramites/models/tramites.models';

@Component({
  selector: 'app-bandeja-facultades',
  templateUrl: './bandeja-facultades.component.html',
  styleUrls: ['./bandeja-facultades.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaFacultadesComponent extends BaseComponent  implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['facultad', 'estado' , 'acciones'];
  dataSource = new MatTableDataSource<BandejaFacultad>([]);
  tituloFacultad: string;
  selectedUniversidad: BandejaUniversidades;
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
    this.selectedUniversidad = JSON.parse( localStorage.getItem( 'selectedUniversidad' ) );
    this.tituloFacultad = this.langService.getLang(this.eModulo.Dar, 'tit-bandeja-facultades').replace('$nombreUniversidad', this.selectedUniversidad.nombre );
    this.getListaFacultades();
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

  getListaFacultades(): void {
    const idUniversidad = this.selectedUniversidad.idUniversidad;

    this.universidadService.getListaFacultades( idUniversidad ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.dataSource.data = resp.data ?? [];
    });
  }

  onAnadirEditFacultad(facultadSelected?: BandejaFacultad): void {
    this.isButtonAddEditPressed = true;
    const dlgEditUniversidad = this.dialog.open( UniversidadCarreraComponent,  {
      disableClose: false,
      width: '1000px',
      data: {
        objetoUniversidad: eTipoObjetoUniversidad.FACULTAD,
        operationType    : facultadSelected ? eTipoOperacion.ACTUALIZACION : eTipoOperacion.INSERCION,
        selectedData     : facultadSelected,
        idUniversidad    : this.selectedUniversidad.idUniversidad
      }
    });
    dlgEditUniversidad.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        this.getListaFacultades();
      }
    });
  }

  goToCarrerasFacultadSelected( selectedFacultad: BandejaFacultad ): void{
    if ( !this.isButtonAddEditPressed ) {
      localStorage.setItem( 'selectedFacultad', JSON.stringify( selectedFacultad ) );
      this.router.navigate( [ 'dar/universidad/facultad/carreras' ] );
    }
    this.isButtonAddEditPressed = false;
  }

}
