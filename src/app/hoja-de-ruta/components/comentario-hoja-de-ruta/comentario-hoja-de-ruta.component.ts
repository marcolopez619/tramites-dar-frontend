import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComentarioHojaDeRutaModel } from '../../models/comentario-hoja-de-ruta.model';


import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';

@Component({
  selector: 'comentario-hoja-de-ruta',
  templateUrl: './comentario-hoja-de-ruta.component.html',  
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class ComentarioHojaDeRutaComponent extends BaseComponent implements OnInit {

  longMaxDescripcion = 500;
  formComentarioHR :FormGroup;

/*
  listaTipoTramite: Array<TipoTramiteModel> = [
    { idTipoTramite: 1, descripcionTipoTramite: 'INTERNO' },
    { idTipoTramite: 2, descripcionTipoTramite: 'EXTERNO' }
  ];

  listaCC: Array<CCModel> = [
    { idCC: 1, descripcionCC: 'MALUMA CONDORI MALPARTIDA' }
  ];
  listaRemitentes: Array<RemitenteModel> = [
    { idRemitente: 1, descripcionRemitente: 'ZORRINNO CATARI ALBERTO' },
    { idRemitente: 2, descripcionRemitente: 'ZUNAGUA SARDINA LEILA' }
  ];
  listaDestinatarios: Array<DestinatarioModel> = [
    { idDestinatario: 1, descripcionDestinatario: 'CACHICATARI JUAN GONZALO' },
    { idDestinatario: 2, descripcionDestinatario: 'SALMON HUALLPA OZUNA' }
  ];
  */   

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public contextService: ContextoService,
    public langService: LangService,
    private formBuilder: FormBuilder    
  ) {
    super();
  }

  ngOnInit(): void {
    const dataForm: ComentarioHojaDeRutaModel = {};   
      

    this.formComentarioHR = this.formBuilder.group({
        mensaje: [dataForm.mensaje, [Validators.required, Validators.maxLength(this.longMaxDescripcion)]]       
      });
    
  }

  onGuardarHojaDeRuta(): void {
    // TODO: GUARDAR LA INFORMACION EN LA BD.
    /*
    console.log('============================================');
    console.log(` tipoTramite       : ${this.formHojaDeRuta.controls['tipoTramite'].value}`);
    console.log(` listaRemitente    : ${this.formHojaDeRuta.controls['listaRemitentes'].value}`);
    console.log(` listaDestinatario : ${this.formHojaDeRuta.controls['listaDestinatarios'].value}`);
    console.log(` listaCC           : ${this.formHojaDeRuta.controls['listaCC'].value}`);
    console.log(`numeroCite         : ${this.formHojaDeRuta.controls['numeroCite'].value}`);
    console.log(`referencia         : ${this.formHojaDeRuta.controls['referencia'].value}`);
    console.log(`numeroFojas        : ${this.formHojaDeRuta.controls['numeroFojas'].value}`);
    console.log(`plazoDias          : ${this.formHojaDeRuta.controls['plazoDias'].value}`);
    console.log(`isUrgente          : ${this.formHojaDeRuta.controls['isUrgente'].value}`);
    console.log(`isConCopiaFisica   : ${this.formHojaDeRuta.controls['isConCopiaFisica'].value}`);*/
    //this.registraComponenteHojaDeRuta.emit();
  }
  /*
  realizaComunicacionHojaRuta(event) {
    this.datoComunicarPadre = event.elemento;
  }*/

  save(): void {
    const datosFormulario: ComentarioHojaDeRutaModel = {};
    // console.log('Formulario> '.concat(JSON.stringify(datosFormulario)));
    
  }

    cancelar(): void {
        this.dialogRef.close(undefined);
    }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }
}
