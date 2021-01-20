import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ListaDocumentosAdjuntos } from '../../../shared/models/documento-adjunto.model';
import { LangService } from '../../../shared/services/lang.service';
import { DetalleSeguimientoModel } from '../../models/detalle-seguimiento.model';

@Component({
  selector: 'detalle-seguimiento',
  templateUrl: './detalle-seguimiento.component.html',
  styleUrls : ['./detalle-seguimiento.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class DetalleSeguimientoComponent extends BaseComponent implements OnInit {

  @Input()

  detalleSeguimiento: DetalleSeguimientoModel;
  listaParticipantes: [];
  vAux: [];
  listaDocumentosAdjuntos: string;

  longMaxDescripcion = 500;
  formSeguimientoDetalle: FormGroup;
  constructor(
       public langService: LangService,
       private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.detalleSeguimiento.participantes) {
      this.listaParticipantes = this.detalleSeguimiento.participantes;
    }
    if (this.detalleSeguimiento.adjuntos) {
      const vObjDocAdjunto: ListaDocumentosAdjuntos = {
        pathArchivo : this.detalleSeguimiento.adjuntos[0].path_archivo
      };
      const vColDocAdjunto = [ vObjDocAdjunto ];
      this.listaDocumentosAdjuntos = JSON.stringify( vColDocAdjunto );
    }
    this.formSeguimientoDetalle = this.formBuilder.group({
      remitente : this.detalleSeguimiento.remitente,
      cargo: this.detalleSeguimiento.cargo,
      estado_entrada: this.detalleSeguimiento.estado_entrada,
      estado_proceso: this.detalleSeguimiento.estado_proceso,
      fecha_entrada: this.detalleSeguimiento.fecha_entrada,
      fecha_proceso: this.detalleSeguimiento.fecha_proceso,
      asunto: this.detalleSeguimiento.asunto
    });
  }
  administrarParticipante(object?: any): void {
    //this.dialogRef.close(object);
  }

  onClose(object?: any): void {
    //this.dialogRef.close(object);
  }
}
