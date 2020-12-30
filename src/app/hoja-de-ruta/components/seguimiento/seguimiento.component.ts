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
//import { DetalleSeguimientoModel } from '../../models/detalle-seguimiento.model';

@Component({
  selector: "seguimiento",
  templateUrl: "./seguimiento.component.html",
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: "container-fluid", "[@fadeInAnim]": "true" },
})
export class SeguimientoComponent extends BaseComponent implements OnInit {
  longMaxDescripcion = 500;
  //TODO: Datos de prueba.
  listaDetalleSeguimiento: Array<DetalleSeguimientoModel> = [
    {
      remitente: "Pepe perez, Juan Garcia, Maria del Carmen",
      estadoInicio: "Creado",
      estadoFin: "Enviado",
      fechaInicio: new Date(),
      fechaFin: new Date(),
      proveido: "Favor remitir las listas solicitadas",
    },

    {
      remitente: "holaaaaaaaaaaaaaaaaaaaaaa",
      estadoInicio: "Creado 2 sasdgfasfsaf",
      estadoFin: "Enviado 2",
      fechaInicio: new Date(),
      fechaFin: new Date(),
      proveido: "Favor remitir las listas solicitadas........",
    },
    {
      remitente: "fuckkkkk youuuuuuuuuuuuuuuuuuu",
      estadoInicio: "Creado 2 sasdgfasfsaf",
      estadoFin: "Enviado 2",
      fechaInicio: new Date(),
      fechaFin: new Date(),
      proveido: "Favor remitir las listas solicitadas........",
    }
  ];

  formSeguimiento: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public langService: LangService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    /*
    const dataForm: DetalleSeguimientoModel = {
    };
    */
    this.formSeguimiento = this.formBuilder.group({
      NroHojaRuta: "SEGIP/2020-00256",
    });
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }
  cancelar(): void {
    this.dialogRef.close(undefined);
  }
}
