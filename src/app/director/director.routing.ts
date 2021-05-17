import { Routes } from '@angular/router';
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
          }
      ]
  }
];
