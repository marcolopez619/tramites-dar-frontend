import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../../../shared/base.component';
import { eEstado } from '../../../../shared/enums/estado.enum';
import { eTipoTramite } from '../../../../shared/enums/tipoTramite.enum';
import { eEntidad } from '../../../../shared/enums/tipo_entidad.enum';
import { EstudianteModel } from '../../../../shared/models/estudiante.model';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { BandejaSuspencion } from '../../../../tramites/models/tramites.models';
import { EstudianteService } from '../../../estudiante.service';
import { ReadmisionInsert } from '../../../models/readmision.model';
import { SuspencionService } from '../../suspencion/suspencion.service';
import { ReadmisionService } from '../readmision.service';

@Component({
  selector: 'app-readmision',
  templateUrl: './readmision.component.html',
  styleUrls: ['./readmision.component.css']
})
export class ReadmisionComponent  extends BaseComponent implements OnInit {

  formReadmision: FormGroup;
  datoEstudiante: EstudianteModel;
  listaSuspenciones: Array<BandejaSuspencion> = [];
  datoSuspencionSeleceted: BandejaSuspencion = {};
  // rangoLiteralSeleccionado: string;

   constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    // private datePipe: DatePipe,
    private estudianteService: EstudianteService,
    private suspencionService: SuspencionService,
    private readmisionService: ReadmisionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDatosEstudiante();

    this.getListSuspenciones();

    this.formReadmision = this.formBuilder.group({
      idSuspencionSelected: [undefined, Validators.compose([ Validators.required ])],
      motivo              : [undefined, Validators.compose([ Validators.required ])]
    });
  }

  private getDatosEstudiante(): void {
    const idEstudiante = this.contextService.getItemContexto('idEstudiante');
    this.estudianteService.getInformacionEstudiante( idEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.datoEstudiante = resp.data;
    });
  }

  private getListSuspenciones(): void {
    const idEstudiante = this.contextService.getItemContexto('idEstudiante');

    this.suspencionService.getAllListaSuspenciones( idEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.listaSuspenciones = resp.data;
    });
  }

  onSuspencionSelectedChange(event: MatSelectChange): void {
    // FIXME: arreglar esto para que sea intuitiva la interfaz
    this.datoSuspencionSeleceted =  this.listaSuspenciones.find( x => x.idSuspencion === event.value );

    /* this.rangoLiteralSeleccionado = this.datePipe.transform( datosSuspencionSelected.fechaProceso, 'dd-MM-yyyy' )
                                    .concat( ' al ' )
                                    .concat( this.datePipe.transform( datosSuspencionSelected.fechaSolicitud, 'dd-MM-yyyy' ) ); */
  }

  onFinalizarSolicitud(): void {

    const readmisionInsert: ReadmisionInsert = {
      idCarrera    : this.datoEstudiante.idCarrera,
      motivo       : this.formReadmision.controls[ 'motivo' ].value,
      idSuspencion : this.formReadmision.controls[ 'idSuspencionSelected' ].value,
      idEstudiante : this.datoEstudiante.idEstudiante,
      idTramite    : eTipoTramite.READMISION,
      idEstado     : eEstado.ACTIVADO,
      idEntidad    : eEntidad.ESTUDIANTE,
      observaciones: undefined
    };

    this.readmisionService.insertReadmision( readmisionInsert ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.onClose(resp.data);
    });
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
