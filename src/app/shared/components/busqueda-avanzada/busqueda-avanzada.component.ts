import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSelectChange } from "@angular/material/select";
import { MatTableDataSource } from "@angular/material/table";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { HojaDeRutaModel } from "../../../hoja-de-ruta/models/hoja-de-ruta.model";
import { slideInLeftAnim, zoomInAnim } from "../../animations/template.animation";
import { BaseComponent } from "../../base.component";
import { TipoBandejaModel, TipoDocumentoModel, TipoTramiteModel } from "../../models/parametricas.model";
import { UsuarioModel } from "../../models/Usuario.model";
import { ContextoService } from "../../services/contexto.service";
import { LangService } from "../../services/lang.service";
import { ParametricaService } from "../../services/parametrica.service";
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: 'busqueda-avanzada',
  templateUrl: './busqueda-avanzada.component.html',
  animations: [zoomInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@zoomInAnim]': '' }
})

export class BusquedaAvanzadaComponent extends BaseComponent implements OnInit{
  formBusquedaAvanzada: FormGroup;
  //displayedColumns = ['tipoRemitente', 'nombreRemitente','tipoDocumento', 'numeroCite', 'destinatarios', 'referencia', 'estado', 'acciones'];
  displayedColumns = ['numeroHojaRuta','tipoRemitente', 'nombreRemitente', 'tipoDocumento', 'numeroCite', 'nombreDestinatario','referencia', 'estado'];
  dataSource = new MatTableDataSource<any>([]);
  listaTipoDocumento: Array<TipoDocumentoModel> = [];
  listaDestinatarios: Array<UsuarioModel> = [];
  listaRemitentes: Array<UsuarioModel> = [];
  listaTipoTramite: Array<TipoTramiteModel> = [];
  listaUsuarios: Array<UsuarioModel> = [];
  listaTipoBandeja : Array<TipoBandejaModel>=[];
  minValue = new Date(); maxValue = new Date();
  rangoFecha=Date();
  fechaNacimiento= Date();

  descripcionTipoDocumento: string;

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

    //rangoFecha = new Date();
    // Carga los usuarios de la bd
    const idTipoTramite = 1;
    this.getAllusuarios(idTipoTramite);

    this.formBusquedaAvanzada = this.formBuilder.group({
      tipoTramite       : [ idTipoTramiteDefault, Validators.compose([Validators.required])],
      tipoDocumento     : [undefined, Validators.compose([Validators.required])],
      listaDestinatarios: [undefined, Validators.compose([Validators.required])],
      listaRemitentes   : [undefined, Validators.compose([Validators.required])],
      listaTipoBandeja   : [undefined, Validators.compose([Validators.required])],
      referencia        : [undefined, Validators.compose([Validators.required])],
      fechaNacimiento: Date()
    });

  }
  onTipoDocumentoChange(event: MatSelectChange ): void {
    this.formBusquedaAvanzada.controls['tipoDocumento'].setValue( event.value );
    this.formBusquedaAvanzada.controls['tipoDocumento'].markAsTouched();
    console.log( ' tipo documento : ----> ' + this.formBusquedaAvanzada.controls['tipoDocumento'].value );
    this.descripcionTipoDocumento = this.listaTipoDocumento.filter( x => x.idDocumentoTipo === event.value )[ 0 ].descripcionDoc;
  }
  getEstatusFormDestinatario($event): void {
    console.log( ' is Invalid Destinatario : ' + $event );
  }
  getListaSeleccionadaDestinatarios($event): void {
    console.log('----------------------');
    this.listaDestinatarios = $event as Array<UsuarioModel>;
    this.listaDestinatarios.forEach( element => {
      console.log( ' Destinatario ---> ' + element.nombreCompleto );
    });
    //this.formBusquedaAvanzada.controls['listaDestinatarios'].setValue( (true) ? undefined : this.listaDestinatarios );
  }
  private getAllusuarios( idTipotramite: number ): void {
    // Borra los datos de las listas
    this.listaDestinatarios.length = this.listaRemitentes.length = this.listaUsuarios.length = 0;

    this.usuarioService.getAllUsuarios( idTipotramite ).pipe( takeUntil( this.unsubscribe$ )).subscribe( respService => {
      this.listaUsuarios = respService.data;
    });
  }

  getListaSeleccionadaRemitentes($event): void {
    console.log('----------------------');
    this.listaRemitentes = $event as Array<UsuarioModel>;

    this.listaRemitentes.forEach( element => {
      console.log( 'Remitente ---> ' + element.nombreCompleto );
    });
    //this.formBusquedaAvanzada.controls['listaRemitentes'].setValue( (this._isRemitenteInvalid) ? undefined : this.listaRemitentes );
  }

  busquedaCiudadano(): void {
    const listaHojaRuta: Array<HojaDeRutaModel> = [
      {
        numeroHojaRuta: 'SEGIP/12345/2020',
        idHojaRutaModel: 1,
        tipoRemitente: 'Externo',
        nombreRemitente: 'Ministerio de Economia',
        tipoDocumento : 'MEMORANDUM',
        numeroCite : 'SEGIP/DES/2334_2021',
        nombreDestinatario : 'Victor Apaza',
        referencia : 'REFERENCIA DE PRUEBA 1',
        estado: 'PENDIENTE'
      },
      {
        idHojaRutaModel: 2,
        tipoRemitente: 'Externo',
        nombreRemitente: 'Ministerio de Salud',
        tipoDocumento : 'INFORME',
        numeroCite : 'SEGIP/DES/2777_2021',
        nombreDestinatario : 'Pepito perez Suarez',
        referencia : 'REFERENCIA DE PRUEBA 2',
        estado: 'EN PROCESO'
      }
    ];

    this.dataSource.data = listaHojaRuta;
  }

  limpiarFormulario(): void {
    this.formBusquedaAvanzada.reset();
    //this.dataSource.data = [];
    // this.clearCheckBoxMaster();
    // this.btnGuardar.disabled = true;
  }

  getTipoBandeja(idDocumentoSelect: any): void {

  }


  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
