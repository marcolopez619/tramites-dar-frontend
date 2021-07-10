import { Routes } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { BandejaTramitesComponent } from '../tramites/components/bandeja-tramites/bandeja-tramites.component';
import { BandejaUsuariosComponent } from './components/bandeja-usuarios/bandeja-usuarios.component';

export const usuarioRoutes: Routes = [
  {
      path: 'usuarios',
      children: [
          {
              path: 'index',
              component: BandejaUsuariosComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          }
      ]
  }
];
