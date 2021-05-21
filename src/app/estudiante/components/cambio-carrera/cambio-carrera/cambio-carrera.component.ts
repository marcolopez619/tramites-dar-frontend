import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { takeUntil } from 'rxjs/operators';
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
import { CambioCarreraService } from '../../cambio-carrera.service';

@Component({
  selector: 'app-cambio-carrera',
  templateUrl: './cambio-carrera.component.html',
  styleUrls: ['./cambio-carrera.component.css']
})
export class CambioCarreraComponent extends BaseComponent implements OnInit {

  formCambioCarrera: FormGroup;
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
    private cambioCarreraService: CambioCarreraService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getInformacionEstudiante( );
    this.getListaCarreras();

    this.formCambioCarrera = this.formBuilder.group({
      idCarreraDestino : [undefined, Validators.compose([ Validators.required ])],
      motivo           : [undefined, Validators.compose([ Validators.required ])]
    });

    this.listaCarrerasFiltradas = this.formCambioCarrera.controls['idCarreraDestino'].valueChanges.pipe(
      startWith( '' ),
      map( ( value: string | null ) => this.filtrarValores(value))
    );

  }

  private getInformacionEstudiante(): void {
    const pIdEstudiante = this.contextService.getItemContexto('idEstudiante');

    this.estudianteService.getInformacionEstudiante(pIdEstudiante).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.datosEstudiante = resp.data;
    });
  }

  private getListaCarreras(): void {
    const idCarreraEstudiante = this.contextService.getItemContexto('idCarrera');

    this.universidadService.getListaCarreras( ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.listaCarreras = resp.data?.filter( x => x.idCarrera !== idCarreraEstudiante ) ?? [];
    });
  }

  private filtrarValores(value: string): Array<CarreraModel> {
    const filterValue = value.toLowerCase();
    const dataFiltrada = this.listaCarreras.filter(carrera => carrera.nombre.toLowerCase().includes( filterValue ));
    return dataFiltrada;
  }

  onFinalizarSolicitud(): void {
    const carreraDestino = this.listaCarreras.filter( x => x.nombre === this.formCambioCarrera.controls[ 'idCarreraDestino' ].value ) [ 0 ];

    const cambioCarreraInsert: CambioCarreraInsert = {
      idEstudiante    : this.datosEstudiante.idEstudiante,
      idCarreraOrigen : this.datosEstudiante.idCarrera,
      idCarreraDestino: carreraDestino.idCarrera,
      motivo          : this.formCambioCarrera.controls['motivo'].value,
      idTramite       : eTipoTramite.CAMBIO_DE_CARRERA,
      idEstado        : eEstado.ENVIADO,
      idEntidad       : eEntidad.DIRECTOR_DE_CARRERA_ORIGEN,
      observaciones   : undefined
    };

    this.cambioCarreraService.insertCambioCarrera( cambioCarreraInsert ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.onClose( resp.data );
    });

  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
