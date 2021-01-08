import { Component, Inject, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  templateUrl: './detalle-seguimiento.component.html',
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class DetalleSeguimientoComponent extends BaseComponent implements OnInit {

  @Input()
  detalleSeguimiento: DetalleSeguimientoModel;

  longMaxDescripcion = 500;
  formSeguimientoDetalle: FormGroup;
  constructor(
       public langService: LangService,
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {

    this.formSeguimientoDetalle = this.formBuilder.group({

      remitente : this.detalleSeguimiento.remitente,
      estadoInicio: this.detalleSeguimiento.estadoInicio,
      estadoFin: this.detalleSeguimiento.estadoFin,
      fechaInicio: this.detalleSeguimiento.fechaInicio,
      fechaFin: this.detalleSeguimiento.fechaFin,
      proveido: this.detalleSeguimiento.asunto
    });

  }
  administrarParticipante(object?: any): void {
    //this.dialogRef.close(object);
  }


  onClose(object?: any): void {
    //this.dialogRef.close(object);
  }
}
