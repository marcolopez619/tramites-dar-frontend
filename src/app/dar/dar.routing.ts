import { Routes } from '@angular/router';
import { BandejaDarComponent } from './components/bandeja-dar/bandeja-dar.component';

export const darRoutes: Routes = [
  {
      path: 'dar',
      children: [
          {
              path: 'index',
              component: BandejaDarComponent,
          }
      ]
  }
];
