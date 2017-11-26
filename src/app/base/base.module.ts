import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatExpansionModule,
  MatSlideToggleModule
} from '@angular/material';

import { LayoutComponent } from './layout/layout.component';

import { LoginComponent } from './login/login.component';

import { MenuComponent } from './menu/menu.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { ClassTipoMensajePipe } from './pipes/class-tipo-mensaje.pipe';
import { IconTipoMensajePipe } from './pipes/icon-tipo-mensaje.pipe';

// Configuración de las rutas
export const baseRoutes: Routes = [
 
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(baseRoutes),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatSlideToggleModule
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    MenuComponent,
    NotificacionComponent,
    ClassTipoMensajePipe,
    IconTipoMensajePipe
  ],
  providers: [
  ],
  exports: [
    LayoutComponent
  ],
  entryComponents: [
    NotificacionComponent
  ],
})
export class BaseModule {}