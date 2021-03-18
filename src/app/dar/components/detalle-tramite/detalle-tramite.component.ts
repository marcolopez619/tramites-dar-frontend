import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { FinalizarParticipacionQueryParameter } from '../../../hoja-de-ruta/models/hoja-de-ruta.model';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { eTipoTramite } from '../../../shared/enums/eTipoTramite.enum';
import { EstudianteModel } from '../../../shared/models/estudiante.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';

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
  listaLabelColumnas : Array<string>;
  listaValoresColumnas : Array<string>;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDatosEstudiante();
    this.setColumnas(2);

    this.formDetalleTramite = this.formBuilder.group({
      observaciones : [undefined, Validators.compose([ Validators.minLength(5), Validators.maxLength(200)])]
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  private getDatosEstudiante(): void{
    this.datoEstudiante = {
      ru            : 32926,
      ci            : '5550155',
      nombreCompleto: 'MOLINA LOPEZ MARCO ANTONIO',
      fotografia    : 'https://imagenes.elpais.com/resizer/Y6ooftjQIqJ38yuds-ss-PDsMxY=/768x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/ICWTJEOAHJBRXAPAO4ACVRSTQ4.jpg',
      idCarrera     : 1,
      carrera       : 'INGENIERIA DE SISTEMAS',
      idFacultad    : 1,
      facultad      : 'VICERRECTORADO',
      tipoTramite   : 'ANULACION DE CARRERA',
      fechaSolicitud: new Date(),
      anioIngreso   : 2010,
      cantMateriasAprobadas : 55,
      cantMateriasReprobadas : 10,
      promedioGeneral : 47.49
    };
  }

  private setColumnas(pTipoTramite: number): void{

    switch (pTipoTramite) {
      case eTipoTramite.ANULACION_CARRERA:
        this.listaLabelColumnas = ['Tramite solicitado', 'Carrera a anular', 'Fecha solicitud', 'Motivo'];
        this.listaValoresColumnas = ['Anulacion de carrera', this.datoEstudiante.carrera, this.datePipe.transform(this.datoEstudiante.fechaSolicitud, 'dd-MM-yyyy' ), 'ALGUN MOTIVO MUY LARRRRGOOOOOOOO'];
        break;
      case eTipoTramite.CAMBIO_CARRERA:
        this.listaLabelColumnas = ['Tramite solicitado','Carrera origen', 'Carrera destino', 'Fecha solicitud', 'Motivo'];
        this.listaValoresColumnas = ['Cambio de carrera',this.datoEstudiante.carrera, 'PEDAGOGIA INTERCULTURAL', '01/03/2020', 'SOLICITO EL CAMBIO DE CARRERA PORQ LO NECESITO'  ];
        break;
      case eTipoTramite.READMISION:
        this.listaLabelColumnas = ['Tramite solicitado','Carrera origen', 'Fecha solicitud suspencion', 'Fecha solicitud readmision', 'Tiempo', 'Motivo'];
        this.listaValoresColumnas = ['Readmision', this.datoEstudiante.carrera, '04/04/2020', '06/12/2020', '2 gestiones', 'SOLICITO LA READMISION PARA CONTINUAR CON MIS ESTUDIOS' ];
        break;
      case eTipoTramite.SUSPENCION:
        this.listaLabelColumnas = ['Tramite solicitado','Carrera origen', 'Tiempo', 'Rango', 'Fecha solicitud', 'Motivo'];
        this.listaValoresColumnas = ['Suspención', this.datoEstudiante.carrera, '3 gestiones', ' 17/03/2021   al 17/03/2021', '08/23/2020', 'ALGUN MOTIVO LARRRGOOO QUE NO ME INTERASA' ];
        break;
      case eTipoTramite.TRASPASO_UNIVERSIDAD:
        this.listaLabelColumnas = ['Tramite solicitado','Universidad destino', 'Carrera destino', 'Periodo' , 'Año ingreso', 'Materias aprobadas', 'Materias reprobadas', 'Promedio General', 'Fecha solicitud', 'Motivo'];
        this.listaValoresColumnas = ['Traspaso de universidad', 'UNIVERSIDAD MAYOR, REAL Y PONTIFICIA DE SAN FRANCISCO XAVIER DE CHUQUISACA', 'INGENIERIA EN SISTEMAS', '1/2021', '2007', '40' , '9', '54.78', '01/01/2020', ' ALGUN MOTIVO DE MIERDA PARA Q NO JODAN' ];
        break;

      default:
        break;
    }


  }

  onAprobarTramite(): void{
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

  onRechazarTramite(): void{
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

  onEnviarTramite(): void{
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

  onFinalizarTramite(): void{
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
