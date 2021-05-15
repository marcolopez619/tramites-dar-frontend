import { Routes } from '@angular/router';
import { BandejaAnulacionComponent } from './components/anulacion/bandeja-anulacion/bandeja-anulacion.component';
import { BandejaCambioCarreraComponent } from './components/cambio-carrera/bandeja-cambio-carrera/bandeja-cambio-carrera.component';
import { BandejaSuspencionComponent } from './components/suspencion/bandeja-suspencion/bandeja-suspencion.component';

export const estudianteRoutes: Routes = [
  {
      path: 'estudiante',
      children: [
          {
              path: 'anulacion/index',
              component: BandejaAnulacionComponent,
          },
          {
              path: 'cambiocarrera/index',
              component: BandejaCambioCarreraComponent,
          }, // /estudiante/suspenciones/index
          {
            path : 'suspenciones/index',
            component : BandejaSuspencionComponent
          }
      ]
  }
];
