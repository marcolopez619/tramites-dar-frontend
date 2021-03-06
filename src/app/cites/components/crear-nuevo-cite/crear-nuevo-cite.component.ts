import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select/public-api';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { TipoDocumentoModel, TipoTramiteModel } from '../../../shared/models/parametricas.model';
import { UsuarioModel } from '../../../shared/models/Usuario.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { ParametricaService } from '../../../shared/services/parametrica.service';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { UtilService } from '../../../shared/services/util.service';
import { CitesService } from '../../cites.service';
import { ReporteService } from './../../../shared/services/reporte.service';
import { CiteModel, CiteTemplateJsReport, ResultCiteInst } from '../../models/cites.models';
import { AutocompleteData } from '../../../shared/models/autocomplete.model';

@Component({
  selector: 'app-crear-nuevo-cite',
  templateUrl: './crear-nuevo-cite.component.html',
  styleUrls: ['./crear-nuevo-cite.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class CrearNuevoCiteComponent extends BaseComponent implements OnInit {

  formCrearCite: FormGroup;

  listaUsuarios: Array<UsuarioModel> = [];

  listaUsuariosVias: Array<UsuarioModel> = [];
  listaUsuariosDestinatarios: Array<UsuarioModel> = [];
  listaUsuariosRemitentes: Array<UsuarioModel> = [];

  fechaCreacionCite = new Date();
  fechaCreacionCiteLiteral = `LA PAZ ${this.fechaCreacionCite.getDate()} DE ${this.getFechaFormatoLiteral(this.fechaCreacionCite.getMonth())} DE ${this.fechaCreacionCite.getFullYear()}`; // FIXME: ALGUNOS TEXTOS ESTAN QUEMADOS

  listaTipoDocumento: Array<TipoDocumentoModel> = [];
  listaTipotramite: Array<TipoTramiteModel> = [];

  listaVias: Array<UsuarioModel> = [];
  listaDestinatarios: Array<UsuarioModel> = [];
  listaRemitentes: Array<UsuarioModel> = [];

  // descripcionTramite: string;
  descripcionTipoDocumento: string;

  resultCiteInst: ResultCiteInst;

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
    private utilService: UtilService,
    private parametricaService: ParametricaService
  ) { super(); }

  ngOnInit(): void {

    const idTipoTramiteDefault = 1;
    const idUnidadDir = this.contextService.getItemContexto('idUnidadDir');
    const idUnidadJef = this.contextService.getItemContexto('idUnidadJef');
    const idUnidadOrg = Number( idUnidadJef && idUnidadJef >= 0 ? idUnidadJef : idUnidadDir );

    this.parametricaService.getTipoDocumentos( idUnidadOrg ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( listaTipoDocs => {
      this.listaTipoDocumento = listaTipoDocs.data as Array<TipoDocumentoModel>;
    });

    this.parametricaService.getTipoTramite().pipe( takeUntil( this.unsubscribe$ ) ).subscribe( listaTipoTramite => {
      this.listaTipotramite = listaTipoTramite.data as Array<TipoTramiteModel>;
    });

    // Carga los usuarios de la bd
    const idTipoTramite = 1;
    this.getAllusuarios(idTipoTramite);

    this.formCrearCite = this.formBuilder.group({
      tipoTramite       : [ idTipoTramiteDefault, Validators.compose([Validators.required])],
      tipoDocumento     : [undefined, Validators.compose([Validators.required])],
      listaDestinatarios: [undefined, Validators.compose([Validators.required])],
      listaRemitentes   : [undefined, Validators.compose([Validators.required])],
      referencia        : [undefined, Validators.compose([Validators.required])]
    });

  }

  private async getAllusuarios( idTipotramite: number ) {

    const respService =  await this.usuarioService.getAllUsuarios( idTipotramite ).toPromise();

    if (idTipotramite === 1 ) {
      // TRAMITE INTERNO
      this.listaUsuarios = this.listaUsuariosDestinatarios = this.listaUsuariosVias = this.listaUsuariosRemitentes = respService.data;
      const idPersonaGd = this.contextService.getItemContexto(`idPersonaGd`);
      this.listaRemitentes = this.listaUsuarios.filter( x => x.idPersonaGd === idPersonaGd);

      this.deleteSelectedUsersFromAnotherLists( this.listaRemitentes );

    } else {
      // TRAMITE EXTERNO
      this.listaUsuariosDestinatarios = respService.data;
    }
  }

  private deleteSelectedUsersFromAnotherLists( arrayItemsToDelete: Array<UsuarioModel>  ): void {
    this.listaUsuariosDestinatarios = this.listaUsuariosDestinatarios.filter( x => !arrayItemsToDelete.includes( x ) );
    this.listaUsuariosVias          = this.listaUsuariosVias.filter( x => !arrayItemsToDelete.includes( x ) );
    this.listaUsuariosRemitentes    = this.listaUsuariosRemitentes.filter( x => !arrayItemsToDelete.includes( x ) );
  }

  getListaSeleccionadaVias(event: AutocompleteData): void {
    this.listaVias = event.listaSeleccionados;
    this.deleteSelectedUsersFromAnotherLists(this.listaVias);

    if (event.itemEliminado) {
      // A??adir el item eliminado a las demas lista complementarias
      this.listaUsuariosDestinatarios.push( event.itemEliminado );
      this.listaUsuariosRemitentes.push( event.itemEliminado );
    }
  }

  getListaSeleccionadaDestinatarios(event: AutocompleteData): void {
    this.listaDestinatarios = event.listaSeleccionados;
    this.formCrearCite.controls['listaDestinatarios'].setValue( (this._isDestinatarioInvalid) ? undefined : this.listaDestinatarios );
    this.deleteSelectedUsersFromAnotherLists(this.listaDestinatarios);

    if (event.itemEliminado) {
      // A??adir el item eliminado a las demas lista complementarias
      this.listaUsuariosRemitentes.push( event.itemEliminado );
      this.listaUsuariosVias.push( event.itemEliminado );
    }
  }

  getListaSeleccionadaRemitentes(event: AutocompleteData): void {
    this.listaRemitentes = event.listaSeleccionados;
    this.formCrearCite.controls['listaRemitentes'].setValue( (this._isRemitenteInvalid) ? undefined : this.listaRemitentes );
    this.deleteSelectedUsersFromAnotherLists(this.listaRemitentes);

    if (event.itemEliminado) {
      // A??adir el item eliminado a las demas lista complementarias
      this.listaUsuariosDestinatarios.push( event.itemEliminado );
      this.listaUsuariosVias.push( event.itemEliminado );
    }
  }

  getEstatusFormDestinatario($event): void {
    this._isDestinatarioInvalid = $event;
    console.log( ' is Invalid Destinatario : ' + $event );
  }

  getEstatusFormRemitente($event): void {
    this._isRemitenteInvalid = $event;

    if (!this._isRemitenteInvalid) {
      this.formCrearCite.controls['listaRemitentes'].setValue(this.listaRemitentes);
    }

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

  onTipoTramiteChange(event: MatSelectChange ): void {
    this.formCrearCite.controls['tipoTramite'].setValue( event.value );
    this.formCrearCite.controls['tipoTramite'].markAsTouched();
    console.log( '----> ' + this.formCrearCite.controls['tipoTramite'].value );

    // this.descripcionTramite = this.listaTipotramite.filter( x => x.idTipoTramite === event.value )[ 0 ].descripcionTramite;

    this.getAllusuarios( event.value );

  }

  onTipoDocumentoChange(event: MatSelectChange ): void {
    this.formCrearCite.controls['tipoDocumento'].setValue( event.value );
    this.formCrearCite.controls['tipoDocumento'].markAsTouched();
    console.log( ' tipo documento : ----> ' + this.formCrearCite.controls['tipoDocumento'].value );
    this.descripcionTipoDocumento = this.listaTipoDocumento.filter( x => x.idDocumentoEmite === event.value )[ 0 ].descripcionDoc;
  }

  onGenerateCiteTemplate(): void {

    const informacionCite: CiteModel = {
      IidPersonaGd     : this.contextService.getItemContexto(`idPersonaGd`),
      IidDocumentoEmite: this.formCrearCite.controls[ 'tipoDocumento' ].value,
      IidPersonaGdSol  : this.contextService.getItemContexto(`idPersonaGd`),
      Ireferencia      : this.formCrearCite.controls[ 'referencia' ].value,
      IDestPara        : JSON.stringify(this.listaDestinatarios),
      IDestVia         : JSON.stringify(this.listaVias),
      IDestCopia       : JSON.stringify(this.listaRemitentes),
      IUsuarioBitacora : this.contextService.getItemContexto(`samActName`)
    };

    // Consumir el servicio de creacion de cites //
    this.citesService.insertCite( informacionCite ).pipe(takeUntil(this.unsubscribe$)).subscribe( resp => {
      this.resultCiteInst = resp.data as ResultCiteInst;
      console.log( '---> ', this.resultCiteInst );

      // Crea los datos para la generacion de la cabecera en formato word
      const datoReporte: CiteTemplateJsReport = {
        Cite                    : this.resultCiteInst.cite,
        DescripcionTipoDocumento: this.descripcionTipoDocumento,
        ListaRemitente          : this.listaRemitentes,
        ListaVias               : this.listaVias,
        ListaDestinatarios      : this.listaDestinatarios,
        Referencia              : this.formCrearCite.controls[ 'referencia' ].value,
        FechaCreacionLiteral    : this.fechaCreacionCiteLiteral
      };

      // Genera el reporte en formato word
      this.reporteService.getPlanillaCiteTemplate(datoReporte).pipe(takeUntil(this.unsubscribe$)).subscribe( respTemplate => {
        this.utilService.createDocumentFromBlob( respTemplate );

        // Cierra la modal y pasa el resultado de la creacion del cite al componente padre.
        this.onClose( this.resultCiteInst );
      });

    });

  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
