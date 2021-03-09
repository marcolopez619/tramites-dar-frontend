import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../../../shared/base.component';
import { EstudianteModel } from '../../../../shared/models/estudiante.model';
import { MotivoSuspencion } from '../../../../shared/models/motivos.models';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { MotivoService } from '../../../../shared/services/motivo.service';

@Component({
  selector: 'app-suspencion',
  templateUrl: './suspencion.component.html',
  styleUrls: ['./suspencion.component.css']
})
export class SuspencionComponent extends BaseComponent implements OnInit {

  formSuspencion: FormGroup;
  datoEstudiante: EstudianteModel;
  listaTipoSuspenciones: Array<MotivoSuspencion> = [];
  motivoSelected: MotivoSuspencion = {};

   constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    private motivoService: MotivoService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDatosEstudiante();
    this.getListaMotivoSuspencion();

    this.formSuspencion = this.formBuilder.group({
      idMotivoSuspencion : [undefined, Validators.compose([ Validators.required ])],
      tiempoSuspencion   : [undefined, Validators.compose([ Validators.required ])],
      motivo             : ['', Validators.compose([ Validators.required ])],
    });
  }

  private getDatosEstudiante(): void{
    this.datoEstudiante = {
      ru            : 32926,
      ci            : '5550155',
      nombreCompleto: 'MOLINA LOPEZ MARCO ANTONIO',
      fotografia    : 'https://imagenes.elpais.com/resizer/Y6ooftjQIqJ38yuds-ss-PDsMxY=/768x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/ICWTJEOAHJBRXAPAO4ACVRSTQ4.jpg',
      idCarrera     : 1,
      carrera       : 'INGENIERIA DE SISTEMAS',
      idFacultad    : 1,
      facultad      : 'VICERRECTORADO',
      tipoTramite   : 'SUSPENCION DE ESTUDIOS',
      fechaSolicitud: new Date()
    };
  }

  private getListaMotivoSuspencion(): void{
    this.motivoService.getMotivoSuspencion().pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.listaTipoSuspenciones = resp.data;
    });
  }


  onMotivoSuspencionChange(event: MatSelectChange): void{
    this.motivoSelected = this.listaTipoSuspenciones.find( x => x.idMotivoSuspencion == event.value );
  }


  onFinalizarSolicitud(): void{
    this.onClose();
  }


  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
