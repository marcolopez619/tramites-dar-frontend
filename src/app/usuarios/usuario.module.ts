import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from './usuarios.service';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { BandejaUsuariosComponent } from './components/bandeja-usuarios/bandeja-usuarios.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { usuarioRoutes } from './usuario.routing';

@NgModule({
  declarations: [UsuarioComponent, BandejaUsuariosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(usuarioRoutes),
    SharedModule
  ],
  exports : [ BandejaUsuariosComponent, UsuarioComponent],
  providers: [
    UsuariosService
  ]
})
export class UsuarioModule { }
