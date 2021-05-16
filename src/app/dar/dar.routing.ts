import { Routes } from '@angular/router';
import { BandejaDarComponent } from './components/bandeja-dar/bandeja-dar.component';
import { DetalleTramiteComponent } from './components/detalle-tramite/detalle-tramite.component';

export const darRoutes: Routes = [
  {
      path: 'dar',
      children: [
          {
              path: 'encargado/index',
              component: BandejaDarComponent
          },
          {
              path: 'detalle/tramite',
              component: DetalleTramiteComponent
          },
          {
              path: 'universidades/index',
              component: BandejaDarComponent
          }
      ]
  }
];
