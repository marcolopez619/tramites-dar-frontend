import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { estudianteRoutes } from './estudiante.routing';
import { RouterModule } from '@angular/router';
import { AnulacionComponent } from './components/anulacion/anulacion.component';
import { EstudianteService } from './estudiante.service';
import { BandejaAnulacionComponent } from './components/anulacion/bandeja-anulacion/bandeja-anulacion.component';
import { CambioCarreraComponent } from './components/cambio-carrera/cambio-carrera/cambio-carrera.component';
import { BandejaCambioCarreraComponent } from './components/cambio-carrera/bandeja-cambio-carrera/bandeja-cambio-carrera.component';
import { BandejaSuspencionComponent } from './components/suspencion/bandeja-suspencion/bandeja-suspencion.component';
import { SuspencionComponent } from './components/suspencion/suspencion/suspencion.component';



@NgModule({
  declarations: [AnulacionComponent, BandejaAnulacionComponent, CambioCarreraComponent, BandejaCambioCarreraComponent, BandejaSuspencionComponent, SuspencionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(estudianteRoutes),
    SharedModule
  ],
  exports : [
    AnulacionComponent, BandejaAnulacionComponent, CambioCarreraComponent, BandejaCambioCarreraComponent, BandejaSuspencionComponent
  ],
  providers : [
    EstudianteService
  ]
})
export class EstudianteModule { }
