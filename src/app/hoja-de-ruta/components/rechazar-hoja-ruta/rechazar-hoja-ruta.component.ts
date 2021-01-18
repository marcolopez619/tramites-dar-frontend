import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { HojaDeRutaService } from '../../hoja-de-ruta.service';
import { HojaRutaRechazarModel } from '../../models/hoja-ruta-rechazar.model';

@Component({
  selector: 'rechazar-hoja-ruta',
  templateUrl: './rechazar-hoja-ruta.component.html',
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class RechazarHrComponent extends BaseComponent implements OnInit {

  longMaxDescripcion = 100;
  formRechazarHR: FormGroup;
  //numeroHojaRuta:string;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public contextService: ContextoService,
    public langService: LangService,
    private formBuilder: FormBuilder,
    private hojaRutaService: HojaDeRutaService
  ) {
    super();
  }

  ngOnInit(): void {
    //var   vObjHojaRuta = this.data.hojaRutaSelected;
    //this.numeroHojaRuta=vObjHojaRuta.numeroHojaRuta;
    //const dataForm: HojaRutaRechazarModel = {};
    this.formRechazarHR = this.formBuilder.group({
      descripcion: [undefined, [Validators.required, Validators.maxLength(this.longMaxDescripcion)]]
    });

  }
  save(): void {
    const objDatosFormulario: any = this.formRechazarHR.value;
    const   vObjHojaRuta = this.data.hojaRutaSelected;
    const dataForm: HojaRutaRechazarModel = {
      idHojaRuta     : vObjHojaRuta.idHojaRuta,
      descripcion       : objDatosFormulario.descripcion,
      usuarioBitacora: this.contextService.getItemContexto('samActName')
    };
    this.hojaRutaService
      .hojaRutaRechazar(dataForm)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
          this.dialogRef.close(result);
        });
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }
}
