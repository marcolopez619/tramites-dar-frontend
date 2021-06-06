import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { eEstado } from '../../../shared/enums/estado.enum';
import { eTipoTramite } from '../../../shared/enums/tipoTramite.enum';
import { eEntidad } from '../../../shared/enums/tipo_entidad.enum';
import { EstudianteModel } from '../../../shared/models/estudiante.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { ReportesService } from '../../../shared/services/reportes.service';
import { EstudianteService } from '../../estudiante.service';
import { AnulacionInsert } from '../../models/anulacion.models';
import { AnulacionService } from './anulacion.service';

@Component({
  selector: 'app-anulacion',
  templateUrl: './anulacion.component.html',
  styleUrls: ['./anulacion.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class AnulacionComponent extends BaseComponent  implements OnInit {
  formAnulacion: FormGroup;

  datosEstudiante: EstudianteModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private estudianteService: EstudianteService,
    private anulacionService: AnulacionService,
    private reportesService: ReportesService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.getInformacionEstudiante(this.data.idEstudiante);

    this.formAnulacion = this.formBuilder.group({
      motivo: [ undefined, Validators.compose([ Validators.required ])]
    });
  }

  private getInformacionEstudiante(pIdEstudiante: number): void {
    this.estudianteService.getInformacionEstudiante(pIdEstudiante).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.datosEstudiante = resp.data;
    });
  }

  onImprimirFormulario(): void {

    const anulacionInsert: AnulacionInsert = {
      idEstudiante   : this.datosEstudiante.idEstudiante,
      motivo         : this.formAnulacion.controls[ 'motivo' ].value,
      idCarreraOrigen: this.datosEstudiante.idCarrera,
      idTramite      : eTipoTramite.ANULACION,
      idEstado       : eEstado.ENVIADO,
      idEntidad      : eEntidad.DIRECTOR_DE_CARRERA_ORIGEN,
      observaciones  : undefined
    };

    // Inserta la nueva anulacion
    this.anulacionService.insertAnulacion( anulacionInsert ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( resp => {
      this.datosEstudiante.fechaSolicitud = resp.data.fecha_solicitud;
      this.reportesService.printAnulacionEstudiante(this.datosEstudiante, anulacionInsert.motivo);
      this.onClose( resp.data );
    });

  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
