import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { HojaRutaFinalizarPatch } from '../../models/hoja-de-ruta.model';
import { HojaDeRutaService } from '../../hoja-de-ruta.service';
import { pipe } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
    selector: 'finalizar',
    templateUrl: './finalizar.component.html',
    animations: [fadeInAnim, slideInLeftAnim],
    host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class FinalizarComponent extends BaseComponent implements OnInit {
    longMaxDescripcion = 500;
    formFinalizar: FormGroup;

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
      this.formFinalizar = this.formBuilder.group({
        idHojaRuta : this.data.idHojaRuta,
        motivo     : [undefined, [Validators.required, Validators.maxLength(this.longMaxDescripcion)]]
      });
    }

    onFinalizar(): void {
      const pHRData : HojaRutaFinalizarPatch = {
        idHojaRuta     : this.formFinalizar.controls[ 'idHojaRuta' ].value,
        motivo         : this.formFinalizar.controls[ 'motivo' ].value,
        usuarioBitacora: this.contextService.getItemContexto('samActName')
      };
      this.hojaRutaService.FinalizarHojaRuta( pHRData ).pipe( takeUntil( this.unsubscribe$ )).subscribe( respFinalizarHR => {
        console.log(`-----> ${respFinalizarHR.data}`);
        this.onClose( respFinalizarHR );
      });
    }

    onClose( object?: any ): void {
        this.dialogRef.close( object );
    }
}
