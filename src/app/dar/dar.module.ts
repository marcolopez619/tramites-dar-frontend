import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { darRoutes } from './dar.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DarService } from './dar.service';
import { BandejaDarComponent } from './components/bandeja-dar/bandeja-dar.component';
import { DetalleTramiteComponent } from './components/detalle-tramite/detalle-tramite.component';
import { BandejaUniversidadesComponent } from './components/gestion-universidades/bandeja-universidades/bandeja-universidades.component';
import { UniversidadComponent } from './components/gestion-universidades/universidad/universidad.component';
import { BandejaFacultadesComponent } from './components/gestion-universidades/bandeja-facultades/bandeja-facultades.component';
import { FacultadComponent } from './components/gestion-universidades/facultad/facultad.component';
import { BandejaCarrerasComponent } from './components/gestion-universidades/bandeja-carreras/bandeja-carreras.component';
import { BandejaHabilitacionGestionesComponent } from './components/habilitacion-gestiones/bandeja-habilitacion-gestiones/bandeja-habilitacion-gestiones.component';
import { HabilitacionGestionComponent } from './components/habilitacion-gestiones/habilitacion-gestion/habilitacion-gestion.component';



@NgModule({
  declarations: [BandejaDarComponent, DetalleTramiteComponent, BandejaUniversidadesComponent, UniversidadComponent, BandejaFacultadesComponent, FacultadComponent, BandejaCarrerasComponent, BandejaHabilitacionGestionesComponent, HabilitacionGestionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(darRoutes),
    SharedModule
  ],
  exports: [BandejaDarComponent, DetalleTramiteComponent, BandejaUniversidadesComponent, UniversidadComponent, BandejaFacultadesComponent, BandejaCarrerasComponent, BandejaHabilitacionGestionesComponent],
  providers : [
    DarService,
    DatePipe,
    TitleCasePipe
  ]
})
export class DarModule { }
