import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from '../../shared/base.component';
import { AuthService } from '../../shared/services/auth.service';
import { ContextoService } from '../../shared/services/contexto.service';
import { LangService } from '../../shared/services/lang.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent extends BaseComponent  implements OnInit {

  formChangePassword: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public contextoService: ContextoService,
    public langService: LangService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.formChangePassword = this.formBuilder.group({
      nuevaContrasena : [undefined, Validators.compose([ Validators.required ])]
    });
  }

  onGuardarNuevaContrasena(): void{

    const idUsuario = this.contextoService.getItemContexto('idUsuario');
    const nuevoPassword = this.formChangePassword.controls[ 'nuevaContrasena' ].value;

    this.authService.changePassword(idUsuario, nuevoPassword);

    this.onClose();
  }


  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
