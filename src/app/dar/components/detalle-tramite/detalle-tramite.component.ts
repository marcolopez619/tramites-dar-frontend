import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { AnulacionService } from '../../../estudiante/components/anulacion/anulacion.service';
import { CambioCarreraService } from '../../../estudiante/components/cambio-carrera.service';
import { ReadmisionService } from '../../../estudiante/components/readmision/readmision.service';
import { SuspencionService } from '../../../estudiante/components/suspencion/suspencion.service';
import { TraspasoUniversidadService } from '../../../estudiante/components/traspaso-universidad/traspaso-universidad.service';
import { EstudianteService } from '../../../estudiante/estudiante.service';
import { BandejaAnulacion } from '../../../estudiante/models/anulacion.models';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { eTipoTramite } from '../../../shared/enums/tipoTramite.enum';
import { EstudianteModel } from '../../../shared/models/estudiante.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { BandejaCambioCarrera, BandejaReadmision, BandejaSuspencion, BandejaTraspasoUniversidad } from '../../../tramites/models/tramites.models';

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

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private estudianteService: EstudianteService,

    private anulacionService: AnulacionService,
    private cambioDeCarreraService: CambioCarreraService,
    private suspencionService: SuspencionService,
    private readmisionService: ReadmisionService,
    // private transferenciaService: TransferenciaService,
    private traspasoService: TraspasoUniversidadService
  ) {
    super();
  }

  ngOnInit(): void {
    this.formDetalleTramite = this.formBuilder.group({
      observaciones : [undefined, Validators.compose([ Validators.minLength(5), Validators.maxLength(200)])]
    });

    this.getDatosEstudiante();

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

    const idTramite = eTipoTramite.TRASPASO_DE_UNIVERSIDAD;
    const idTipoTramite = 5;
    const idEstudiante = 1;
    this.getDetalleTramite(idTramite, idEstudiante, idTipoTramite);

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  private getDatosEstudiante(): void {

    const idEstudiante = 1; // FIXME: dato quemado

    this.estudianteService.getInformacionEstudiante( idEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.datoEstudiante = resp.data;
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
        this.listaValoresColumnas = [dataAnulacion.tipoTramite , dataAnulacion.carrera, dataAnulacion.fechaSolicitud.toString(), dataAnulacion.motivo];
        break;
      case eTipoTramite.CAMBIO_DE_CARRERA:
        const dataCambioCarrera = data as BandejaCambioCarrera;
        this.listaLabelColumnas = ['Tramite solicitado', 'Carrera origen', 'Carrera destino', 'Fecha solicitud', 'Motivo'];
        this.listaValoresColumnas = [dataCambioCarrera.tipoTramite, dataCambioCarrera.carreraorigen, dataCambioCarrera.carreradestino, dataCambioCarrera.fechaSolicitud.toString(), dataCambioCarrera.motivo  ];
        break;
      case eTipoTramite.SUSPENCION:
        const dataSuspencion = data as BandejaSuspencion;
        this.listaLabelColumnas = ['Tramite solicitado', 'Carrera origen', 'Tiempo',  'Fecha solicitud', 'Motivo'];
        this.listaValoresColumnas = [dataSuspencion.tipoTramite, dataSuspencion.carrera, dataSuspencion.tiempoSolicitado.toString().concat(` Gestiones`),  dataSuspencion.fechaSolicitud.toString(), dataSuspencion.motivo ];
        break;
      case eTipoTramite.READMISION:
        const dataReadmision = data as BandejaReadmision;
        this.listaLabelColumnas = ['Tramite solicitado', 'Carrera origen', 'Fecha solicitud suspencion', 'Tiempo suspencion solicitado', 'Fecha solicitud readmision', 'Motivo'];
        this.listaValoresColumnas = [ dataReadmision.tipoTramite, dataReadmision.carrera, dataReadmision.suspencion[ 0 ].fechaSolicitud.toString(), dataReadmision.suspencion[ 0 ].tiempoSolicitado.toString() , dataReadmision.fechaSolicitudReadmision.toString(), dataReadmision.motivo ];
        break;
      case eTipoTramite.TRASPASO_DE_UNIVERSIDAD:
        const dataTraspaso = data as BandejaTraspasoUniversidad;
        this.listaLabelColumnas = ['Tramite solicitado', 'Universidad destino', 'Carrera destino', 'Periodo' , 'Año ingreso', 'Materias aprobadas', 'Materias reprobadas', 'Promedio General', 'Fecha solicitud', 'Motivo'];
        this.listaValoresColumnas = [dataTraspaso.tipoTramite, dataTraspaso.nombreuniversidaddestino, dataTraspaso.nombrecarreradestino, dataTraspaso.periodo, dataTraspaso.anioingreso, dataTraspaso.materiasaprobadas , dataTraspaso.materiasreprobadas, (dataTraspaso.materiasaprobadas / dataTraspaso.materiasreprobadas).toFixed( 2 ), this.datePipe.transform( dataTraspaso.fechaSolicitud, 'dd-MM-yyyy' ), dataTraspaso.motivo ];
        break;

      default:
        break;
    }

  }

  onAprobarTramite(): void {
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
  }

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

      }
    });
  }

  onEnviarTramite(): void {
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
  }

  onFinalizarTramite(): void {
    const dlgFinalizar = this.dialog.open( ConfirmDialogComponent , {
      disableClose: false,
      width: '600px',
      data: {
        title  : 'Finalizar',
        content: '¿Seguro de finalizar el tramite seleccionado?',
        icon   : 'contact_support'
      }
    });

    dlgFinalizar.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {

      }
    });
  }

}
