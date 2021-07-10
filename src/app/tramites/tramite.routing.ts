import { Routes } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { BandejaTramitesComponent } from './components/bandeja-tramites/bandeja-tramites.component';
import { BandejaHabilitacionExcepcionComponent } from './components/habilitacion-por-excepcion/bandeja-habilitacion-excepcion/bandeja-habilitacion-excepcion.component';

export const tramiteRoutes: Routes = [
  {
      path: 'tramites',
      children: [
          {
              path: 'index',
              component: BandejaTramitesComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          },
          {
              path: 'excepcion/index',
              component: BandejaHabilitacionExcepcionComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          }
      ]
  }
];
