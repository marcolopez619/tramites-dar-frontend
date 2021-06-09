import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { BaseComponent } from '../../../../shared/base.component';
import { eEstado } from '../../../../shared/enums/estado.enum';
import { eTipoTramite } from '../../../../shared/enums/tipoTramite.enum';
import { eEntidad } from '../../../../shared/enums/tipo_entidad.enum';
import { EstudianteModel } from '../../../../shared/models/estudiante.model';
import { Motivo } from '../../../../shared/models/motivos.models';
import { Carrera, Universidad } from '../../../../shared/models/traspaso.universidad.model';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { MotivoService } from '../../../../shared/services/motivo.service';
import { UniversidadService } from '../../../../shared/services/universidad.service';
import { EstudianteService } from '../../../estudiante.service';
import { TraspasoInsert } from '../../../models/traspaso.model';
import { TraspasoUniversidadService } from '../traspaso-universidad.service';

@Component({
  selector: 'app-traspaso-universidad',
  templateUrl: './traspaso-universidad.component.html',
  styleUrls: ['./traspaso-universidad.component.css']
})
export class TraspasoUniversidadComponent extends BaseComponent implements OnInit {

  formTraspaso: FormGroup;
  datoEstudiante: EstudianteModel;
  listaUniversidades: Array<Universidad> = [];
  listaCarreras: Array<Carrera> = [];
  listaMotivoTraspaso: Array<Motivo> = [];

  universidadSelected: Universidad;
  carreraSelected: Carrera;
  motivoSelected: Motivo;

   constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    private universidadService: UniversidadService,
    private estudianteService: EstudianteService,
    private motivoService: MotivoService,
    private traspasoUniversidadService: TraspasoUniversidadService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDatosEstudiante();

    this.getListaUniversidades();
    // this.getListaCarreras( 1 );
    this.getListaMotivos();

    this.formTraspaso = this.formBuilder.group({
      idUnivDestino      : [undefined, Validators.compose([ Validators.required ])],
      idCarreraDestino   : [undefined, Validators.compose([ Validators.required ])],
      idMotivoTraspaso   : [undefined, Validators.compose([ Validators.required ])],
      descripcionTraspaso: [undefined , Validators.compose([ Validators.required ])]
    });
  }

  private getListaUniversidades(): void {
    this.universidadService.getAllListaUniversidades().pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      // Filtra las universideades que no pertenescan a la universidad en la cual se haya loggeado el usuario.
      const idUniversidadEstudianteLogeado = this.contextService.getItemContexto('idUniversidad');
      this.listaUniversidades = resp.data.filter( x => x.idUniversidad !== idUniversidadEstudianteLogeado );
    });
  }

  private getListaCarreras( pIdUniversidad: number ): void {
    this.universidadService.getAllListaCarrerasByIdUniversidad( pIdUniversidad ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.listaCarreras = resp.data;
    });
  }

  private getListaMotivos(): void {

    this.motivoService.getListaMotivos().pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.listaMotivoTraspaso = resp.data;
    });

  }

  private getDatosEstudiante(): void {
    const idEstudiante = this.contextService.getItemContexto('idEstudiante');

    this.estudianteService.getInformacionEstudiante( idEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.datoEstudiante = resp.data;
      this.datoEstudiante.anioIngreso = 2000;
      this.datoEstudiante.cantMateriasAprobadas = 83;
      this.datoEstudiante.cantMateriasReprobadas = 34;
      this.datoEstudiante.promedioGeneral = this.datoEstudiante.cantMateriasAprobadas / this.datoEstudiante.cantMateriasReprobadas;
    });
  }

  onUniversidadSelectionChange(event: MatSelectChange): void {
    this.universidadSelected = this.listaUniversidades.find( x => x.idUniversidad === event.value );
    this.formTraspaso.controls['idCarreraDestino'].setValue( undefined );
    this.getListaCarreras(this.universidadSelected.idUniversidad);
  }

  onCarreraSelectionChange(event: MatSelectChange): void {
    this.carreraSelected = this.listaCarreras.find( x => x.idCarrera === event.value );
  }

  onMotivoSelectionChange(event: MatSelectChange): void {
    this.motivoSelected = this.listaMotivoTraspaso.find( x => x.idMotivo === event.value );
  }

  onFinalizarSolicitud(): void {
    const traspasoInsert: TraspasoInsert = {
      idUnivDestino     : this.formTraspaso.controls[ 'idUnivDestino' ].value,
      idCarreraDestino  : this.formTraspaso.controls[ 'idCarreraDestino' ].value,
      idCarreraOrigen   : this.datoEstudiante.idCarrera,
      descripcion       : this.formTraspaso.controls[ 'descripcionTraspaso' ].value,
      anioIngreso       : this.datoEstudiante.anioIngreso,
      materiasAprobadas : this.datoEstudiante.cantMateriasAprobadas,
      materiasReprobadas: this.datoEstudiante.cantMateriasReprobadas,
      idMotivo          : this.formTraspaso.controls[ 'idMotivoTraspaso' ].value,
      idEstudiante      : this.datoEstudiante.idEstudiante,
      idTramite         : eTipoTramite.TRASPASO_DE_UNIVERSIDAD,
      idEstado          : eEstado.ENVIADO,
      idEntidad         : eEntidad.ENCARGADO_DAR,
      observaciones     : undefined
    };

    this.traspasoUniversidadService.insertTraspaso(traspasoInsert ).pipe( takeUntil( this.unsubscribe$ )).subscribe( respInsert => {
      this.onClose( respInsert.data );
    });
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
