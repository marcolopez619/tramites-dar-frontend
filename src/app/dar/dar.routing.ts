import { Routes } from '@angular/router';
import { BandejaDarComponent } from './components/bandeja-dar/bandeja-dar.component';
import { DetalleTramiteComponent } from './components/detalle-tramite/detalle-tramite.component';
import { BandejaCarrerasComponent } from './components/gestion-universidades/bandeja-carreras/bandeja-carreras.component';
import { BandejaFacultadesComponent } from './components/gestion-universidades/bandeja-facultades/bandeja-facultades.component';
import { BandejaUniversidadesComponent } from './components/gestion-universidades/bandeja-universidades/bandeja-universidades.component';

export const darRoutes: Routes = [
  {
      path: 'dar',
      children: [
          {
              path: 'encargado/index',
              component: BandejaDarComponent
          },
          {
              path: 'detalle/tramite',
              component: DetalleTramiteComponent
          },
          {
              path: 'universidades/index',
              component: BandejaUniversidadesComponent
          },
          {
              path: 'universidad/facultades',
              component: BandejaFacultadesComponent
          },
          {
              path: 'universidad/facultad/carreras',
              component: BandejaCarrerasComponent
          }
      ]
  }
];
