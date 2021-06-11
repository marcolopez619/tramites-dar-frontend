import { Routes } from '@angular/router';
import { BandejaTramitesAtendidosComponent } from '../shared/components/bandeja-tramites-atendidos/bandeja-tramites-atendidos.component';
import { BandejaDirectorComponent } from './components/bandeja-director/bandeja-director.component';
import { DetalleTramiteComponent } from './components/detalle-tramite/detalle-tramite.component';

export const directorRoutes: Routes = [
  {
      path: 'director',
      children: [
          {
              path: 'bandeja/index',
              component: BandejaDirectorComponent
          },
          {
              path: 'detalle/tramite',
              component: DetalleTramiteComponent
          },
          {
            path: 'tramites_atendidos/index',
            component: BandejaTramitesAtendidosComponent
          }
      ]
  }
];
