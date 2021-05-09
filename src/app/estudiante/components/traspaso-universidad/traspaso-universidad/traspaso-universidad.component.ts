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
import { AllInformationUniversity, Carrera, MotivoTraspaso, Universidad } from '../../../../shared/models/traspaso.universidad.model';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
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
  listaMotivoTraspaso: Array<MotivoTraspaso> = [];

  universidadSelected: Universidad;
  carreraSelected: Carrera;
  motivoSelected: MotivoTraspaso;

   constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    private universidadService: UniversidadService,
    private estudianteService: EstudianteService,
    private traspasoUniversidadService: TraspasoUniversidadService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDatosEstudiante();

    this.getListaUniversidades();
    this.getListaCarreras( 1 );
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
      const idUniversidadEstudianteLogeado = 1; // FIXME: obtener este valor del contexto del usuario
      this.listaUniversidades = resp.data.filter( x => x.idUniversidad !== idUniversidadEstudianteLogeado );
    });
  }

  private getListaCarreras( pIdUniversidad: number ): void {
    this.universidadService.getAllListaCarrerasByIdUniversidad( pIdUniversidad ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.listaCarreras = resp.data;
    });
  }

  private getListaMotivos(): void {

    // TODO: integrar a la BD este servicio

    const listaMotivos: Array<MotivoTraspaso> = [{
      idMotivoTraspaso : 1,
      motivoTraspaso : 'FAMILIAR'
    }, {
      idMotivoTraspaso : 2,
      motivoTraspaso : 'LABORALES'
    }];

    this.listaMotivoTraspaso = listaMotivos;
  }

  private getDatosEstudiante(): void {
    const idEstudiante = 1; // FIXME: dato quemado

    this.estudianteService.getInformacionEstudiante( idEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.datoEstudiante = resp.data;
      this.datoEstudiante.anioIngreso = 2000;
      this.datoEstudiante.cantMateriasAprobadas = 83;
      this.datoEstudiante.cantMateriasReprobadas = 34;
      this.datoEstudiante.promedioGeneral = this.datoEstudiante.cantMateriasAprobadas / this.datoEstudiante.cantMateriasReprobadas;
    });
  }

  private getAllInformacionFromUniversity(pIdUniversidad: number): void {
    this.universidadService.getAllInformation( pIdUniversidad ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      const allInformationUniversity = resp.data as Array<AllInformationUniversity>;
    });
  }

  onUniversidadSelectionChange(event: MatSelectChange): void {
    this.universidadSelected = this.listaUniversidades.find( x => x.idUniversidad = event.value );
    this.getListaCarreras(this.universidadSelected.idUniversidad);
  }

  onCarreraSelectionChange(event: MatSelectChange): void {
    this.carreraSelected = this.listaCarreras.find( x => x.idCarrera = event.value );
  }

  onMotivoSelectionChange(event: MatSelectChange): void {
    this.motivoSelected = this.listaMotivoTraspaso.find( x => x.idMotivoTraspaso = event.value );
  }

  onFinalizarSolicitud(): void {
    const traspasoInsert: TraspasoInsert = {
      idUnivDestino     : this.formTraspaso.controls[ 'idUnivDestino' ].value,
      idCarreraDestino  : this.formTraspaso.controls[ 'idCarreraDestino' ].value,
      descripcion       : this.formTraspaso.controls[ 'descripcionTraspaso' ].value,
      anioIngreso       : this.datoEstudiante.anioIngreso,
      materiasAprobadas : this.datoEstudiante.cantMateriasAprobadas,
      materiasReprobadas: this.datoEstudiante.cantMateriasReprobadas,
      motivo            : this.formTraspaso.controls[ 'idMotivoTraspaso' ].value, // FIXME, se guarda un integer
      idEstudiante      : this.datoEstudiante.idEstudiante,
      idTramite         : eTipoTramite.TRASPASO_DE_UNIVERSIDAD,
      idEstado          : eEstado.ACTIVADO,
      idEntidad         : eEntidad.ESTUDIANTE,
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
