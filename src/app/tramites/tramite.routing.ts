import { Routes } from '@angular/router';
import { BandejaTramitesComponent } from './components/bandeja-tramites/bandeja-tramites.component';

export const tramiteRoutes: Routes = [
  {
      path: 'tramite',
      children: [
          {
              path: 'index',
              component: BandejaTramitesComponent,
          }
      ]
  }
];
