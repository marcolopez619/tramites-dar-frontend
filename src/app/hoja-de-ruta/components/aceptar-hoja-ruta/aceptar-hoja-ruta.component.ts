import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ComentarioModel } from '../../../shared/models/comentario.model';
import { ComentarioService } from '../../../shared/services/comentario.service';
import { ContextoService } from '../../../shared/services/contexto.service';

import { LangService } from '../../../shared/services/lang.service';
import { HojaDeRutaService } from '../../hoja-de-ruta.service';
import { HojaDeRutaAceptarModel } from '../../models/hoja-de-ruta-aceptar.model';
import { HojaRutaAceptar } from '../../models/hoja-de-ruta.model';

@Component({
  selector: 'aceptar-hoja-ruta',
  templateUrl: './aceptar-hoja-ruta.component.html',
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class AceptarHrComponent extends BaseComponent implements OnInit {

  longMaxDescripcion = 500;
  formAceptarHR: FormGroup;
  numeroCite:string;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public contextService: ContextoService,
    public langService: LangService,
    private formBuilder: FormBuilder,
    private hojaRutaService: HojaDeRutaService,
  ) {
    super();
  }

  ngOnInit(): void {
    var   vObjHojaRuta = this.data.hojaRutaSelected;
    this.numeroCite=vObjHojaRuta.cite;
    const dataForm: HojaDeRutaAceptarModel = {};
    this.formAceptarHR = this.formBuilder.group({
      esFisico: [true, [Validators.required, Validators.maxLength(this.longMaxDescripcion)]]
    });

  }
  save(): void {
    const objDatosFormulario: any = this.formAceptarHR.value;
    var   vObjHojaRuta = this.data.hojaRutaSelected;
    const dataForm: HojaDeRutaAceptarModel = {
      IdHojaRuta     : vObjHojaRuta.idHojaRuta,
      EsFisico       : objDatosFormulario.esFisico == false ? 0: 1,
      UsuarioBitacora: this.contextService.getItemContexto('samActName')
    };
      this.hojaRutaService
      .hojaRutaAceptar(dataForm)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
          this.dialogRef.close(result);
        });
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }
}
