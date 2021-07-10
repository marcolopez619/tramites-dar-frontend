import { Routes } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { ReporteIndexComponent } from './components/reporte-index/reporte-index.component';

export const reportesRoutes: Routes = [
  {
      path: 'reportes',
      children: [
          {
              path: 'index',
              component: ReporteIndexComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          }
      ]
  }
];
