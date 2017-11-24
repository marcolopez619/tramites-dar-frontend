/* Import Angular NgModule */
import { NgModule } from '@angular/core';

import { APP_INITIALIZER } from '@angular/core';

import { HttpModule }      from '@angular/http';

/* Import Angular CommonModule */
import { CommonModule } from '@angular/common';

/* Import Angular Router and Routes Module */
import { RouterModule, Routes } from '@angular/router';

/* Import Angular FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Import Angular Material Flex Layout Module */
import { FlexLayoutModule } from '@angular/flex-layout';

/*Import Angular Material Module*/
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

/* Import App Layout Component*/
import { LayoutComponent } from './layout/layout.component';

/* Import App Log In Component */
import { LoginComponent } from './login/login.component';

/* Import Menu Component */
import { MenuComponent } from './menu/menu.component';

// Configuración de las rutas
export const baseRoutes: Routes = [
 
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(baseRoutes),
    HttpModule,
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
    MenuComponent
  ],
  providers: [
  ],
  exports: [LayoutComponent]
})
export class BaseModule {}