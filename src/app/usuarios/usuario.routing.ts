import { Routes } from '@angular/router';
import { BandejaTramitesComponent } from '../tramites/components/bandeja-tramites/bandeja-tramites.component';
import { BandejaUsuariosComponent } from './components/bandeja-usuarios/bandeja-usuarios.component';

export const usuarioRoutes: Routes = [
  {
      path: 'usuario',
      children: [
          {
              path: 'index',
              component: BandejaUsuariosComponent
          }
      ]
  }
];
