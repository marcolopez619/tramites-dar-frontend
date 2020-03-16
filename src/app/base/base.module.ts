import { ProgressBarComponent } from './progress-bar/progress-bar.component';
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
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ErrorViewerComponent } from '../shared/components/error-viewer/error-viewer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { baseRoutes } from './base.routing';

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
    SharedModule
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    MenuComponent,
    NotificacionComponent,
    NotfoundComponent,
    ProgressBarComponent,
    UnauthorizedComponent,
    BreadcrumbsComponent
  ],
  exports: [
    LayoutComponent,
    RouterModule
  ]
  /* ,
  entryComponents: [
    NotificacionComponent,
    ErrorViewerComponent
  ] */
})
export class BaseModule {}
