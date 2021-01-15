import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, Injector, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HojaRutaBandejaModel } from '../../../hoja-de-ruta/models/hoja-de-ruta.model';
import { fadeInAnim, slideInLeftAnim, zoomInAnim } from '../../animations/template.animation';
import { BaseComponent } from '../../base.component';
import { ContextoService } from '../../services/contexto.service';
import { LangService } from '../../services/lang.service';
import { DataTableHRMouseModel, Estado, Accion } from '../../models/data-table-hr-mouse.model';
import { DerivarModel } from '../../../hoja-de-ruta/models/derivar.model';
import { DerivarComponent } from '../../../hoja-de-ruta/components/derivar/derivar.component';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { HojaDeRutaComponent } from '../hoja-de-ruta/hoja-de-ruta.component';
import { AdjuntarDocumentoComponent } from '../../../hoja-de-ruta/components/adjuntar-documento/adjuntar-documento.component';
import { NuevoParticipanteComponent } from '../../../hoja-de-ruta/components/participante/nuevo-participante.component';
import { ComentarioComponent } from '../../../hoja-de-ruta/components/comentario-hoja-de-ruta/comentario-hoja-de-ruta.component';
import { FinalizarComponent } from '../../../hoja-de-ruta/components/finalizar/finalizar.component';
import { SeguimientoComponent } from '../../../hoja-de-ruta/components/seguimiento/seguimiento.component';
import { AceptarHrComponent } from '../../../hoja-de-ruta/components/aceptar-hoja-ruta/aceptar-hoja-ruta.component';
import { HojaRutaService } from '../../services/hoja-ruta.service';

@Component({
  selector: 'sh-data-table-hoja-de-ruta',
  templateUrl: './data-table-hoja-de-ruta.component.html',
  styleUrls: ['./data-table-hoja-de-ruta.component.css'],
  animations: [fadeInAnim, zoomInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@zoomInAnim]': 'true', 'fadeInAnim' : 'true' }
})
export class DataTableHojaDeRutaComponent extends BaseComponent  implements OnInit, AfterViewInit,  OnDestroy {

  displayedColumns = ['tipoTramiteDes', 'nombreRemitente', 'descripcionDoc', 'numeroHojaRuta', 'nombreDestinatario', 'referencia', 'fechaBandeja', 'estado'];
  dataSource = new MatTableDataSource<HojaRutaBandejaModel>([]);

  mouseOverModel: DataTableHRMouseModel = {};

  @Input()
  listaBandejaHojaRuta: Array<HojaRutaBandejaModel>;

  @Input()
  bandeja: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  showMouseOverActions = false;

