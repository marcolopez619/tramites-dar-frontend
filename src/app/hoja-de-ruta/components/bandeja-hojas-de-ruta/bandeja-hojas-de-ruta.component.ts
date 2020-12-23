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
import { HojaDeRutaModule } from '../../hoja-de-ruta.module';
import { HojaDeRutaModel } from '../../models/hoja-de-ruta.model';
import { ComentarioHojaDeRutaComponent } from '../comentario-hoja-de-ruta/comentario-hoja-de-ruta.component';
import { FinalizarTramiteComponent } from '../finalizar-tramite/finalizar-tramite.component';

@Component({
  selector: 'app-bandeja-hojas-de-ruta',
  templateUrl: './bandeja-hojas-de-ruta.component.html',
  styleUrls: ['./bandeja-hojas-de-ruta.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaHojasDeRutaComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  //////*
  tipoRemitente?: number;
  nombreRemitente?: string;
  tipoDocumento?: string; 
  numeroCite?: string;
  destinatarios?: Array<string>;  
  referencia?: string;
  estado?: string;  
  //*

  displayedColumns = ['tipoRemitente', 'nombreRemitente','tipoDocumento', 'numeroCite', 'destinatarios', 'referencia', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<any>([]);
  
  datoComunicarPadre: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private router: Router,
    private dialog: MatDialog
  ) {  super(); }

  ngOnInit(): void {
    const listaVias: Array<string> = [ 'SARDINA GUMUCIO FLORIPONDIO', 'CONDORI MALPARTIDA TIRADO' ];
    const listaVias2: Array<string> = [ 'ZARZURI TIRADO ELBA', 'ARCE CATARI GONZALES' ];

    const listaCites: Array<HojaDeRutaModel> = [
      {
        idHojaRutaModel: 1,
        tipoRemitente: 'Externo',
        nombreRemitente: 'Ministerio de Economia',
        tipoDocumento : 'MEMORANDUM',
        numeroCite : 'SEGIP/DES/2334_2021',
        destinatarios : listaVias,
        referencia : 'REFERENCIA DE PRUEBA 1',
        estado: 'PENDIENTE'        
      },
      {
        idHojaRutaModel: 2,
        tipoRemitente: 'Externo',
        nombreRemitente: 'Ministerio de Salud',
        tipoDocumento : 'INFORME',
        numeroCite : 'SEGIP/DES/2777_2021',
        destinatarios : listaVias2,
        referencia : 'REFERENCIA DE PRUEBA 2',
        estado: 'EN PROCESO'         
      }
    ];

    this.dataSource.data = listaCites;
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
  realizaComunicacionHijo(event) {
    this.datoComunicarPadre = event.elemento;
  }

  onEdit(pHojaDeRutaModel: HojaDeRutaModel): void {
    console.log( `EDITANDO ---> ${pHojaDeRutaModel}` );
  }

  onEnviarHojaRuta(pHojaDeRutaModel: HojaDeRutaModel): void {
    console.log( `RNVIANDO ---> ${pHojaDeRutaModel}` );
  }

  onPrintHojaRuta(pHojaDeRutaModel: HojaDeRutaModel): void {
    console.log( `IMPRIMIENDO ---> ${pHojaDeRutaModel}` );
  }
  /*
  crearHojadeRuta(): void {
    const dlgNuevoCite = this.dialog.open( HojaDeRutaComponent,  {
      disableClose: false,
      width: '1000px',
      data: {

      }
    });
    dlgNuevoCite.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        //..
      }
    });
  }
 */

crearHojadeRuta(): void {
  const dlgNuevoCite = this.dialog.open( FinalizarTramiteComponent,  {
    disableClose: false,
    width: '1000px',
    data: {
    }
  });
  dlgNuevoCite.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
    if (result) {
      //..
    }
  });
}
 

}
