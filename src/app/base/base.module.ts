import { ProgressBarComponent } from './progressbar/progressbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuardService } from '../shared/services/auth-guard.service';

// Configuración de las rutas
export const baseRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuardService]},
];

/**
 * Modulo base del sistema.
 * 
 * @export
 * @class BaseModule
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(baseRoutes),
    SharedModule,
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    MenuComponent,
    NotificacionComponent,
    NotfoundComponent,
    ProgressBarComponent
  ],
  exports: [
    LayoutComponent,
    RouterModule,
  ],
  entryComponents: [
    NotificacionComponent
  ],
})
export class BaseModule {}
