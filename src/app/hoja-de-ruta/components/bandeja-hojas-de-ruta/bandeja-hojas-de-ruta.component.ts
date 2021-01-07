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
import { DerivarModel } from '../../models/derivar.model';
import { HojaDeRutaModel, HojaRutaBandejaModel } from '../../models/hoja-de-ruta.model';
import { DerivarComponent } from '../derivar/derivar.component';
import { DetalleSeguimientoComponent } from '../detalle-seguimiento/detalle-seguimiento.component';
import { AdjuntarDocumentoComponent } from '../adjuntar-documento/adjuntar-documento.component';
import { BusquedaAvanzadaComponent } from '../../../shared/components/busqueda-avanzada/busqueda-avanzada.component';
import { NuevoParticipanteComponent } from '../participante/nuevo-participante.component';
import { HojaDeRutaService } from '../../hoja-de-ruta.service';
import { SeguimientoComponent } from '../seguimiento/seguimiento.component';

@Component({
  selector: 'app-bandeja-hojas-de-ruta',
  templateUrl: './bandeja-hojas-de-ruta.component.html',
  styleUrls: ['./bandeja-hojas-de-ruta.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaHojasDeRutaComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['tipoRemitente', 'nombreRemitente', 'tipoDocumento', 'numeroCite', 'destinatarios', 'referencia', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<HojaRutaBandejaModel>([]);

  datoComunicarPadre: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  idPersonaGd = 0;
  tipoBandeja="";

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private hojaRutaService: HojaDeRutaService,
    private router: Router,
    private dialog: MatDialog
  ) {  super(); }

  ngOnInit(): void {
    this.idPersonaGd = this.contextService.getItemContexto(`idPersonaGd`) ?? 542;
    this.tipoBandeja="PRINCIPAL";
    this.getAllHojaRutaBandeja( this.idPersonaGd, this.tipoBandeja);

    /*
    const listaVias: Array<string> = [ 'SARDINA GUMUCIO FLORIPONDIO', 'CONDORI MALPARTIDA TIRADO' ];
    const listaVias2: Array<string> = [ 'ZARZURI TIRADO ELBA', 'ARCE CATARI GONZALES' ];
    const listaHojaRuta: Array<HojaDeRutaModel> = [
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
    ];*/

    //this.dataSource.data = listaHojaRuta;
  }
  private getAllHojaRutaBandeja( idPersonaGd: number, tipoBandeja ): void {
    this.hojaRutaService.getAllHojaRutaBandeja( idPersonaGd, tipoBandeja ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( listaHojaRutaBandeja => {
      //listaCitesPersona.data.map( cite => cite.destinatarios = ( cite.destinatarios !== '' ) ? JSON.parse( cite.destinatarios ) as Array<DestinatarioModel> : cite.destinatarios );
      //listaCitesPersona.data.map( cite => cite.remitentes = ( cite.remitentes !== '' ) ? JSON.parse( cite.remitentes ) as Array<DestinatarioModel> : cite.remitentes );
      //listaCitesPersona.data.map( cite => cite.vias = ( cite.vias !== '' ) ? JSON.parse( cite.vias ) as Array<DestinatarioModel> : cite.vias );
      this.dataSource.data = listaHojaRutaBandeja.data as Array<HojaRutaBandejaModel>;
    });
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
//DetalleSeguimientoComponent
    //const dlgNuevaHojaRuta = this.dialog.open( HojaDeRutaComponent,  {
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

  onCompartir(pDerivarModel: DerivarModel): void {
    const dlgNuevoCite = this.dialog.open( DerivarComponent,  {
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

  onDetalle(): void {
    //DetalleSeguimientoComponent
        //const dlgNuevaHojaRuta = this.dialog.open( HojaDeRutaComponent,  {
        const dlgNuevaHojaRuta = this.dialog.open( SeguimientoComponent,  {
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

  onEnviarHojaRuta(pHojaDeRutaModel: HojaDeRutaModel): void {
    console.log( `RNVIANDO ---> ${pHojaDeRutaModel}` );
  }

  onPrintHojaRuta(pHojaDeRutaModel: HojaDeRutaModel): void {
    console.log( `IMPRIMIENDO ---> ${pHojaDeRutaModel}` );
  }

crearHojadeRuta(): void {
  //const dlgNuevoCite = this.dialog.open( HojaDeRutaComponent,  {
    //const dlgNuevoCite = this.dialog.open( BusquedaAvanzadaComponent,  {
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
adjuntarDocumento(): void {
  const dlgNuevoCite = this.dialog.open( AdjuntarDocumentoComponent,  {
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

  onAnadirParticipante(pHojaRuta: HojaRutaBandejaModel): void {
  //const dlgNuevoCite = this.dialog.open( HojaDeRutaComponent,  {
    //const dlgNuevoCite = this.dialog.open( BusquedaAvanzadaComponent,  {
    const dlgNuevoParticipante = this.dialog.open( NuevoParticipanteComponent,  {
    disableClose: false,
    width: '1000px',
    data: {
      idHojaRuta : pHojaRuta.idHojaRuta
    }
  });
    dlgNuevoParticipante.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
    if (result) {
      //..
    }
  });
}

}
