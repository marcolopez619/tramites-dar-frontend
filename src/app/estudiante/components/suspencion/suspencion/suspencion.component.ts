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
import { Motivo } from '../../../../shared/models/motivos.models';
import { CalculoGestion } from '../../../../shared/models/periodo_gestion.model';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { MotivoService } from '../../../../shared/services/motivo.service';
import { PeriodoGestionService } from '../../../../shared/services/periodo-gestion.service';
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
  listaTipoSuspenciones: Array<Motivo> = [];
  motivoSelected: Motivo = {};
  calculoGestionSuspencion: CalculoGestion;
  calculoGestionManual = 0;

   constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    private motivoService: MotivoService,
    private estudianteService: EstudianteService,
    private suspencionService: SuspencionService,
    private periodoGestionService: PeriodoGestionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDatosEstudiante();
    this.getListaMotivoSuspencion();
    this.getCalculoCompraMatriculaToGestionActual();

    this.formSuspencion = this.formBuilder.group({
      idMotivoSuspencion : [undefined, Validators.compose([ Validators.required ])],
      tiempoSuspencion   : [undefined, Validators.compose([ Validators.required, Validators.min( 1 ), Validators.max( 6 ) ])],
      // descripcion        : [undefined, Validators.compose([ Validators.required ])]
    });
  }

  private getDatosEstudiante(): void {

    const idEstudiante = this.contextService.getItemContexto('idEstudiante');

    this.estudianteService.getInformacionEstudiante( idEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.datoEstudiante = resp.data;
    });

  }

  private getListaMotivoSuspencion(): void {
    this.motivoService.getListaMotivos().pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.listaTipoSuspenciones = resp.data;
    });
  }

  private getCalculoCompraMatriculaToGestionActual(): void {
    const idEstudiante = this.contextService.getItemContexto('idEstudiante');

    this.periodoGestionService.getCalculoCompraMatriculaToGestionActual( idEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
       this.calculoGestionSuspencion = resp.data;

       if ( this.calculoGestionSuspencion.cantidadGestiones == 0 ) {
         // => TODO ESTA AL DIA, ENTONCES, QUE DIGITE LAS GESTIONES QUE DESEA SUSPENDER
         this.formSuspencion.controls[ 'tiempoSuspencion' ].enable();
         this.calculoGestionManual = Number( this.calculoGestionSuspencion.gestionFinal.substr( this.calculoGestionSuspencion.gestionFinal.indexOf( '/' ) + 1 ) );
       } else {
         // => ESTA REGULARIZANDO SUS SUPENCIONES DE GESTIONES ANTERIORES, SE CALCULA AUTOMATICAMENTE.
         this.formSuspencion.controls[ 'tiempoSuspencion' ].setValue( this.calculoGestionSuspencion.cantidadGestiones );
         this.formSuspencion.controls[ 'tiempoSuspencion' ].disable();
       }
    });
  }

  onMotivoSuspencionChange(event: MatSelectChange): void {
    this.motivoSelected = this.listaTipoSuspenciones.find( x => x.idMotivo === event.value );
  }

  onFinalizarSolicitud(): void {
    const suspencionInsert: SuspencionInsert = {
      idEstudiante    : this.datoEstudiante.idEstudiante,
      idCarrera       : this.datoEstudiante.idCarrera,
      tiempoSolicitado: this.formSuspencion.controls[ 'tiempoSuspencion' ].value,
      // descripcion     : this.formSuspencion.controls[ 'descripcion' ].value,
      idMotivo        : this.formSuspencion.controls[ 'idMotivoSuspencion' ].value,
      idTramite       : eTipoTramite.SUSPENCION,
      idEstado        : eEstado.ENVIADO,
      idEntidad       : eEntidad.ENCARGADO_DAR,
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
