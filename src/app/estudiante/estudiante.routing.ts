import { Routes } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { BandejaAnulacionComponent } from './components/anulacion/bandeja-anulacion/bandeja-anulacion.component';
import { BandejaCambioCarreraComponent } from './components/cambio-carrera/bandeja-cambio-carrera/bandeja-cambio-carrera.component';
import { BandejaReadmisionComponent } from './components/readmision/bandeja-readmision/bandeja-readmision.component';
import { BandejaSuspencionComponent } from './components/suspencion/bandeja-suspencion/bandeja-suspencion.component';
import { BandejaTransferenciaComponent } from './components/transferencia/bandeja-transferencia/bandeja-transferencia.component';
import { BandejaTraspasoUniversidadComponent } from './components/traspaso-universidad/bandeja-traspaso-universidad/bandeja-traspaso-universidad.component';

export const estudianteRoutes: Routes = [
  {
      path: 'estudiante',
      children: [
          {
              path: 'anulacion/index',
              component: BandejaAnulacionComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          },
          {
              path: 'cambiocarrera/index',
              component: BandejaCambioCarreraComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          },
          {
              path : 'suspenciones/index',
              component : BandejaSuspencionComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          },
          {
              path : 'readmisiones/index',
              component : BandejaReadmisionComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          },
          {
              path : 'transferencias/index',
              component : BandejaTransferenciaComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          },
          {
              path : 'traspasos/index',
              component : BandejaTraspasoUniversidadComponent,
              canActivate : [AuthGuardService],
              data: {checkRecurso: true}
          }
      ]
  }
];
