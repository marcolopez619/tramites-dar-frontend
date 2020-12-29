import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { FinalizarTramiteModel } from '../../models/finalizar-tramite.model';

@Component({
    selector: 'finalizar-tramite',
    templateUrl: './finalizar-tramite.component.html',
    animations: [fadeInAnim, slideInLeftAnim],
    host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class FinalizarTramiteComponent extends BaseComponent implements OnInit {
    longMaxDescripcion = 500;
    formFinalizarTramite: FormGroup;

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
        const dataForm: FinalizarTramiteModel = {};


        this.formFinalizarTramite = this.formBuilder.group({
            descripcion: [dataForm.descripcion, [Validators.required, Validators.maxLength(this.longMaxDescripcion)]]
        });

    }

    save(): void {
        const datosFormulario: FinalizarTramiteModel = {};
        // console.log('Formulario> '.concat(JSON.stringify(datosFormulario)));

    }

    cancelar(): void {
        this.dialogRef.close(undefined);
    }
}