import { Routes } from '@angular/router';
import { ReporteIndexComponent } from './components/reporte-index/reporte-index.component';

export const reportesRoutes: Routes = [
  {
      path: 'reportes',
      children: [
          {
              path: 'index',
              component: ReporteIndexComponent
          }
      ]
  }
];
