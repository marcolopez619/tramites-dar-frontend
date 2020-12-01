import { BandejaHojasDeRutaComponent } from './components/bandeja-hojas-de-ruta/bandeja-hojas-de-ruta.component';
import { Routes } from '@angular/router';

export const hojasDeRutaRoutes: Routes = [
  {
      path: 'hr',
      children: [
          {
              path: 'index',
              component: BandejaHojasDeRutaComponent
              // canActivate: [AuthGuardService]
          }
      ]
  }
];
