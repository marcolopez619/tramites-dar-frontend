import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { HojaDeRutaComponent } from '../../../shared/components/hoja-de-ruta/hoja-de-ruta.component';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';

@Component({
  selector: 'app-bandeja-hojas-de-ruta',
  templateUrl: './bandeja-hojas-de-ruta.component.html',
  styleUrls: ['./bandeja-hojas-de-ruta.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaHojasDeRutaComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['tipoDocumento', 'numeroCite', 'destinatarios', 'referencia', 'fechaCreacion', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private router: Router,
    private dialog: MatDialog
  ) {  super(); }

  ngOnInit(): void {
    // ..
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

  onCrearNuevaHojaDeRuta(): void {

    const dlgNuevaHojaRuta = this.dialog.open( HojaDeRutaComponent,  {
      disableClose: true,
      width: '1000px',
      data: {

      }
    });
    dlgNuevaHojaRuta.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        //..
      }
    });

    console.log( 'CREANDO UNA NUEVA HOJA DE RUTA' );
  }

}
