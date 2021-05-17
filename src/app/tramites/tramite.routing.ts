import { Routes } from '@angular/router';
import { BandejaTramitesComponent } from './components/bandeja-tramites/bandeja-tramites.component';
import { BandejaHabilitacionExcepcionComponent } from './components/habilitacion-por-excepcion/bandeja-habilitacion-excepcion/bandeja-habilitacion-excepcion.component';

export const tramiteRoutes: Routes = [
  {
      path: 'tramites',
      children: [
          {
              path: 'index',
              component: BandejaTramitesComponent,
          },
          {
              path: 'excepcion/index',
              component: BandejaHabilitacionExcepcionComponent,
          }
      ]
  }
];
