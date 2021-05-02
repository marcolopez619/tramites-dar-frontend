import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { fadeInAnim, slideInLeftAnim } from '../../../../shared/animations/template.animation';
import { BaseComponent } from '../../../../shared/base.component';
import { UniversidadCarreraComponent } from '../../../../shared/components/universidad-carrera/universidad-carrera.component';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { BandejaCarreras } from '../../../../tramites/models/tramites.models';

@Component({
  selector: 'app-universidad',
  templateUrl: './universidad.component.html',
  styleUrls: ['./universidad.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class UniversidadComponent extends BaseComponent  implements OnInit, AfterViewInit, OnDestroy {

    displayedColumns = ['descCarrera', 'estado' , 'acciones' ];
    dataSource = new MatTableDataSource<BandejaCarreras>([]);

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
      const idUniversidad = 1;
      this.getListaCarreras(idUniversidad);
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

    private getListaCarreras(pIdUniversidad: number): void {
      const data :  Array<BandejaCarreras> = [{
        idCarrera  : 1,
        descCarrera: 'ENFERMERIA',
        estado     : 6
      },{
        idCarrera  : 2,
        descCarrera: 'ADMINISTRACION DE EMPRESAS',
        estado     : 2
      },{
        idCarrera  : 3,
        descCarrera: 'INGENIERIA AGROINDUSTRIAL Y AGROPECUARIA',
        estado     : 8
      }];
      this.dataSource.data = data;
    }

    onEditUniversidad(): void{
      const dlgEditUniversidad = this.dialog.open( UniversidadCarreraComponent,  {
        disableClose: false,
        width: '1000px',
        data: {
          isEditarUniversidad : true,
          selectedData: { nombre: 'ALGUNA UNIVERSIDAD', estado : true }
        }
      });
      dlgEditUniversidad.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
        if (result) {
          console.log( `---> ${result}` );
          // TODO: ACTUALIZAR LA BANDEJA PRINCIPAL.
        }
      });
    }

    onAnadirEditCarrera(pCarrera?: BandejaCarreras): void{
      const isAnadir = pCarrera === undefined;

      const dlgEditCarrera = this.dialog.open( UniversidadCarreraComponent,  {
        disableClose: false,
        width: '1000px',
        data: {
          isAnadirCarrera: isAnadir,
          selectedData   : (isAnadir) ? undefined :  { nombre: pCarrera.descCarrera, estado : true }
        }
      });
      dlgEditCarrera.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
        if (result) {
          console.log( `---> ${result}` );
          // TODO: ACTUALIZAR LA BANDEJA PRINCIPAL.
        }
      });
    }

}
