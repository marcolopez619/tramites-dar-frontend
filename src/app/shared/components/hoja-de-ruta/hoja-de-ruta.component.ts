import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { takeUntil } from 'rxjs/operators';
import { HojaDeRutaModel } from '../../../hoja-de-ruta/models/hoja-de-ruta.model';
import {
  slideInLeftAnim,
  zoomInAnim
} from '../../animations/template.animation';
import { BaseComponent } from '../../base.component';
import { HojaDeRutaInsertModel } from '../../models/hoja-de-ruta.model';
import {
  TipoDocumentoModel,
  TipoTramiteModel
} from '../../models/parametricas.model';
import { UsuarioModel } from '../../models/Usuario.model';
import { ContextoService } from '../../services/contexto.service';
import { HojaRutaService } from '../../services/hoja-ruta.service';
import { LangService } from '../../services/lang.service';
import { ParametricaService } from '../../services/parametrica.service';
import { UsuarioService } from '../../services/usuario.service';
import { CiteModelByUsuario } from '../../../cites/models/cites.models';
import { CitesService } from '../../../cites/cites.service';
import { AutocompleteData } from '../../models/autocomplete.model';

export class Test {

}

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

  listaInicialRemitentes: Array<UsuarioModel> = [];
  listaInicialDestinatarios: Array<UsuarioModel> = [];
  listaInicialCC: Array<UsuarioModel> = [];
  listaCite: Array<CiteModelByUsuario> = [];
  citeSelected: CiteModelByUsuario;

  descripcionTramite: string;
  private _isDestinatarioInvalid: boolean;
  private _isRemitenteInvalid: boolean;
  private _isCcInvalid: boolean;
  private _isCiteInvalid: boolean;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public contextService: ContextoService,
    public langService: LangService,
    private formBuilder: FormBuilder,
    private parametricaService: ParametricaService,
    private usuarioService: UsuarioService,
    private hojaRutaService: HojaRutaService,
    private citesService: CitesService
  ) {
    super();
  }

  ngOnInit(): void {
    this.citeSelected = this.data.citeSelected as CiteModelByUsuario;

    this.parametricaService
      .getTipoTramite()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((listaTipoTramite) => {
        this.listaTipoTramite = listaTipoTramite.data as Array<TipoTramiteModel>;
      });

    // Carga los usuarios de la bd
    const idTipoTramite = 1;
    this.getAllusuarios(idTipoTramite);

    const idPersonaGd = this.contextService.getItemContexto(`idPersonaGd`) ?? 542;
    this.getAllCitesFromPersona( idPersonaGd );

    if (this.citeSelected) {
      this.formHojaDeRuta = this.formBuilder.group({
        tipoTramite       : [ this.citeSelected.idTipoTramite, Validators.compose([Validators.required])],
        listaRemitentes   : [this.citeSelected.remitentes, Validators.compose([Validators.required])],
        listaDestinatarios: [ this.citeSelected.destinatarios, Validators.compose([Validators.required])],
        listaCc           : [undefined],
        referencia        : [ this.citeSelected.referencia, Validators.compose([Validators.required])],
        numeroFojas       : [undefined, Validators.compose([Validators.required])],
        plazoDias         : [undefined, Validators.compose([Validators.required])],
        listaCite         : [undefined, Validators.compose([Validators.required])],
        isUrgente         : [false, Validators.compose([Validators.required])],
        isConCopiaFisica  : [false, Validators.compose([Validators.required])]
      });
    } else {
      this.formHojaDeRuta = this.formBuilder.group({
        tipoTramite       : [ 1 , Validators.compose([Validators.required])],
        listaRemitentes   : [undefined, Validators.compose([Validators.required])],
        listaDestinatarios: [undefined, Validators.compose([Validators.required])],
        listaCc           : [undefined],
        referencia        : [undefined, Validators.compose([Validators.required])],
        numeroFojas       : [ 0, Validators.compose([Validators.required])],
        plazoDias         : [ 0, Validators.compose([Validators.required])],
        listaCite         : [undefined, Validators.compose([Validators.required])],
        isUrgente         : [false, Validators.compose([Validators.required])],
        isConCopiaFisica  : [false, Validators.compose([Validators.required])]
      });
    }
  }



  private prepareArrayAsJSONString( lista: Array<any>, nombreKey: string ): Array<any> {
    const listaJSON = [];
    const listaIdPersona = lista.map((cc) => cc.idPersonaGd);

    listaIdPersona.forEach((id) => {
      if (nombreKey === 'idPersonaGd') {
        listaJSON.push({ idPersonaGd: id });
      }
    });

    return listaJSON;
  }

  private getAllCitesFromPersona( idPersonaGd: number ): void {
    this.citesService.getAllCitesFromPersona( idPersonaGd ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( listaCitesPersona => {
      this.listaCite = listaCitesPersona.data as Array<CiteModelByUsuario>;
    });
  }

  private getAllusuarios(idTipotramite: number, isChangeFromTramiteChange?: boolean): void {
    // Borra los datos de las listas
    this.listaDestinatarios.length = this.listaRemitentes.length = this.listaUsuarios.length = 0;

    this.usuarioService
      .getAllUsuarios(idTipotramite)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((respService) => {
        this.listaUsuarios = respService.data;

        if ( isChangeFromTramiteChange ) {
          this.listaInicialRemitentes = [];
          this.listaInicialRemitentes.length = 0;
        } else {
          // Recupera la data del usuario loggeado como remitente.
          const idPersonaGDLoggeado = this.contextService.getItemContexto('idPersonaGd');
          this.setListaInicialRemitente(idPersonaGDLoggeado);
        }

      });
    }

  private setListaInicialRemitente( idPersonaGD: number ): void {
    const usuario = this.listaUsuarios.find( x => x.idPersonaGd === idPersonaGD );
    this.listaInicialRemitentes.push(usuario);
    this.formHojaDeRuta.controls['listaRemitentes'].setValue(usuario);
  }

  onGuardarHojaDeRuta(): void {
    let datosFormulario: HojaDeRutaInsertModel = {};

    if (this.citeSelected) {
      // Crea la hoja de ruta en funcion a los datos del cite
      const listaIdPersonaCC = this.prepareArrayAsJSONString(
        this.listaCc,
        'idPersonaGd'
      );
      const listaIdCite = [{ idCite: this.citeSelected.idCite }];

      const datosHRFromCite: HojaDeRutaInsertModel = {
        IdTipoTramite        : this.formHojaDeRuta.controls['tipoTramite'].value,
        Gestion              : new Date().getFullYear(),
        IdPersonaRemite      : this.listaInicialRemitentes[0].idPersonaGd,
        IdPersonaDestinatario: this.listaDestinatarios[0].idPersonaGd,
        IdPersonaSolicita    : this.listaInicialRemitentes[0].idPersonaGd,
        ListDestCopia        : JSON.stringify(listaIdPersonaCC),
        ListCite             : JSON.stringify(listaIdCite),
        ListCiteExt          : undefined,
        ListAdjunto          : undefined,
        Referencia           : this.citeSelected.referencia,
        PlazoDias            : this.formHojaDeRuta.controls['plazoDias'].value,
        Urgente              : +this.formHojaDeRuta.controls['isUrgente'].value,
        ConCopiaFisica       : +this.formHojaDeRuta.controls['isUrgente'].value,
        UsuarioBitacora      : this.contextService.getItemContexto('samActName'),
      };

      datosFormulario = datosHRFromCite;
    } else {
      const objDatosFormulario: any = this.formHojaDeRuta.value;

      datosFormulario.IdTipoTramite         = objDatosFormulario.tipoTramite;
      datosFormulario.Gestion               = new Date().getFullYear();
      datosFormulario.IdPersonaRemite       = objDatosFormulario.listaRemitentes.idPersonaGd;
      datosFormulario.IdPersonaDestinatario = objDatosFormulario.listaDestinatarios[0].idPersonaGd;
      datosFormulario.IdPersonaSolicita     = objDatosFormulario.listaCc==null?undefined:objDatosFormulario.listaCc[0].idPersonaGd;
      datosFormulario.ListDestCopia         = undefined;
      datosFormulario.ListCite              = JSON.stringify(this.listaCite);
      datosFormulario.ListCiteExt           = undefined;
      datosFormulario.ListAdjunto           = undefined;
      datosFormulario.Referencia            = objDatosFormulario.referencia;
      datosFormulario.PlazoDias             = objDatosFormulario.plazoDias ?? 0;
      datosFormulario.Urgente               = objDatosFormulario.isUrgente = false ? 0 : 1;
      datosFormulario.ConCopiaFisica        = objDatosFormulario.isConCopiaFisica = false ? 0 : 1;
      datosFormulario.UsuarioBitacora       = this.contextService.getItemContexto('samActName');
    }

    this.hojaRutaService
      .insertHojaDeRuta(datosFormulario)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        this.dialogRef.close(result);
      });
  }

  onCiteSeleccionChange(event: MatSelectChange): void {
    const infCiteSelected = this.listaCite.find( x => x.idCite === event.value );
    var algo=infCiteSelected;
    var algo2=event;
    this.listaCite=[{idCite: infCiteSelected.idCite, numeroCite:infCiteSelected.numeroCite}]
    //this.formHojaDeRuta.controls['referencia'].setValue(infCiteSelected.referencia);
  }

  onTipoTramiteChange(event: MatSelectChange): void {

    // Borra la lista inicial de remitentes
    this.listaInicialRemitentes.length = 0;
    this.listaInicialRemitentes = [];

    this.formHojaDeRuta.controls['tipoTramite'].setValue(event.value);
    this.formHojaDeRuta.controls['tipoTramite'].markAsTouched();
    console.log('----> ' + this.formHojaDeRuta.controls['tipoTramite'].value);
    this.getAllusuarios(event.value, true);
  }

  getEstatusFormRemitente($event): void {
    this._isRemitenteInvalid = $event;
    console.log(' is Invalid Remitente : ' + $event);
  }

  getEstatusFormDestinatario($event): void {
    this._isDestinatarioInvalid = $event;
    console.log(' is Invalid Destinatario : ' + $event);
  }

  getEstatusFormcC($event): void {
    this._isCcInvalid = $event;
    console.log(' is Invalid Remitente : ' + $event);
  }

  getListaSeleccionadaRemitentes(event: AutocompleteData): void {
    this.listaRemitentes = event.listaSeleccionados;
    this.formHojaDeRuta.controls['listaRemitentes'].setValue( this._isRemitenteInvalid ? undefined : this.listaRemitentes );
    const idPersonaGd = this.listaRemitentes[0].idPersonaGd;
    this.getAllCitesFromPersona( idPersonaGd );
  }

  getListaSeleccionadaDestinatarios(event: AutocompleteData): void {
    this.listaDestinatarios = event.listaSeleccionados;
    this.formHojaDeRuta.controls['listaDestinatarios'].setValue(
      this._isDestinatarioInvalid ? undefined : this.listaDestinatarios
    );
  }

  getListaSeleccionadaCc(event: AutocompleteData): void {
    this.listaCc = event.listaSeleccionados;
    this.formHojaDeRuta.controls['listaCc'].setValue( this._isCcInvalid ? undefined : this.listaCc );
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }
}
