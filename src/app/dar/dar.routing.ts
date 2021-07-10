import { Routes } from '@angular/router';
import { ReporteIndexComponent } from '../reportes/components/reporte-index/reporte-index.component';
import { BandejaTramitesAtendidosComponent } from '../shared/components/bandeja-tramites-atendidos/bandeja-tramites-atendidos.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { BandejaDarComponent } from './components/bandeja-dar/bandeja-dar.component';
import { DetalleTramiteComponent } from './components/detalle-tramite/detalle-tramite.component';
import { BandejaCarrerasComponent } from './components/gestion-universidades/bandeja-carreras/bandeja-carreras.component';
import { BandejaFacultadesComponent } from './components/gestion-universidades/bandeja-facultades/bandeja-facultades.component';
import { BandejaUniversidadesComponent } from './components/gestion-universidades/bandeja-universidades/bandeja-universidades.component';
import { BandejaHabilitacionGestionesComponent } from './components/habilitacion-gestiones/bandeja-habilitacion-gestiones/bandeja-habilitacion-gestiones.component';

export const darRoutes: Routes = [
  {
      path: 'dar',
      children: [
          {
              path: 'encargado/index',
              component: BandejaDarComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          },
          {
              path: 'detalle/tramite',
              component: DetalleTramiteComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          },
          {
              path: 'universidades/index',
              component: BandejaUniversidadesComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          },
          {
              path: 'universidad/facultades',
              component: BandejaFacultadesComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          },
          {
              path: 'universidad/facultad/carreras',
              component: BandejaCarrerasComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          },
          {
              path: 'habilitaciones/index',
              component: BandejaHabilitacionGestionesComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          },
          {
              path: 'tramites_atendidos/index',
              component: BandejaTramitesAtendidosComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          },
          {
              path: 'reportes/index',
              component: ReporteIndexComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          }
      ]
  }
];
