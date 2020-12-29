import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
//import { ComentarioModel } from '../../../shared/models/comentario.model';
//import { ComentarioService } from '../../../shared/services/comentario.service';
//import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { DetalleSeguimientoModel } from '../../models/detalle-seguimiento.model';

@Component({
  selector: 'detalle-seguimiento',
  templateUrl: './detalle-seguimiento.html',
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class DetalleSeguimientoComponent extends BaseComponent implements OnInit {

  longMaxDescripcion = 500;
  formComentarioHR: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public langService: LangService,
    private formBuilder: FormBuilder,    
  ) {
    super();
  }

  ngOnInit(): void {

    const dataForm: DetalleSeguimientoModel = {};
    this.formComentarioHR = this.formBuilder.group({    
    });

  }

  
  onClose(object?: any): void {
    this.dialogRef.close(object);
  }
}
