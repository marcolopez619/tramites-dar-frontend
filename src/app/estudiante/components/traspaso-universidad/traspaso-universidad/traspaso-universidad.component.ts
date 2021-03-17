import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { BaseComponent } from '../../../../shared/base.component';
import { EstudianteModel } from '../../../../shared/models/estudiante.model';
import { Carrera, MotivoTraspaso, Universidad } from '../../../../shared/models/traspaso.universidad.model';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';

@Component({
  selector: 'app-traspaso-universidad',
  templateUrl: './traspaso-universidad.component.html',
  styleUrls: ['./traspaso-universidad.component.css']
})
export class TraspasoUniversidadComponent extends BaseComponent implements OnInit {

  formTraspaso: FormGroup;
  datoEstudiante: EstudianteModel;
  listaUniversidades: Array<Universidad>=[];
  listaCarreras: Array<Carrera>=[];
  listaMotivoTraspaso : Array<MotivoTraspaso> = [];

  universidadSelected : Universidad;
  carreraSelected : Carrera;
  motivoSelected : MotivoTraspaso;

   constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder
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
      descripcionTraspaso: [undefined , Validators.compose([ Validators.required ])],
    });
  }
  private getListaUniversidades(): void {
    const listaUniversidades: Array<Universidad> = [{
      idUniversidad : 1,
      descUniversidad : 'UNIVERSIDAD TECNICA DE ORURO'
    },{
      idUniversidad : 2,
      descUniversidad : 'UNIVERSIDAD AUTONOMA MAYOR DE SAN ANDRES'
    }];
    this.listaUniversidades = listaUniversidades;
  }

  private getListaCarreras( pIdUniversidad: number ): void {
    // TODO: FILTRAR LAS CARRERAS POR EL ID DE LA UNIVERSIDAD
    const listaCarreras: Array<Carrera> = [{
      idCarrera : 1,
      descCarrera : 'INGENIERIA DE SISTEMAS'
    },{
      idCarrera : 2,
      descCarrera : 'ADMINISTRACION DE EMPRESAS'
    }];

    this.listaCarreras = listaCarreras;
  }

  private getListaMotivos(): void {
    const listaMotivos: Array<MotivoTraspaso> = [{
      idMotivoTraspaso : 1,
      motivoTraspaso : 'FAMILIAR'
    },{
      idMotivoTraspaso : 2,
      motivoTraspaso : 'LABORALES'
    }];

    this.listaMotivoTraspaso = listaMotivos;
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
      fechaSolicitud: new Date(),
      anioIngreso   : 2010,
      cantMateriasAprobadas : 55,
      cantMateriasReprobadas : 10,
      promedioGeneral : 47.49
    };
  }




  onUniversidadSelectionChange(event: MatSelectChange): void{
    this.universidadSelected = this.listaUniversidades.find( x => x.idUniversidad = event.value );
  }

  onCarreraSelectionChange(event: MatSelectChange): void{
    this.carreraSelected = this.listaCarreras.find( x => x.idCarrera = event.value );
  }

  onMotivoSelectionChange(event: MatSelectChange): void{
    this.motivoSelected = this.listaMotivoTraspaso.find( x => x.idMotivoTraspaso = event.value );
  }


  onFinalizarSolicitud(): void{
    this.onClose();
  }


  onClose(object?: any): void {
    this.dialogRef.close(object);
  }


}
