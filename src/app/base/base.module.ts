import { BandejaPrincipalModule } from './../bandeja-principal/bandeja-principal.module';
import { HojaDeRutaModule } from './../hoja-de-ruta/hoja-de-ruta.module';
import { CitesModule } from './../cites/cites.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { baseRoutes } from './base.routing';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { EstudianteModule } from '../estudiante/estudiante.module';
import { TramitesModule } from '../tramites/tramites.module';
import { DarModule } from '../dar/dar.module';
import { UsuarioModule } from '../usuarios/usuario.module';
import { DirectorModule } from '../director/director.module';

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
    CitesModule,
    HojaDeRutaModule,
    BandejaPrincipalModule,
    EstudianteModule,
    TramitesModule,
    DarModule,
    UsuarioModule,
    DirectorModule
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
