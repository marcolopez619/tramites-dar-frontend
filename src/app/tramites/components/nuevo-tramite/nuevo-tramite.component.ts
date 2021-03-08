import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle/slide-toggle';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { TramiteModel } from '../../../shared/models/tramites.models';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';

@Component({
  selector: 'app-nuevo-tramite',
  templateUrl: './nuevo-tramite.component.html',
  styleUrls: ['./nuevo-tramite.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class NuevoTramiteComponent extends BaseComponent implements OnInit {
  formTramite: FormGroup;
  listaTramites: Array<TramiteModel> = [];
  activado = true;
  fechaLimiteSuperior = new Date();
  fechaLimiteInferior = new Date( this.fechaLimiteSuperior.getFullYear() - 1, 0, 1);


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaTramites();

    this.formTramite = this.formBuilder.group({
      idTramite : [ undefined, Validators.compose([ Validators.required ])],
      rangoFechaGroup: this.formBuilder.group({
        fechaInicial: [ undefined, Validators.compose([ Validators.required ]) ],
        fechaFinal  : [ undefined, Validators.compose([ Validators.required ]) ]
      }),
    });
  }

  private getListaTramites():void {

    const data: Array<TramiteModel> = [{
      idTramite : 1,
      descTramite : 'SUSPENCION'
    },{
      idTramite : 2,
      descTramite : 'ANULACION'
    }];

    this.listaTramites = data;
  }

  onChangeSlideToggleValue( event:MatSlideToggleChange ): void{
    this.activado = event.checked;
  }

  onSaveTramite(): void{
    const rangoFechas = this.formTramite.controls['rangoFechaGroup'].value;
    const fechaIncial = rangoFechas.fechaInicial;
    const fechaFinal  = rangoFechas.fechaFinal;

    console.log(`idTramite : ${this.formTramite.controls['idTramite'].value}`);
    console.log(`Fecha Inicial : ${fechaIncial}`);
    console.log(`Fecha final : ${fechaFinal}`);
    console.log(`Fecha final : ${this.activado}`);

    this.onClose()

  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
