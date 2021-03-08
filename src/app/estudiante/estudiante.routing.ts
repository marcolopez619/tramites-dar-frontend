import { Routes } from '@angular/router';
import { AnulacionComponent } from './components/anulacion/anulacion.component';
import { BandejaAnulacionComponent } from './components/bandeja-anulacion/bandeja-anulacion.component';

export const estudianteRoutes: Routes = [
  {
      path: 'estudiante',
      children: [
          {
              path: 'index',
              component: BandejaAnulacionComponent,
          }
      ]
  }
];
