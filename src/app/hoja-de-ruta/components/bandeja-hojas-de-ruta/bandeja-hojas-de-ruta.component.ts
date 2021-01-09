import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { HojaDeRutaService } from '../../hoja-de-ruta.service';
import { DerivarModel } from '../../models/derivar.model';
import { HojaDeRutaModel, HojaRutaBandejaModel } from '../../models/hoja-de-ruta.model';
import { AdjuntarDocumentoComponent } from '../adjuntar-documento/adjuntar-documento.component';
import { DerivarComponent } from '../derivar/derivar.component';
import { NuevoParticipanteComponent } from '../participante/nuevo-participante.component';
import { SeguimientoComponent } from '../seguimiento/seguimiento.component';

@Component({
  selector: 'app-bandeja-hojas-de-ruta',
  templateUrl: './bandeja-hojas-de-ruta.component.html',
  styleUrls: ['./bandeja-hojas-de-ruta.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaHojasDeRutaComponent
  extends BaseComponent
  implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = [
    'tipoTramiteDes',
    'nombreRemitente',
    'descripcionDoc',
    'cite',
    'nombreDestinatario',
    'referencia',
    'estado',
    'acciones'
  ];
  dataSource = new MatTableDataSource<HojaRutaBandejaModel>([]);

  listaBandeja: Array<HojaRutaBandejaModel> = [];
  datoComunicarPadre: string;

  @Input()
  valorBandejaSelected: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  idPersonaGd = 0;
  tipoBandeja = '';

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private hojaRutaService: HojaDeRutaService,
    private router: Router,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.idPersonaGd =
      this.contextService.getItemContexto(`idPersonaGd`) ?? 542;
    this.tipoBandeja = 'PRINCIPAL';
    this.getAllHojaRutaBandeja(this.idPersonaGd, this.tipoBandeja);
  }
  private getAllHojaRutaBandeja( idPersonaGd: number, tipoBandeja ): void {
    this.hojaRutaService.getAllHojaRutaBandeja( idPersonaGd, tipoBandeja ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( listaHojaRutaBandeja => {
      //listaCitesPersona.data.map( cite => cite.destinatarios = ( cite.destinatarios !== '' ) ? JSON.parse( cite.destinatarios ) as Array<DestinatarioModel> : cite.destinatarios );
      //listaCitesPersona.data.map( cite => cite.remitentes = ( cite.remitentes !== '' ) ? JSON.parse( cite.remitentes ) as Array<DestinatarioModel> : cite.remitentes );
      //listaCitesPersona.data.map( cite => cite.vias = ( cite.vias !== '' ) ? JSON.parse( cite.vias ) as Array<DestinatarioModel> : cite.vias );
      // this.dataSource.data = listaHojaRutaBandeja.data as Array<HojaRutaBandejaModel>;
      this.listaBandeja = listaHojaRutaBandeja.data as Array<HojaRutaBandejaModel>;
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
  onDerivar(pObjHojaRuta: HojaRutaBandejaModel): void {
    const dlgHojaRutaDerivar = this.dialog.open(DerivarComponent, {
      disableClose: false,
      width: "1000px",
      data: {
        hojaRutaSelected:pObjHojaRuta
      },
    });
    dlgHojaRutaDerivar
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          //..
        }
      });
  }

  onSeguimiento(objHojaRuta: HojaRutaBandejaModel): void {
    const dlgHojaRutaSeguimiento = this.dialog.open(SeguimientoComponent, {
      disableClose: true,
      width: '1000px',
      data: {
        //idHojarutaSelected : objHojaRuta.idHojaRuta
        idHojarutaSelected : 49
      }
    });
    dlgHojaRutaSeguimiento
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          //..
        }
      });

    console.log('CREANDO UNA NUEVA HOJA DE RUTA');
  }

  onEnviarHojaRuta(pHojaDeRutaModel: HojaDeRutaModel): void {
    console.log(`RNVIANDO ---> ${pHojaDeRutaModel}`);
  }

  onPrintHojaRuta(pHojaDeRutaModel: HojaDeRutaModel): void {
    console.log(`IMPRIMIENDO ---> ${pHojaDeRutaModel}`);
  }

  crearHojadeRuta(): void {
    //const dlgNuevoCite = this.dialog.open( HojaDeRutaComponent,  {
    //const dlgNuevoCite = this.dialog.open( BusquedaAvanzadaComponent,  {
    const dlgNuevoCite = this.dialog.open(HojaDeRutaComponent, {
      disableClose: false,
      width: '1000px',
      data: {}
    });
    dlgNuevoCite
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          //..
        }
      });
  }
  adjuntarDocumento(): void {
    const dlgNuevoCite = this.dialog.open(AdjuntarDocumentoComponent, {
      disableClose: false,
      width: '1000px',
      data: {}
    });
    dlgNuevoCite
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          //..
        }
      });
  }

  onAnadirParticipante(pHojaRuta: HojaRutaBandejaModel): void {
    //const dlgNuevoCite = this.dialog.open( HojaDeRutaComponent,  {
    //const dlgNuevoCite = this.dialog.open( BusquedaAvanzadaComponent,  {
    const dlgNuevoParticipante = this.dialog.open(NuevoParticipanteComponent, {
      disableClose: false,
      width: '1000px',
      data: {
        idHojaRuta: pHojaRuta.idHojaRuta
      }
    });
    dlgNuevoParticipante
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          //..
        }
      });
  }
}
