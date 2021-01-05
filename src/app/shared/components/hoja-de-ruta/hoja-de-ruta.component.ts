import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { takeUntil } from 'rxjs/operators';
import { HojaDeRutaModel  } from '../../../hoja-de-ruta/models/hoja-de-ruta.model';
import { slideInLeftAnim, zoomInAnim } from '../../animations/template.animation';
import { BaseComponent } from '../../base.component';
import { TipoDocumentoModel, TipoTramiteModel } from '../../models/parametricas.model';
import { UsuarioModel } from '../../models/Usuario.model';
import { ContextoService } from '../../services/contexto.service';
import { LangService } from '../../services/lang.service';
import { ParametricaService } from '../../services/parametrica.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-hoja-de-ruta',
  templateUrl: './hoja-de-ruta.component.html',
  styleUrls: ['./hoja-de-ruta.component.css'],
  animations: [zoomInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@zoomInAnim]': '' }
})
export class HojaDeRutaComponent extends BaseComponent implements OnInit {

  formHojaDeRuta: FormGroup;

  listaTipoTramite: Array<TipoTramiteModel> = [];
  listaUsuarios: Array<UsuarioModel> = [];
  listaTipoDocumento: Array<TipoDocumentoModel> = [];
  listaRemitentes: Array<UsuarioModel> = [];
  listaDestinatarios: Array<UsuarioModel> = [];
  listaCc: Array<UsuarioModel> = [];

  @Output('registraComponenteHojaDeRuta')
  registraComponenteHojaDeRuta: EventEmitter<HojaDeRutaModel> = new EventEmitter<HojaDeRutaModel>();

  descripcionTramite: string;
  private _isDestinatarioInvalid: boolean;
  private _isRemitenteInvalid: boolean;
  private _isCcInvalid: boolean;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public contextService: ContextoService,
    public langService: LangService,
    private formBuilder: FormBuilder,
    private parametricaService: ParametricaService,
    private usuarioService: UsuarioService,
  ) {
    super();
  }

  ngOnInit(): void {
    const idTipoTramiteDefault = 1;
    const idUnidadDir = this.contextService.getItemContexto('idUnidadDir');
    const idUnidadJef = this.contextService.getItemContexto('idUnidadJef');
    const idUnidadOrg = Number( idUnidadJef && idUnidadJef >= 0 ? idUnidadJef : idUnidadDir );

    this.parametricaService.getTipoDocumentos( idUnidadOrg ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( listaTipoDocs => {
      this.listaTipoDocumento = listaTipoDocs.data as Array<TipoDocumentoModel>;
    });
    this.parametricaService.getTipoTramite().pipe( takeUntil( this.unsubscribe$ ) ).subscribe( listaTipoTramite => {
      this.listaTipoTramite = listaTipoTramite.data as Array<TipoTramiteModel>;
      this.descripcionTramite = this.listaTipoTramite.filter( x => x.idTipoTramite === idTipoTramiteDefault )[0].descripcionTramite;
    });

    // Carga los usuarios de la bd
    const idTipoTramite = 1;
    this.getAllusuarios(idTipoTramite);

    this.formHojaDeRuta = this.formBuilder.group({
      tipoTramite       : [undefined, Validators.compose([Validators.required])],
      listaRemitentes   : [undefined, Validators.compose([Validators.required])],
      listaDestinatarios: [undefined, Validators.compose([Validators.required])],
      listaCc           : [undefined],
      numeroCite        : [undefined, Validators.compose([Validators.required])],
      referencia        : [undefined, Validators.compose([Validators.required])],
      numeroFojas       : [undefined, Validators.compose([Validators.required])],
      plazoDias         : [undefined, Validators.compose([Validators.required])],
      isUrgente         : [false, Validators.compose([Validators.required])],
      isConCopiaFisica  : [false, Validators.compose([Validators.required])]
    });
  }

  onGuardarHojaDeRuta(): void {
    this.registraComponenteHojaDeRuta.emit();
  }

  onTipoTramiteChange(event: MatSelectChange ): void {
    this.formHojaDeRuta.controls['tipoTramite'].setValue( event.value );
    this.formHojaDeRuta.controls['tipoTramite'].markAsTouched();
    console.log( '----> ' + this.formHojaDeRuta.controls['tipoTramite'].value );
    this.descripcionTramite = this.listaTipoTramite.filter( x => x.idTipoTramite === event.value )[ 0 ].descripcionTramite;
    this.getAllusuarios( event.value );
  }

  private getAllusuarios( idTipotramite: number ): void {
    // Borra los datos de las listas
    this.listaDestinatarios.length = this.listaRemitentes.length = this.listaUsuarios.length = 0;

    this.usuarioService.getAllUsuarios( idTipotramite ).pipe( takeUntil( this.unsubscribe$ )).subscribe( respService => {
      this.listaUsuarios = respService.data;
    });
  }

  getEstatusFormRemitente($event): void {
    this._isRemitenteInvalid = $event;
    console.log( ' is Invalid Remitente : ' + $event );
  }

  getEstatusFormDestinatario($event): void {
    this._isDestinatarioInvalid = $event;
    console.log( ' is Invalid Destinatario : ' + $event );
  }

  getEstatusFormcC($event): void {
    this._isCcInvalid = $event;
    console.log( ' is Invalid Remitente : ' + $event );
  }

  getListaSeleccionadaRemitentes($event): void {
    console.log('----------------------');
    this.listaRemitentes = $event as Array<UsuarioModel>;

    this.listaRemitentes.forEach( element => {
      console.log( 'Remitente ---> ' + element.nombreCompleto );
    });
    this.formHojaDeRuta.controls['listaRemitentes'].setValue( (this._isRemitenteInvalid) ? undefined : this.listaRemitentes );
  }

  getListaSeleccionadaDestinatarios($event): void {
    console.log('----------------------');
    this.listaDestinatarios = $event as Array<UsuarioModel>;
    this.listaDestinatarios.forEach( element => {
      console.log( ' Destinatario ---> ' + element.nombreCompleto );
    });
    this.formHojaDeRuta.controls['listaDestinatarios'].setValue( (this._isDestinatarioInvalid) ? undefined : this.listaDestinatarios );
  }

  getListaSeleccionadaCc($event): void {
    console.log('----------------------');
    this.listaCc = $event as Array<UsuarioModel>;
    this.listaCc.forEach( element => {
      console.log( ' Destinatario ---> ' + element.nombreCompleto );
    });
    this.formHojaDeRuta.controls['listaCc'].setValue( (this._isCcInvalid) ? undefined : this.listaCc );
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }
}
