import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ListaDocumentosAdjuntos } from '../../../shared/models/documento-adjunto.model';
import { LangService } from '../../../shared/services/lang.service';
import { DetalleSeguimientoModel, Participante } from '../../models/detalle-seguimiento.model';

@Component({
  selector: 'detalle-seguimiento',
  templateUrl: './detalle-seguimiento.component.html',
  styleUrls : ['./detalle-seguimiento.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class DetalleSeguimientoComponent extends BaseComponent implements OnInit {

  listaParticipantes: Array<Participante>;
  vAux: [];
  listaDocumentosAdjuntos: string;

  longMaxDescripcion = 500;
  formSeguimientoDetalle: FormGroup;

  @Input()
  detalleSeguimiento: DetalleSeguimientoModel;

  @Input()
  contador: number;


  constructor(
       public langService: LangService,
       private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {

    this.detalleSeguimiento.fechaEntrada = new Date( this.detalleSeguimiento.fechaEntrada );

    const b = Date.parse(this.detalleSeguimiento.fechaProceso.toString());
    const isInvalidDateProceso =  Number.isNaN( b );
    this.detalleSeguimiento.fechaProceso = isInvalidDateProceso ? new Date( '1801-01-01' ) : new Date( this.detalleSeguimiento.fechaProceso);

    if (this.detalleSeguimiento.participantes) {

      this.detalleSeguimiento.participantes.forEach(element => {
        element.fechaDerivacion = new Date( element.fechaDerivacion );
        element.fechaResuelto = new Date( element.fechaResuelto );
      });

      this.listaParticipantes = this.detalleSeguimiento.participantes;
    }

    if (this.detalleSeguimiento.adjuntos) {

      const vObjDocAdjunto: ListaDocumentosAdjuntos = {
        pathArchivo : this.detalleSeguimiento.adjuntos[0].pathArchivo
      };

      const vColDocAdjunto = [ vObjDocAdjunto ];
      this.listaDocumentosAdjuntos = JSON.stringify( vColDocAdjunto );
    }

    this.formSeguimientoDetalle = this.formBuilder.group({
      remitente    : this.detalleSeguimiento.remitente,
      cargo        : this.detalleSeguimiento.cargo,
      estadoEntrada: this.detalleSeguimiento.estadoEntrada,
      estadoProceso: this.detalleSeguimiento.estadoProceso,
      fechaEntrada : this.detalleSeguimiento.fechaEntrada,
      fechaProceso : this.detalleSeguimiento.fechaProceso,
      asunto       : this.detalleSeguimiento.asunto
    });
  }
  administrarParticipante(object?: any): void {
    //this.dialogRef.close(object);
  }

  onClose(object?: any): void {
    //this.dialogRef.close(object);
  }
}