  constructor(
    public contextService: ContextoService,
    public langService: LangService,
    private hojaRutaService: HojaRutaService,
    public dialog: MatDialog
  ) {
    super();
  }
  ngOnInit(): void {
    this.dataSource.data = this.listaBandejaHojaRuta;
    this.crearAccionesMouseOver();
    console.log(' on init del componente compartidooooooooo');
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.listaBandejaHojaRuta?.firstChange) {
      this.dataSource = new MatTableDataSource(this.listaBandejaHojaRuta);
      this.crearAccionesMouseOver();
    }
  }


  /**
   * METODO QUE CREA LAS ACCIONES DEL MOUSEOVER EN FUNCION A LOS ESTADOS
   * Y ASIGNA LO QUE DEBE HACER CUANDO SE PRECIONA UN CLICK DEL ICONO CORRESPONDIENTE
   *
   * @private
   * @memberof DataTableHojaDeRutaComponent
   */
  private crearAccionesMouseOver(): void {

    let estados: Array<Estado> = [];

    switch (this.bandeja.toUpperCase()) {

      case 'PRINCIPAL': {
        const acciones: Array<Accion> = [{
          descAccion : 'enviar',
          tooltipText : 'Enviar',
          icono : 'send',
          onClick : this.onDerivar
        },{
          descAccion : 'adjuntar_documento',
          tooltipText : 'Adjuntar documento',
          icono : 'attachment',
          onClick : this.onAdjuntarDocumento
        }
      ];

        estados = [{
          descEstado : 'creado',
          acciones : acciones
        }];

        break;
      }
      case 'RECIBIDO': {
        const acciones: Array<Accion> = [{
          descAccion : 'aceptar',
          tooltipText : 'Aceptar envío',
          icono : 'send',
          onClick: this.onAceptar
        }, {
          descAccion : 'rechazar',
          tooltipText : 'Rechazar envío',
          icono : 'highlight_off'
        }, {
          descAccion : 'ver_seguimiento',
          tooltipText : 'Ver seguimiento',
          icono : 'visibility',
          onClick: this.onVerSeguimiento
        }];

        estados = [{
          descEstado : 'espera',
          acciones : acciones
        }];

        break;
      }
      case 'ENVIADO': {
        const acciones: Array<Accion> = [{
          descAccion : 'cancelar',
          tooltipText : 'Cancelar envío',
          icono : 'cancel_schedule_send'
        }];

        estados = [{
          descEstado : 'enviado',
          acciones : acciones
        }];

        break;
      }
      case 'RECHAZADO': {
        const acciones: Array<Accion> = [{
          descAccion : 'enviar',
          tooltipText : 'Enviar',
          icono : 'send',
          onClick : this.onDerivar
        }/* , {
          descAccion : 'adjuntar_documento',
          tooltipText : 'Adjuntar documento',
          icono : 'attachment',
          onClick: this.onAdjuntarDocumento
        } */
      ];

        estados = [{
          descEstado : 'rechazado',
          acciones : acciones
        }];

        break;
      }
      case 'PENDIENTE': {
        const accionesAEnAtencion: Array<Accion> = [{
          descAccion : 'derivar',
          tooltipText : 'Derivar',
          icono : 'near_me',
          onClick: this.onDerivar
        }, {
          descAccion : 'adjuntar_documento',
          tooltipText : 'Adjuntar documento',
          icono : 'attachment',
          onClick: this.onAdjuntarDocumento
        }, {
          descAccion : 'anadir_participante',
          tooltipText : 'Añadir participante',
          icono : 'person_add',
          onClick: this.onAnadirParticipante
        }, {
          descAccion : 'anadir_comentario',
          tooltipText : 'Añadir comentario',
          icono : 'add_comment',
          onClick: this.onAnadirComentario
        }, {
          descAccion : 'ver_seguimiento',
          tooltipText : 'Ver seguimiento',
          icono : 'remove_red_eye',
          onClick: this.onVerSeguimiento

        }, {
          descAccion : 'finalizar',
          tooltipText : 'Finalizar trámite',
          icono : 'offline_pin',
          onClick: this.onFinalizar
        }];

        const accionesParticipante: Array<Accion> = [{
          descAccion : 'adjuntar_documento',
          tooltipText : 'Adjuntar documento',
          icono : 'attachment'
        }, {
          descAccion : 'anadir_comentario',
          tooltipText : 'Añadir comentario',
          icono : 'add_comment'
        }, {
          descAccion : 'finalizar_participacion',
          tooltipText : 'Finalizar participación',
          icono : 'person_off'
        }, {
          descAccion : 'ver_seguimiento',
          tooltipText : 'Ver seguimiento',
          icono : 'remove_red_eye'
        }];

        estados = [{
          descEstado : 'en atencion',
          acciones : accionesAEnAtencion
        }/* ,{
          descEstado : 'participante',
          acciones : accionesParticipante
        } */];

        break;
      }
      case 'PROCESO': {
        const acciones: Array<Accion> = [{
          descAccion : 'ver_seguimiento',
          tooltipText : 'Ver seguimiento',
          icono : 'remove_red_eye'
        }];

        estados = [{
          descEstado : 'proceso',
          acciones : acciones
        }];

        break;
      }
      case 'FINALIZADO': {
        const acciones: Array<Accion> = [{
          descAccion : 'ver_seguimiento',
          tooltipText : 'Ver seguimiento',
          icono : 'remove_red_eye',
          onClick: this.onVerSeguimiento
        }];

        estados = [{
          descEstado : 'finalizado',
          acciones : acciones
        }];

        break;
      }
      default: break;
      }

    this.mouseOverModel.estados = estados;
    this.mouseOverModel.descBandeja = this.bandeja;
  }
  private onDerivar(pObjHojaRuta: HojaRutaBandejaModel, pDialog?: MatDialog): void {

    const dlgDerivar = pDialog.open(DerivarComponent, {
      disableClose: false,
      width: '1000px',
      data: {
        hojaRutaSelected:pObjHojaRuta
      }
    });
    dlgDerivar
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          //..
        }
    });
  }

  private onAdjuntarDocumento(pHojaRuta: HojaRutaBandejaModel, pDialog?: MatDialog): void {
    const dlgDerivar = pDialog.open(AdjuntarDocumentoComponent, {
      disableClose: false,
      width: '1000px',
      data: {
        hojaRutaSelected: pHojaRuta
      }
    });
    dlgDerivar
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          //..
        }
    });
  }

  private onAnadirParticipante(pHojaRuta: HojaRutaBandejaModel, pDialog?: MatDialog): void {

    const dlgNuevoParticipante = pDialog.open(NuevoParticipanteComponent, {
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
  private onAnadirComentario(pHojaRuta: HojaRutaBandejaModel, pDialog?: MatDialog): void {

    const dlgAnadirComentario = pDialog.open(ComentarioComponent, {
      disableClose: false,
      width: '1000px',
      data: {
        idHojaRuta: pHojaRuta.idHojaRuta
      }
    });
    dlgAnadirComentario
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          //..
        }
      });
  }
  private onAceptar(pObjHojaRuta: HojaRutaBandejaModel, pDialog?: MatDialog): void {
/**title: this.langService.getLang(this.eModulo.HojaDeRuta, 'tit-confirmacion-aceptar'),
              content: this.langService.getLang(this.eModulo.HojaDeRuta, 'lbl-confirmar-aceptar'), */
    const confirmDialog = pDialog.open(AceptarHrComponent, {
      disableClose: false,
      width: '500px',
      data: {
              title: 'Aceptar hoja de ruta',
              content: '¿Está seguro de aceptar la hoja de ruta?',
              icon: 'public',
              hojaRutaSelected:pObjHojaRuta
      }
    });

    confirmDialog.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          //..
        }
      });

  }
  private onFinalizar(pHojaRuta: HojaRutaBandejaModel, pDialog?: MatDialog): void {

    const dlgFinalizar = pDialog.open(FinalizarComponent, {
      disableClose: false,
      width: '1000px',
      data: {
        idHojaRuta: pHojaRuta.idHojaRuta
      }
    });
    dlgFinalizar
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          //..
        }
      });
  }
  private onVerSeguimiento(pHojaRuta: HojaRutaBandejaModel, pDialog?: MatDialog): void {

    const dlgVerSeguimiento = pDialog.open(SeguimientoComponent, {
      disableClose: false,
      width: '1000px',
      data: {
        idHojaRuta: pHojaRuta.idHojaRuta
      }
    });
    dlgVerSeguimiento
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          //..
        }
      });
  }

  onMouseOver(row: HojaRutaBandejaModel): void {
    row.isRowMouseOver = true;
    this.showMouseOverActions = true;
  }
  onMouseLeave(row: HojaRutaBandejaModel): void {
    row.isRowMouseOver = false;
    this.showMouseOverActions = false;
  }
}
