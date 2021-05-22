import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AnulacionService } from '../../../estudiante/components/anulacion/anulacion.service';
import { CambioCarreraService } from '../../../estudiante/components/cambio-carrera.service';
import { ReadmisionService } from '../../../estudiante/components/readmision/readmision.service';
import { SuspencionService } from '../../../estudiante/components/suspencion/suspencion.service';
import { TransferenciaService } from '../../../estudiante/components/transferencia/transferencia.service';
import { TraspasoUniversidadService } from '../../../estudiante/components/traspaso-universidad/traspaso-universidad.service';
import { EstudianteService } from '../../../estudiante/estudiante.service';
import { BandejaAnulacion } from '../../../estudiante/models/anulacion.models';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { eEstado } from '../../../shared/enums/estado.enum';
import { eTipoTramite } from '../../../shared/enums/tipoTramite.enum';
import { eEntidad } from '../../../shared/enums/tipo_entidad.enum';
import { EstudianteModel } from '../../../shared/models/estudiante.model';
import { TablaIntermediaInsert } from '../../../shared/models/tramites.models';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { TramitesAcademicosService } from '../../../shared/services/tramites-academicos.service';
import { BandejaCambioCarrera, BandejaDar, BandejaReadmision, BandejaSuspencion, BandejaTranseferencia, BandejaTraspasoUniversidad } from '../../../tramites/models/tramites.models';

