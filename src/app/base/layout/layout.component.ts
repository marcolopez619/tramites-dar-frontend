import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { breadListAnim } from '../../shared/animations/template.animation';
import { BaseComponent } from '../../shared/base.component';
import { AuthService } from '../../shared/services/auth.service';
import { ContextoService } from '../../shared/services/contexto.service';
import { LangService } from '../../shared/services/lang.service';
import { UtilService } from '../../shared/services/util.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
    selector: 'base-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.css'],
    animations: [breadListAnim]
})
export class LayoutComponent extends BaseComponent {

  /**
     * Creates an instance of LayoutComponent.
     * @param {auth-service} auth Servicio de autenticación.
     * @param {ContextoService} contextoService Servicio de contexto.
     * @param {LangService} langService Servicio lang.
     * @param {UtilService} utilService Servicio utilitario.
     * @memberof LayoutComponent
     */
  constructor(
    public authService: AuthService,
    public contextoService: ContextoService,
    public langService: LangService,
    public utilService: UtilService,
    private dialog: MatDialog
    ) {
    super();
  }

   /**
   * Cierra la session del usuario cuando :
   *  presione el boton CLOSE del navegador o de una TAB del navegador
   * @param {*} $event
   * @memberof LayoutComponent
   */
  @HostListener('window:beforeunload', ['$event'])
  // @HostListener('window:unload', ['$event'])
  closeSession($event): any {
    //** Emite una señal al backend para liberar al usuario en caso de uso de sockets, descomentar las linesa 43-44 **/
    this.authService.logoutUser();
    // window.event.returnValue = true;
  }

  onChangePassword(): void {
    const dlgChangePassword = this.dialog.open( ChangePasswordComponent,  {
      disableClose: false,
      width: '600px',
      data: {
      }
    });
    dlgChangePassword.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      /* if (result) {
        this.getListaAnulaciones();
      } */
    });
  }
}
