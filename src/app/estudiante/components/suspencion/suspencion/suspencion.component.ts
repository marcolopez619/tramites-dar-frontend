import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../../../shared/base.component';
import { eEstado } from '../../../../shared/enums/estado.enum';
import { eTipoTramite } from '../../../../shared/enums/tipoTramite.enum';
import { eEntidad } from '../../../../shared/enums/tipo_entidad.enum';
import { EstudianteModel } from '../../../../shared/models/estudiante.model';
import { MotivoSuspencion } from '../../../../shared/models/motivos.models';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { MotivoService } from '../../../../shared/services/motivo.service';
import { EstudianteService } from '../../../estudiante.service';
import { SuspencionInsert } from '../../../models/suspencion.model';
import { SuspencionService } from '../suspencion.service';

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
    private motivoService: MotivoService,
    private estudianteService: EstudianteService,
    private suspencionService: SuspencionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDatosEstudiante();
    this.getListaMotivoSuspencion();

    this.formSuspencion = this.formBuilder.group({
      idMotivoSuspencion : [undefined, Validators.compose([ Validators.required ])],
      tiempoSuspencion   : [undefined, Validators.compose([ Validators.required ])],
      descripcion        : [undefined, Validators.compose([ Validators.required ])]
    });
  }

  private getDatosEstudiante(): void {

    const idEstudiante = 1; // FIXME: dato quemado

    this.estudianteService.getInformacionEstudiante( idEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.datoEstudiante = resp.data;
    });

  }

  private getListaMotivoSuspencion(): void {
    // TODO: integrar a la BD este servicio
    this.motivoService.getMotivoSuspencion().pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.listaTipoSuspenciones = resp.data;
    });
  }

  onMotivoSuspencionChange(event: MatSelectChange): void {
    this.motivoSelected = this.listaTipoSuspenciones.find( x => x.idMotivoSuspencion === event.value );
  }

  onFinalizarSolicitud(): void {
    const suspencionInsert: SuspencionInsert = {
      idCarrera       : this.datoEstudiante.idCarrera,
      tiempoSolicitado: this.formSuspencion.controls[ 'tiempoSuspencion' ].value,
      descripcion     : this.formSuspencion.controls[ 'descripcion' ].value,
      idMotivo        : this.formSuspencion.controls[ 'idMotivoSuspencion' ].value,
      idEstudiante    : this.datoEstudiante.idEstudiante,
      idTramite       : eTipoTramite.SUSPENCION,
      idEstado        : eEstado.ACTIVADO,
      idEntidad       : eEntidad.ESTUDIANTE,
      observaciones   : undefined
    };

    this.suspencionService.insertSuspencion( suspencionInsert ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp =>{
      this.onClose(resp.data);
    });
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
