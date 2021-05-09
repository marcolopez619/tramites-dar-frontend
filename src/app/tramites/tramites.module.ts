import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandejaTramitesComponent } from './components/bandeja-tramites/bandeja-tramites.component';
import { NuevoTramiteComponent } from './components/nuevo-tramite/nuevo-tramite.component';
import { SharedModule } from '../shared/shared.module';
import { tramiteRoutes } from './tramite.routing';
import { TramitesService } from './tramites.service';
import { RouterModule } from '@angular/router';
import { BandejaHabilitacionExcepcionComponent } from './components/habilitacion-por-excepcion/bandeja-habilitacion-excepcion/bandeja-habilitacion-excepcion.component';



@NgModule({
  declarations: [BandejaTramitesComponent, NuevoTramiteComponent, BandejaHabilitacionExcepcionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(tramiteRoutes),
    SharedModule
  ],
  exports : [
    BandejaTramitesComponent, BandejaHabilitacionExcepcionComponent
  ],
  providers: [
    TramitesService
  ]
})
export class TramitesModule { }
