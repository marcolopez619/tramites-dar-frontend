import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../../../shared/base.component';
import { eEstado } from '../../../../shared/enums/estado.enum';
import { eTipoTramite } from '../../../../shared/enums/tipoTramite.enum';
import { eEntidad } from '../../../../shared/enums/tipo_entidad.enum';
import { CarreraModel } from '../../../../shared/models/carrera.model';
import { EstudianteModel } from '../../../../shared/models/estudiante.model';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { UniversidadService } from '../../../../shared/services/universidad.service';
import { EstudianteService } from '../../../estudiante.service';
import { CambioCarreraInsert } from '../../../models/cambio_carrera.model';
import { TransferenciaInsert } from '../../../models/transferencia.model';
import { CambioCarreraService } from '../../cambio-carrera.service';
import { TransferenciaService } from '../transferencia.service';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent extends BaseComponent implements OnInit {

  formTransferencia: FormGroup;
  listaCarreras: Array<CarreraModel> = [];
  listaCarrerasFiltradas: Observable<Array<CarreraModel>>;
  datosEstudiante: EstudianteModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    private estudianteService: EstudianteService,
    private universidadService: UniversidadService,
    private transferenciaService: TransferenciaService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getInformacionEstudiante( 1 );
    this.getListaCarreras();

    this.formTransferencia = this.formBuilder.group({
      idCarreraDestino : [undefined, Validators.compose([ Validators.required ])],
      motivo           : [undefined, Validators.compose([ Validators.required ])]
    });

    this.listaCarrerasFiltradas = this.formTransferencia.controls['idCarreraDestino'].valueChanges.pipe(
      startWith( '' ),
      map( ( value: string | null ) => this.filtrarValores(value))
    );

  }

  private getInformacionEstudiante(pIdEstudiante: number): void {
    this.estudianteService.getInformacionEstudiante(pIdEstudiante).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.datosEstudiante = resp.data;
    });
  }

  private getListaCarreras(): void {
    const idUniversidad = 1; // Por default sera la Tomas frias para este caso

    this.universidadService.getAllListaCarrerasByIdUniversidad( idUniversidad ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      // TODO: La transferencia se realiza solo entre iguales carreras de la ambas sedes o subsedes
      this.listaCarreras = resp.data;
    });
  }

  private filtrarValores(value: string): Array<CarreraModel> {
    const filterValue = value.toLowerCase();
    const dataFiltrada = this.listaCarreras.filter(carrera => carrera.carrera.toLowerCase().includes( filterValue ));
    return dataFiltrada;
  }

  onFinalizarSolicitud(): void {
    const carreraDestino = this.listaCarreras.filter( x => x.carrera === this.formTransferencia.controls[ 'idCarreraDestino' ].value ) [ 0 ];

    const cambioCarreraInsert: TransferenciaInsert = {
      idCarreraOrigen : this.datosEstudiante.idCarrera,
      idCarreraDestino: carreraDestino.idCarrera,
      motivo          : this.formTransferencia.controls['motivo'].value,
      idEstudiante    : this.datosEstudiante.idEstudiante,
      idTramite       : eTipoTramite.CAMBIO_DE_CARRERA,
      idEstado        : eEstado.ACTIVADO,
      idEntidad       : eEntidad.ESTUDIANTE,
      observaciones   : undefined
    };

    this.transferenciaService.insertTransferencia( cambioCarreraInsert ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.onClose( resp.data );
    });

  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
