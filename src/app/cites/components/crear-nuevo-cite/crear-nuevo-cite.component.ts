import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { TipoTramiteModel } from '../../../hoja-de-ruta/models/hoja-de-ruta.model';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { UsuarioModel } from '../../../shared/models/Usuario.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { UtilService } from '../../../shared/services/util.service';
import { CitesService } from '../../cites.service';
import { CiteTemplateJsReport } from '../../models/cites.models';
import { ReporteService } from './../../../shared/services/reporte.service';

@Component({
  selector: 'app-crear-nuevo-cite',
  templateUrl: './crear-nuevo-cite.component.html',
  styleUrls: ['./crear-nuevo-cite.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class CrearNuevoCiteComponent extends BaseComponent implements OnInit {

  formCrearCite: FormGroup;

  listaUsuarios: Array<UsuarioModel>;
  fechaCreacionCite = new Date();
  fechaCreacionCiteLiteral = `LA PAZ ${this.fechaCreacionCite.getDate()} DE ${this.getFechaFormatoLiteral(this.fechaCreacionCite.getMonth())} DE ${this.fechaCreacionCite.getFullYear()}`;
  // FECHA: LA PAZ {{fechaCreacionCite.getDate()}} de {{getFechaFormatoLiteral(fechaCreacionCite.getMonth())}} de {{fechaCreacionCite.getFullYear()}}

  listaTipoDocumento: Array<TipoTramiteModel> = [
    { idTipoTramite: 1, descripcionTipoTramite: 'INTERNO' },
    { idTipoTramite: 2, descripcionTipoTramite: 'EXTERNO' }
  ];

  listaVias: Array<UsuarioModel> = [];
  listaDestinatarios: Array<UsuarioModel> = [];
  listaRemitentes: Array<UsuarioModel> = [];

  private _isDestinatarioInvalid: boolean;
  private _isRemitenteInvalid: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private citesService: CitesService,
    private reporteService: ReporteService,
    private utilService: UtilService
  ) { super(); }

  ngOnInit(): void {

    this.usuarioService.getAllUsuarios().pipe( takeUntil( this.unsubscribe$ )).subscribe( respService => {
      this.listaUsuarios = respService.data;
    });

    this.formCrearCite = this.formBuilder.group({
      tipoDocumento     : [undefined, Validators.compose([Validators.required])],
      // listaVias         : [undefined],
      listaDestinatarios: [undefined, Validators.compose([Validators.required])],
      listaRemitentes   : [undefined, Validators.compose([Validators.required])],
      referencia        : [undefined, Validators.compose([Validators.required])]
    });

  }

  getListaSeleccionadaVias($event): void {
    console.log('----------------------');

    this.listaVias = $event as Array<UsuarioModel>;

    this.listaVias.forEach( element => {
      console.log( ' VIAS : ---> ' + ( element as UsuarioModel ).nombreCompleto );
    });
  }

  getListaSeleccionadaDestinatarios($event): void {
    console.log('----------------------');
    this.listaDestinatarios = $event as Array<UsuarioModel>;

    this.listaDestinatarios.forEach( element => {
      console.log( ' Destinatario ---> ' + element.nombreCompleto );
    });

    this.formCrearCite.controls['listaDestinatarios'].setValue( (this._isDestinatarioInvalid) ? undefined : this.listaDestinatarios );
  }

  getListaSeleccionadaRemitentes($event): void {
    console.log('----------------------');
    this.listaRemitentes = $event as Array<UsuarioModel>;

    this.listaRemitentes.forEach( element => {
      console.log( 'Remitente ---> ' + element.nombreCompleto );
    });

    this.formCrearCite.controls['listaRemitentes'].setValue( (this._isRemitenteInvalid) ? undefined : this.listaRemitentes );
  }

  getEstatusFormDestinatario($event): void {
    this._isDestinatarioInvalid = $event;
    console.log( ' is Invalid Destinatario : ' + $event );
  }

  getEstatusFormRemitente($event): void {
    this._isRemitenteInvalid = $event;
    console.log( ' is Invalid Remitente : ' + $event );
  }

  getFechaFormatoLiteral(indiceMes: number ): string {
    switch (indiceMes) {
      case 0: return 'ENERO';
      case 1: return 'FEBRERO';
      case 2: return 'MARZO';
      case 3: return 'ABRIL';
      case 4: return 'MAYO';
      case 5: return 'JUNIO';
      case 6: return 'JULIO';
      case 7: return 'AGOSTO';
      case 8: return 'SEPTIEMBRE';
      case 9: return 'OCTUBRE';
      case 10: return 'NOVIEMBRE';
      case 11: return 'DICIEMBRE';
      default: return 'MES NO ESPECIFICADO';
    }
  }

  onGenerateCiteTemplate(): void {

    // TODO:  Consumir el servicio de creacion de cites.

    const datoReporte: CiteTemplateJsReport = {
      ListaRemitente      : this.listaRemitentes,
      ListaVias           : this.listaVias,
      ListaDestinatarios  : this.listaDestinatarios,
      Referencia          : this.formCrearCite.controls[ 'referencia' ].value,
      FechaCreacionLiteral: this.fechaCreacionCiteLiteral
    };


    this.reporteService.getPlanillaCiteTemplate(datoReporte).pipe(takeUntil(this.unsubscribe$)).subscribe( respTemplate => {
      this.utilService.createDocumentFromBlob( respTemplate );
    });
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
