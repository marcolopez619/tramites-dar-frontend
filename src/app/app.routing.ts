import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './base/notfound/notfound.component';
import { ReporteIndexComponent } from './reportes/components/reporte-index/reporte-index.component';

/* Configuracion de las rutas de la aplicacion base */
export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  // { path: '', component: ReporteIndexComponent, pathMatch: 'full'},
  { path: 'notfound', component: NotfoundComponent, pathMatch: 'full'},
  { path: '**', redirectTo: 'notfound' }
];
