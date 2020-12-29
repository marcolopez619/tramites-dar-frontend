import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ComentarioModel } from '../../../shared/models/comentario.model';
import { ComentarioService } from '../../../shared/services/comentario.service';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';

@Component({
  selector: 'comentario-hoja-de-ruta',
  templateUrl: './comentario-hoja-de-ruta.component.html',
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class ComentarioComponent extends BaseComponent implements OnInit {

  longMaxDescripcion = 500;
  formComentarioHR: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public contextService: ContextoService,
    public langService: LangService,
    private formBuilder: FormBuilder,
    private comentarioService: ComentarioService
  ) {
    super();
  }

  ngOnInit(): void {

    const dataForm: ComentarioModel = {};
    this.formComentarioHR = this.formBuilder.group({
      //comentario: [dataForm.comentario, [Validators.required, Validators.maxLength(this.longMaxDescripcion)]]
    });

  }
  save(): void {

    const datosFormulario: ComentarioModel = {
      idDerivacion: 1,
      comentario: this.formComentarioHR.value.comentario
    };
    //datosFormulario.idDerivacion = 1;
    this.comentarioService.insertComentario(datosFormulario).pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      
    });
  }

  cancelar(): void {
    this.dialogRef.close(undefined);
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }
}
