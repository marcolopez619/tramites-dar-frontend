import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CCModel, DestinatarioModel, RemitenteModel, TipoTramiteModel } from '../../../hoja-de-ruta/models/hoja-de-ruta.model';
import { slideInLeftAnim, zoomInAnim } from '../../animations/template.animation';
import { BaseComponent } from '../../base.component';
import { ContextoService } from '../../services/contexto.service';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'app-hoja-de-ruta',
  templateUrl: './hoja-de-ruta.component.html',
  styleUrls: ['./hoja-de-ruta.component.css'],
  animations: [zoomInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@zoomInAnim]': '' }
})
export class HojaDeRutaComponent extends BaseComponent implements OnInit {

  formHojaDeRuta: FormGroup;

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
    this.formHojaDeRuta = this.formBuilder.group({
      tipoTramite       : [undefined, Validators.compose([Validators.required])],
      listaRemitentes   : [undefined, Validators.compose([Validators.required])],
      listaDestinatarios: [undefined, Validators.compose([Validators.required])],
      listaCC           : [undefined],
      numeroCite        : [undefined, Validators.compose([Validators.required])],
      referencia        : [undefined, Validators.compose([Validators.required])],
      numeroFojas       : [undefined, Validators.compose([Validators.required])],
      plazoDias         : [undefined, Validators.compose([Validators.required])],
      isUrgente         : [false, Validators.compose([Validators.required])],
      isConCopiaFisica  : [false, Validators.compose([Validators.required])]
    });
  }

  onGuardarHojaDeRuta(): void {
    // TODO: GUARDAR LA INFORMACION EN LA BD.

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
    console.log(`isConCopiaFisica   : ${this.formHojaDeRuta.controls['isConCopiaFisica'].value}`);
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }
}
