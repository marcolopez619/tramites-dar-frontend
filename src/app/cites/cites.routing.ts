import { BandejaCitesComponent } from './components/bandeja-cites/bandeja-cites.component';
import { Routes } from '@angular/router';

export const citesRoutes: Routes = [
  {
      path: 'cites',
      children: [
          {
              path: 'index',
              component: BandejaCitesComponent,
              // canActivate: [AuthGuardService]
          }
      ]
  }
];
