import { Routes } from '@angular/router';
import { BandejaTramitesAtendidosComponent } from '../shared/components/bandeja-tramites-atendidos/bandeja-tramites-atendidos.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { BandejaDirectorComponent } from './components/bandeja-director/bandeja-director.component';
import { DetalleTramiteComponent } from './components/detalle-tramite/detalle-tramite.component';

export const directorRoutes: Routes = [
  {
      path: 'director',
      children: [
          {
              path: 'bandeja/index',
              component: BandejaDirectorComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          },
          {
              path: 'detalle/tramite',
              component: DetalleTramiteComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          },
          {
              path: 'tramites_atendidos/index',
              component: BandejaTramitesAtendidosComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          }
      ]
  }
];
