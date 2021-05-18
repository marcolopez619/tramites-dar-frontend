import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { BandejaUsuarios } from '../../../tramites/models/tramites.models';
import { Perfil, UsuarioInsert, UsuarioUpdate } from '../../models/usuario.models';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService
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
        nombre  : [ undefined , Validators.compose( [ Validators.required, Validators.minLength( 5 ), Validators.maxLength( 50 )])],
        password: [ undefined, Validators.compose( [ Validators.required, Validators.minLength( 5 ), Validators.maxLength( 10 )])],
        celular : [ undefined , Validators.compose( [ Validators.required, Validators.minLength( 5 ), Validators.maxLength( 15 )])],
        estado  : [ this.activado , Validators.compose( [ Validators.required ])],
        idPerfil: [ undefined , Validators.compose( [ Validators.required ])]
      });
    }

  }

  private getListaPerfiles(): void {

    this.usuariosService.getListaPerfiles().pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.listaPerfiles = resp.data;
    });
  }

  onChangeSlideToggleValue( event: MatSlideToggleChange ): void {
    this.activado = event.checked;
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
        this.onClose( resp.data )
      });

    } else {
      // => Nueva insercion
      const usuarioInsert: UsuarioInsert = {
        idPerfil: this.formUsuario.controls[ 'idPerfil' ].value,
        nombre  : this.formUsuario.controls[ 'nombre' ].value,
        password: this.formUsuario.controls[ 'password' ].value,
        celular : this.formUsuario.controls[ 'celular' ].value,
        estado  : +this.activado
      };

      this.usuariosService.insertUsuario( usuarioInsert ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
        this.onClose( resp.data )
      });
    }

  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
