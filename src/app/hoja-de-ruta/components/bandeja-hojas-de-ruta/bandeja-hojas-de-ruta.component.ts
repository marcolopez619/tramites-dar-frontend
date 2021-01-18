import { AfterViewInit, Component, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { HojaDeRutaComponent } from '../../../shared/components/hoja-de-ruta/hoja-de-ruta.component';
import { Accion, DataTableHRMouseModel, Estado } from '../../../shared/models/data-table-hr-mouse.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { HojaDeRutaService } from '../../hoja-de-ruta.service';
import { HojaRutaBandejaModel } from '../../models/hoja-de-ruta.model';
import { AceptarHrComponent } from '../aceptar-hoja-ruta/aceptar-hoja-ruta.component';
import { AdjuntarDocumentoComponent } from '../adjuntar-documento/adjuntar-documento.component';
import { ComentarioComponent } from '../comentario-hoja-de-ruta/comentario-hoja-de-ruta.component';
import { DerivarComponent } from '../derivar/derivar.component';
import { FinalizarComponent } from '../finalizar/finalizar.component';
import { NuevoParticipanteComponent } from '../participante/nuevo-participante.component';
import { RechazarHrComponent } from '../rechazar-hoja-ruta/rechazar-hoja-ruta.component';
import { SeguimientoComponent } from '../seguimiento/seguimiento.component';
import { ListaDocsAdjSubidosComponent } from '../../../shared/components/lista-docs-adj-subidos/lista-docs-adj-subidos.component';
import { eModulo } from '../../../shared/enums/modulo.enum';

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
    'numeroHojaRuta',
    'nombreDestinatario',
    'referencia',
    'fechaBandeja',
    'estado'
  ];
  dataSource = new MatTableDataSource<HojaRutaBandejaModel>([]);

  mouseOverModel: DataTableHRMouseModel = {};
  showMouseOverActions = false;

  listaBandeja: Array<HojaRutaBandejaModel> = [];
  datoComunicarPadre: string;

  @Input()
  valorBandejaSelected: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  idPersonaGd = 0;
  tipoBandeja = '';

  constructor(
    public dialog: MatDialog,
    public langService: LangService,
    public contextService: ContextoService,
    private hojaRutaService: HojaDeRutaService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.inicializarBandeja();
    // this.crearAccionesMouseOver();
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

  onMouseOver(row: HojaRutaBandejaModel): void {
    row.isRowMouseOver = true;
    this.showMouseOverActions = true;
  }
  onMouseLeave(row: HojaRutaBandejaModel): void {
    row.isRowMouseOver = false;
    this.showMouseOverActions = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.valorBandejaSelected.firstChange) {
      this.getAllHojaRutaBandeja(this.idPersonaGd, this.valorBandejaSelected);
    }
  }

  private inicializarBandeja(): void {
    this.idPersonaGd =
      this.contextService.getItemContexto(`idPersonaGd`) ?? 542;
    this.tipoBandeja = this.valorBandejaSelected;
    this.getAllHojaRutaBandeja(this.idPersonaGd, this.tipoBandeja);
  }

  private getAllHojaRutaBandeja(idPersonaGd: number, tipoBandeja): void {
    this.hojaRutaService
      .getAllHojaRutaBandeja(idPersonaGd, tipoBandeja)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((listaHojaRutaBandeja) => {
        if (listaHojaRutaBandeja.data !== null) {
          this.listaBandeja = listaHojaRutaBandeja.data as Array<HojaRutaBandejaModel>;
        } else {
          this.listaBandeja.length = 0;
          this.listaBandeja = [];
        }
        this.dataSource.data = this.listaBandeja;
      });
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

    switch (this.valorBandejaSelected.toUpperCase()) {
      case 'PRINCIPAL': {
        const acciones: Array<Accion> = [
          {
            descAccion: 'enviar',
            tooltipText: 'Enviar',
            icono: 'send',
            onClick: this.onDerivar
          },
          /* {
          descAccion : 'editar',
          tooltipText : 'Editar',
          icono : 'edit'
        }, */
          {
            descAccion: 'adjuntar_documento',
            tooltipText: 'Adjuntar documento',
            icono: 'attachment',
            onClick: this.onAdjuntarDocumento
          }
        ];

        estados = [
          {
            descEstado: 'creado',
            acciones: acciones
          }
        ];

        break;
      }
      case 'RECIBIDO': {
        const acciones: Array<Accion> = [
          {
            descAccion: 'aceptar',
            tooltipText: 'Aceptar envío',
            icono: 'done'
          },
          {
            descAccion: 'rechazar',
            tooltipText: 'Rechazar envío',
            icono: 'highlight_off'
          },
          {
            descAccion: 'ver_seguimiento',
            tooltipText: 'Ver seguimiento',
            icono: 'visibility',
            onClick: this.onVerSeguimiento
          }
        ];

        estados = [
          {
            descEstado: 'espera',
            acciones: acciones
          }
        ];

        break;
      }
      case 'ENVIADO': {
        const acciones: Array<Accion> = [
          {
            descAccion: 'cancelar',
            tooltipText: 'Cancelar envío',
            icono: 'cancel_schedule_send'
          }
        ];

        estados = [
          {
            descEstado: 'enviado',
            acciones: acciones
          }
        ];

        break;
      }
      case 'RECHAZADO': {
        const acciones: Array<Accion> = [
          {
            descAccion: 'enviar',
            tooltipText: 'Enviar',
            icono: 'send',
            onClick: this.onDerivar
          } /* , {
          descAccion : 'adjuntar_documento',
          tooltipText : 'Adjuntar documento',
          icono : 'attachment',
          onClick: this.onAdjuntarDocumento
        } */
        ];

        estados = [
          {
            descEstado: 'rechazado',
            acciones: acciones
          }
        ];

        break;
      }
      case 'PENDIENTE': {
        const accionesAEnAtencion: Array<Accion> = [
          {
            descAccion: 'derivar',
            tooltipText: 'Derivar',
            icono: 'near_me',
            onClick: this.onDerivar
          },
          {
            descAccion: 'adjuntar_documento',
            tooltipText: 'Adjuntar documento',
            icono: 'attachment',
            onClick: this.onAdjuntarDocumento
          },
          {
            descAccion: 'anadir_participante',
            tooltipText: 'Añadir participante',
            icono: 'person_add',
            onClick: this.onAnadirParticipante
          },
          {
            descAccion: 'anadir_comentario',
            tooltipText: 'Añadir comentario',
            icono: 'add_comment',
            onClick: this.onAnadirComentario
          },
          {
            descAccion: 'ver_seguimiento',
            tooltipText: 'Ver seguimiento',
            icono: 'remove_red_eye',
            onClick: this.onVerSeguimiento
          },
          {
            descAccion: 'finalizar',
            tooltipText: 'Finalizar trámite',
            icono: 'offline_pin',
            onClick: this.onFinalizar
          }
        ];

        const accionesParticipante: Array<Accion> = [
          {
            descAccion: 'adjuntar_documento',
            tooltipText: 'Adjuntar documento',
            icono: 'attachment'
          },
          {
            descAccion: 'anadir_comentario',
            tooltipText: 'Añadir comentario',
            icono: 'add_comment'
          },
          {
            descAccion: 'finalizar_participacion',
            tooltipText: 'Finalizar participación',
            icono: 'person_off'
          },
          {
            descAccion: 'ver_seguimiento',
            tooltipText: 'Ver seguimiento',
            icono: 'remove_red_eye'
          }
        ];

        estados = [
          {
            descEstado: 'en atencion',
            acciones: accionesAEnAtencion
          } /* ,{
          descEstado : 'participante',
          acciones : accionesParticipante
        } */
        ];

        break;
      }
      case 'PROCESO': {
        const acciones: Array<Accion> = [
          {
            descAccion: 'ver_seguimiento',
            tooltipText: 'Ver seguimiento',
            icono: 'remove_red_eye'
          }
        ];

        estados = [
          {
            descEstado: 'proceso',
            acciones: acciones
          }
        ];

        break;
      }
      case 'FINALIZADO': {
        const acciones: Array<Accion> = [
          {
            descAccion: 'ver_seguimiento',
            tooltipText: 'Ver seguimiento',
            icono: 'remove_red_eye',
            onClick: this.onVerSeguimiento
          }
        ];

        estados = [
          {
            descEstado: 'finalizado',
            acciones: acciones
          }
        ];

        break;
      }
      default:
        break;
    }

    this.mouseOverModel.estados = estados;
    this.mouseOverModel.descBandeja = this.valorBandejaSelected;
  }

  crearHojadeRuta(): void {
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
          this.inicializarBandeja();
        }
      });
  }
  onDerivar(pObjHojaRuta: HojaRutaBandejaModel): void {
    const dlgDerivar = this.dialog.open(DerivarComponent, {
      disableClose: false,
      width: '1000px',
      data: {
        hojaRutaSelected: pObjHojaRuta
      }
    });
    dlgDerivar
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          this.inicializarBandeja();
        }
      });
  }
  onAdjuntarDocumento(pHojaRuta: HojaRutaBandejaModel): void {
    const dlgDerivar = this.dialog.open(AdjuntarDocumentoComponent, {
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
          this.inicializarBandeja();
        }
      });
  }

  onListarDocumentosAdjuntos(pHojaRuta: HojaRutaBandejaModel): void {
    const dlgListaDocAdj = this.dialog.open(ListaDocsAdjSubidosComponent, {
      disableClose: false,
      width: '1500px',
      data: {
        listaDocumentosAdj: pHojaRuta.listaAdjuntos
      }
    });
    dlgListaDocAdj
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          //..
        }
      });
  }
  onAnadirParticipante(pHojaRuta: HojaRutaBandejaModel): void {
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
          this.inicializarBandeja();
        }
      });
  }
  onAnadirComentario(pHojaRuta: HojaRutaBandejaModel): void {
    const dlgAnadirComentario = this.dialog.open(ComentarioComponent, {
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
          this.inicializarBandeja();
        }
      });
  }
  onFinalizar(pHojaRuta: HojaRutaBandejaModel): void {
    const dlgFinalizar = this.dialog.open(FinalizarComponent, {
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
          this.inicializarBandeja();
        }
      });
  }
  onVerSeguimiento(pHojaRuta: HojaRutaBandejaModel): void {
    const dlgVerSeguimiento = this.dialog.open(SeguimientoComponent, {
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

  onAceptar(pHojaRuta: HojaRutaBandejaModel): void {

    const dlgAceptarHr = this.dialog.open(AceptarHrComponent, {
        disableClose: false,
        width: '500px',
        data: {
                title: this.langService.getLang(eModulo.HojaDeRuta, 'tit-confirmacion-aceptar'),
                content: this.langService.getLang(eModulo.HojaDeRuta, 'lbl-confirmar-aceptar').concat( pHojaRuta.numeroHojaRuta ),
                icon: 'contact_support',
                hojaRutaSelected: pHojaRuta
        }
    });

    dlgAceptarHr.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          this.inicializarBandeja();
        }
      });
  }
  onRechazar(pHojaRuta: HojaRutaBandejaModel): void {
    const dlgRechazarHR = this.dialog.open(RechazarHrComponent, {
      disableClose: false,
      width: '520px',
      data: {
        title: this.langService.getLang(eModulo.HojaDeRuta, 'tit-rechazar-hoja-ruta'),
        content: this.langService.getLang(eModulo.HojaDeRuta, 'lbl-rechazar-hoja-ruta-seguro').concat( pHojaRuta.numeroHojaRuta ) ,
        icon: 'contact_support',
        hojaRutaSelected: pHojaRuta
        }
      });

    dlgRechazarHR.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result) {
          this.inicializarBandeja();
        }
    });

  }

}
