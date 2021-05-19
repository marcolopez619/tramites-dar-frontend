import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ePerfil } from '../../../shared/enums/perfil.enum';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { UniversidadService } from '../../../shared/services/universidad.service';
import { BandejaUsuarios, BusquedaEstudianteResponse } from '../../../tramites/models/tramites.models';
import { CarreraModel, Perfil, UsuarioInsert, UsuarioUpdate } from '../../models/usuario.models';
import { UsuariosService } from '../../usuarios.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class UsuarioComponent extends BaseComponent implements OnInit {

  tituloDialog: string;
  formUsuario: FormGroup;
  selectedUser: BandejaUsuarios;
  activado = true;
  listaPerfiles: Array<Perfil>;
  listaCarreras: Array<CarreraModel>;
  estudentSelected: BusquedaEstudianteResponse;
  showSearchEstudianteComponent: boolean;
  showSearchCarreraComponent: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private universidadService: UniversidadService
  ) {
    super();
  }

  ngOnInit(): void {

    this.getListaPerfiles();

    this.selectedUser = this.data.selectedUser as BandejaUsuarios;

    this.tituloDialog = this.langService.getLang(this.eModulo.Usuario, this.selectedUser ? 'tit-editar-usuario' : 'tit-anadir-usuario' );

    if ( this.selectedUser ) {

      // => edicion
      this.activado = !!this.selectedUser.estado;

      this.formUsuario = this.formBuilder.group({
        nombre  : [ this.selectedUser.nombre , Validators.compose( [ Validators.required, Validators.minLength( 5 ), Validators.maxLength( 50 )])],
        password: [ this.selectedUser.password , Validators.compose( [ Validators.required, Validators.minLength( 5 ), Validators.maxLength( 10 )])],
        celular : [ this.selectedUser.celular , Validators.compose( [ Validators.required, Validators.minLength( 5 ), Validators.maxLength( 15 )])],
        estado  : [ +this.activado , Validators.compose( [ Validators.required ])],
        idPerfil: [ this.selectedUser.idPerfil , Validators.compose( [ Validators.required ])]
      });
    } else {
      // => Nueva insercion
      this.activado = true;

      this.formUsuario = this.formBuilder.group({
        nombre      : [ undefined , Validators.compose( [ Validators.required, Validators.minLength( 5 ), Validators.maxLength( 50 )])],
        password    : [ undefined, Validators.compose( [ Validators.required, Validators.minLength( 5 ), Validators.maxLength( 10 )])],
        celular     : [ undefined , Validators.compose( [ Validators.required, Validators.minLength( 5 ), Validators.maxLength( 15 )])],
        estado      : [ this.activado , Validators.compose( [ Validators.required ])],
        idEstudiante: [ undefined , Validators.compose( [ Validators.required ])],
        idCarrera   : [ undefined , Validators.compose( [ Validators.required ])],
        idPerfil    : [ undefined , Validators.compose( [ Validators.required ])]
      });
    }

  }

  private getListaPerfiles(): void {

    this.usuariosService.getListaPerfiles().pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.listaPerfiles = resp.data;
    });
  }

  private getListaCarreras(): void{
    const idUniversidad = this.contextService.getItemContexto('idUniversidad');

    this.universidadService.getListaCarrerasByIdUniversidad( idUniversidad ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.listaCarreras = resp.data;
    });
  }

  onChangeSlideToggleValue( event: MatSlideToggleChange ): void {
    this.activado = event.checked;
  }

  onChangePerfil(event: MatSelectChange): void {
    if ( event.value === ePerfil.ESTUDIANTE ) {
      // Mostrar el componente de busqueda de estudiante por RU
      this.showSearchEstudianteComponent = true;
      this.showSearchCarreraComponent = false;
      this.formUsuario.controls[ 'idEstudiante' ].setValue( undefined );
      this.formUsuario.controls[ 'idEstudiante' ].setValidators( Validators.required );
      this.formUsuario.controls[ 'idEstudiante' ].updateValueAndValidity();
      this.formUsuario.controls[ 'idCarrera' ].setValidators( undefined );
      this.formUsuario.controls[ 'idCarrera' ].updateValueAndValidity();
    } else if ( event.value === ePerfil.DIRECTOR_DE_CARRERA ) {
      this.getListaCarreras();
      this.showSearchCarreraComponent = true;
      this.showSearchEstudianteComponent = false;
      this.formUsuario.controls[ 'idEstudiante' ].setValidators( undefined );
      this.formUsuario.controls[ 'idEstudiante' ].updateValueAndValidity();
      this.formUsuario.controls[ 'idCarrera' ].setValue( undefined );
      this.formUsuario.controls[ 'idCarrera' ].setValidators( Validators.required );
      this.formUsuario.controls[ 'idCarrera' ].updateValueAndValidity();
    } else {
      this.showSearchCarreraComponent = false;
      this.showSearchEstudianteComponent = false;
      this.formUsuario.controls[ 'idCarrera' ].setValidators( undefined );
      this.formUsuario.controls[ 'idCarrera' ].updateValueAndValidity();
      this.formUsuario.controls[ 'idEstudiante' ].setValidators( undefined );
      this.formUsuario.controls[ 'idEstudiante' ].updateValueAndValidity();
    }
  }

  onChangeCarrera(event: MatSelectChange): void{
    this.formUsuario.controls[ 'idCarrera' ].setValue( event.value );
  }

  onSelectedUser(estudentSelected: BusquedaEstudianteResponse): void {
    this.estudentSelected = estudentSelected;
    this.formUsuario.controls[ 'idEstudiante' ].setValue( estudentSelected.idEstudiante)
    this.formUsuario.controls[ 'idCarrera' ].setValue( estudentSelected.idCarrera );
  }

  onSaveUsuario(): void {
    if ( this.selectedUser ) {
      // => edicion
      const usuarioUpdate: UsuarioUpdate = {
        idUsuario: this.selectedUser.idUsuario,
        idPerfil : this.formUsuario.controls[ 'idPerfil' ].value,
        nombre   : this.formUsuario.controls[ 'nombre' ].value,
        password : this.formUsuario.controls[ 'password' ].value,
        celular  : this.formUsuario.controls[ 'celular' ].value,
        estado   : +this.activado
      };

      this.usuariosService.updateUsuario( usuarioUpdate ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
        this.onClose( resp.data );
      });

    } else {
      // => Nueva insercion
      const usuarioInsert: UsuarioInsert = {
        idPerfil    : this.formUsuario.controls[ 'idPerfil' ].value,
        idEstudiante: (this.estudentSelected) ? this.formUsuario.controls[ 'idEstudiante' ].value : -1,
        idCarrera   : this.formUsuario.controls[ 'idCarrera' ].value ?? 1000,
        nombre      : this.formUsuario.controls[ 'nombre' ].value,
        password    : this.formUsuario.controls[ 'password' ].value,
        celular     : this.formUsuario.controls[ 'celular' ].value,
        estado      : +this.activado
      };

      this.usuariosService.insertUsuario( usuarioInsert ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
        this.onClose( resp.data );
      });
    }

  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
