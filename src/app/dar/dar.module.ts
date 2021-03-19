import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { darRoutes } from './dar.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DarService } from './dar.service';
import { BandejaDarComponent } from './components/bandeja-dar/bandeja-dar.component';
import { DetalleTramiteComponent } from './components/detalle-tramite/detalle-tramite.component';
import { BandejaUniversidadesComponent } from './components/gestion-universidades/bandeja-universidades/bandeja-universidades.component';
import { UniversidadComponent } from './components/gestion-universidades/universidad/universidad.component';



@NgModule({
  declarations: [BandejaDarComponent, DetalleTramiteComponent, BandejaUniversidadesComponent, UniversidadComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(darRoutes),
    SharedModule
  ],
  exports: [BandejaDarComponent, DetalleTramiteComponent, BandejaUniversidadesComponent, UniversidadComponent],
  providers : [
    DarService,
    DatePipe
  ]
})
export class DarModule { }