@Component({
  selector: 'app-detalle-tramite',
  templateUrl: './detalle-tramite.component.html',
  styleUrls: ['./detalle-tramite.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class DetalleTramiteComponent extends BaseComponent implements OnInit, OnDestroy {
  formDetalleTramite: FormGroup;
  datoEstudiante: EstudianteModel;
  listaLabelColumnas: Array<string>;
  listaValoresColumnas: Array<any>;
  detalleTramite: any;
  selectedTramite: BandejaDar;

  cuentaConDocumentacion = false;

  eEstado = eEstado;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private dialog: MatDialog,
    private router: Router,
    private datePipe: DatePipe,
    private titleCasePipe: TitleCasePipe,
    private formBuilder: FormBuilder,
    private estudianteService: EstudianteService,
    private tramiteAcademicoService: TramitesAcademicosService,

    private anulacionService: AnulacionService,
    private cambioDeCarreraService: CambioCarreraService,
    private suspencionService: SuspencionService,
    private readmisionService: ReadmisionService,
    private transferenciaService: TransferenciaService,
    private traspasoService: TraspasoUniversidadService
  ) {
    super();
  }

  ngOnInit(): void {
    this.selectedTramite = JSON.parse(localStorage.getItem( 'selectedTramite' ) ) as BandejaDar;

    this.formDetalleTramite = this.formBuilder.group({
      observaciones : [undefined, Validators.compose([ Validators.minLength(5), Validators.maxLength(200)])]
    });

    this.getDatosEstudiante();

    this.verificarEstadoTramite();

    const idTramite = this.getTipoTramite( this.selectedTramite.idTramite) ;
    const idEstudiante = this.selectedTramite.idEstudiante;
    const idTipoTramite = this.selectedTramite.idTipoTramite;

    this.getDetalleTramite(idTramite, idEstudiante, idTipoTramite);

    /* const idTramite = eTipoTramite.ANULACION; // FIXME: dato quemado q tiene q ser obtenido del localstorage cuando se elija una fila de la bandeja de solicitudes por atender.
    const idTipoTramite = 14; // FIXME: dato quemado q tiene q ser obtenido del localstorage cuando se elija una fila de la bandeja de solicitudes por atender.
    const idEstudiante = 1; // FIXME: dato quemado q tiene q ser obtenido del localstorage cuando se elija una fila de la bandeja de solicitudes por atender.
    this.getDetalleTramite(idTramite, idEstudiante, idTipoTramite); */

    /* const idTramite = eTipoTramite.CAMBIO_DE_CARRERA;
    const idTipoTramite = 7;
    const idEstudiante = 1;
    this.getDetalleTramite(idTramite, idEstudiante, idTipoTramite); */

    /* const idTramite = eTipoTramite.SUSPENCION;
    const idTipoTramite = 8;
    const idEstudiante = 1;
    this.getDetalleTramite(idTramite, idEstudiante, idTipoTramite); */

   /*  const idTramite = eTipoTramite.READMISION;
    const idTipoTramite = 11;
    const idEstudiante = 1;
    this.getDetalleTramite(idTramite, idEstudiante, idTipoTramite); */

    /* const idTramite = eTipoTramite.TRASPASO_DE_UNIVERSIDAD;
    const idTipoTramite = 5;
    const idEstudiante = 1;
    this.getDetalleTramite(idTramite, idEstudiante, idTipoTramite); */

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  private getDatosEstudiante(): void {

    const idEstudiante = this.selectedTramite.idEstudiante;

    this.estudianteService.getInformacionEstudiante( idEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.datoEstudiante = resp.data ?? [];
    });

  }

  private getDetalleTramite(pIdTramite: number, pIdeEstudiante: number, pIdTipoTramite: number): void {

    switch (pIdTramite) {
      case eTipoTramite.ANULACION: {
        this.anulacionService.getAllListaAnulaciones( pIdeEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
          this.detalleTramite = (resp.data as Array<BandejaAnulacion>).filter( x => x.idAnulacion === pIdTipoTramite)[ 0 ];
          this.setColumnas( eTipoTramite.ANULACION, this.detalleTramite);
        });
        break;
      }

      case eTipoTramite.CAMBIO_DE_CARRERA: {
        this.cambioDeCarreraService.getAllListaCambiosCarrera( pIdeEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
          this.detalleTramite = (resp.data as Array<BandejaCambioCarrera>).filter( x => x.idCambioCarrera === pIdTipoTramite)[ 0 ];
          this.setColumnas( eTipoTramite.CAMBIO_DE_CARRERA, this.detalleTramite);
        });
        break;
      }

      case eTipoTramite.SUSPENCION: {
        this.suspencionService.getAllListaSuspenciones( pIdeEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
          this.detalleTramite = (resp.data as Array<BandejaSuspencion>).filter( x => x.idSuspencion === pIdTipoTramite)[ 0 ];
          this.setColumnas( eTipoTramite.SUSPENCION, this.detalleTramite);
        });
        break;
      }

      case eTipoTramite.READMISION: {
        this.readmisionService.getAllListaReadmisiones( pIdeEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
          this.detalleTramite = (resp.data as Array<BandejaReadmision>).filter( x => x.idReadmision === pIdTipoTramite) [ 0 ];
          this.setColumnas( eTipoTramite.READMISION, this.detalleTramite);
        });
        break;
      }

      case eTipoTramite.TRANSFERENCIA: {
        this.transferenciaService.getListaTransferencias( pIdeEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
          this.detalleTramite = (resp.data as Array<BandejaTranseferencia>).filter( x => x.idTransferencia === pIdTipoTramite) [ 0 ];
          this.setColumnas( eTipoTramite.TRANSFERENCIA, this.detalleTramite);
        });
        break;
      }
      case eTipoTramite.TRASPASO_DE_UNIVERSIDAD: {
        this.traspasoService.getAllTraspasos( pIdeEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
          this.detalleTramite = (resp.data as Array<BandejaTraspasoUniversidad>).filter( x => x.idTraspaso === pIdTipoTramite) [ 0 ];
          this.setColumnas( eTipoTramite.TRASPASO_DE_UNIVERSIDAD, this.detalleTramite);
        });
        break;
      }
      default:
        break;
    }

  }

  private setColumnas(pTipoTramite: number, data: any): void {
    switch (pTipoTramite) {
      case eTipoTramite.ANULACION:
        const dataAnulacion = data as BandejaAnulacion;
        this.listaLabelColumnas = ['Tramite solicitado', 'Carrera a anular', 'Fecha solicitud', 'Motivo'];
        this.listaValoresColumnas = [dataAnulacion.tramite , dataAnulacion.carrera, dataAnulacion.fechaSolicitud.toString(), dataAnulacion.motivo];
        break;
      case eTipoTramite.CAMBIO_DE_CARRERA:
        const dataCambioCarrera = data as BandejaCambioCarrera;
        this.listaLabelColumnas = ['Tramite solicitado', 'Carrera origen', 'Carrera destino', 'Fecha solicitud', 'Motivo'];
        this.listaValoresColumnas = [dataCambioCarrera.tramite, dataCambioCarrera.carreraOrigen, dataCambioCarrera.carreradestino, dataCambioCarrera.fechaSolicitud.toString(), dataCambioCarrera.motivo  ];
        break;
      case eTipoTramite.SUSPENCION:
        const dataSuspencion = data as BandejaSuspencion;
        this.listaLabelColumnas = ['Tramite solicitado', 'Carrera origen', 'Tiempo',  'Fecha solicitud', 'Motivo'];
        this.listaValoresColumnas = [dataSuspencion.tramite, dataSuspencion.carrera, dataSuspencion.tiempoSolicitado.toString().concat(` Gestiones`),  dataSuspencion.fechaSolicitud.toString(), dataSuspencion.descripcionMotivo ];
        break;
      case eTipoTramite.READMISION:
        const dataReadmision = data as BandejaReadmision;
        this.listaLabelColumnas = ['Tramite solicitado', 'Carrera origen', 'Fecha solicitud suspencion', 'Tiempo suspencion solicitado', 'Fecha solicitud readmision', 'Motivo'];
        this.listaValoresColumnas = [ dataReadmision.tipoTramite, dataReadmision.carrera, dataReadmision.suspencion[ 0 ].fechaSolicitud.toString(), dataReadmision.suspencion[ 0 ].tiempoSolicitado.toString() , dataReadmision.fechaSolicitudReadmision.toString(), dataReadmision.motivo ];
        break;
      case eTipoTramite.TRANSFERENCIA:
        const dataTransferencia = data as BandejaTranseferencia;
        this.listaLabelColumnas = ['Tramite solicitado', 'Carrera origen', 'Carrera destino', 'Fecha solicitud' , 'Motivo'];
        this.listaValoresColumnas = [dataTransferencia.tramite, dataTransferencia.carreraOrigen, dataTransferencia.carreradestino, dataTransferencia.fechaSolicitud, dataTransferencia.motivo ];
        break;
      case eTipoTramite.TRASPASO_DE_UNIVERSIDAD:
        const dataTraspaso = data as BandejaTraspasoUniversidad;
        this.listaLabelColumnas = ['Tramite solicitado', 'Universidad destino', 'Carrera destino', 'Periodo' , 'Año ingreso', 'Materias aprobadas', 'Materias reprobadas', 'Promedio General', 'Fecha solicitud', 'Motivo'];
        this.listaValoresColumnas = [dataTraspaso.tipoTramite, dataTraspaso.nombreuniversidaddestino, dataTraspaso.nombrecarreradestino, dataTraspaso.periodo, dataTraspaso.anioingreso, dataTraspaso.materiasaprobadas , dataTraspaso.materiasreprobadas, (dataTraspaso.materiasaprobadas / dataTraspaso.materiasreprobadas).toFixed( 2 ), this.datePipe.transform( dataTraspaso.fechaSolicitud, 'dd-MM-yyyy' ), dataTraspaso.descripcionMotivo ];
        break;

      default:
        break;
    }

  }

  private getTipoTramite( pIdTramite: number ): eTipoTramite {
    switch (pIdTramite) {
      case 1: return eTipoTramite.ANULACION;
      case 2: return eTipoTramite.CAMBIO_DE_CARRERA;
      case 3: return eTipoTramite.SUSPENCION;
      case 4: return eTipoTramite.READMISION;
      case 5: return eTipoTramite.TRANSFERENCIA;
      case 6: return eTipoTramite.TRASPASO_DE_UNIVERSIDAD;
      default:
        return undefined;
    }
  }

  private pasarSiguienteNivel(pEstado: eEstado, pEntidad: eEntidad | number, pObservaciones: string, redireccionarToBandeja?: boolean ): void {

    const pTablaIntermediaInsert: TablaIntermediaInsert = {
      idTipoTramite          : this.selectedTramite.idTramite,
      idEstudianteTipoTramite: this.selectedTramite.idEstudianteTipoTramiteTablaIntermedia,
      idEstado               : pEstado,
      idEntidad              : pEntidad,
      observaciones          : pObservaciones
    };

    this.tramiteAcademicoService.insertDataTablaIntermedia( pTablaIntermediaInsert ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      console.log( `${JSON.stringify(resp.data)}` );

      if (redireccionarToBandeja) {
        this.router.navigate([ 'dar/encargado/index' ]);
      }

    });
  }

  private verificarEstadoTramite(): void {

    if ( this.selectedTramite.idEstado === eEstado.ENVIADO || this.selectedTramite.idEstado === eEstado.APROBADO) {
      this.pasarSiguienteNivel( eEstado.RECEPCIONADO, this.selectedTramite.idEntidad, undefined  );
    }
  }

 /*  onAprobarTramite(): void {
    const dlgAprobar = this.dialog.open( ConfirmDialogComponent , {
      disableClose: false,
      width: '600px',
      data: {
        title  : 'Aprobar',
        content: '¿Seguro de aprobar el tramite seleccionado?',
        icon   : 'contact_support'
      }
    });

    dlgAprobar.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {

      }
    });
  } */

  onRechazarTramite(): void {
    const dlgRechazar = this.dialog.open( ConfirmDialogComponent , {
      disableClose: false,
      width: '600px',
      data: {
        title  : 'Rechazar',
        content: '¿Seguro de rechazar el tramite seleccionado?',
        icon   : 'contact_support'
      }
    });

    dlgRechazar.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {
        const observaciones = this.formDetalleTramite.controls[ 'observaciones' ].value;

        // this.pasarSiguienteNivel( eEstado.RECHAZADO, eEntidad.ESTUDIANTE, observaciones, true );
      }
    });
  }

  /* onEnviarTramite(): void {
    const dlgEnviar = this.dialog.open( ConfirmDialogComponent , {
      disableClose: false,
      width: '600px',
      data: {
        title  : 'Enviar',
        content: '¿Seguro de enviar el tramite seleccionado?',
        icon   : 'contact_support'
      }
    });

    dlgEnviar.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {

      }
    });
  } */

  onFinalizarTramite(): void {
    const dlgFinalizar = this.dialog.open( ConfirmDialogComponent , {
      disableClose: false,
      width: '600px',
      data: {
        title  : 'Finalizar',
        content: '¿Seguro de finalizar el tramite de : $tramite?'.replace( '$tramite', this.titleCasePipe.transform( this.selectedTramite.tramite ) ),
        icon   : 'contact_support'
      }
    });

    dlgFinalizar.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {
        const observaciones = this.formDetalleTramite.controls[ 'observaciones' ].value;

        this.pasarSiguienteNivel( eEstado.FINALIZADO, eEntidad.ENCARGADO_DAR, observaciones, true );
      }
    });
  }

}
