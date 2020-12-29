import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandejaHojasDeRutaComponent } from './components/bandeja-hojas-de-ruta/bandeja-hojas-de-ruta.component';
import { hojasDeRutaRoutes } from './hoja-de-ruta.routing';
import { RouterModule } from '@angular/router';
import { ComentarioComponent } from './components/comentario-hoja-de-ruta/comentario-hoja-de-ruta.component';
import { FinalizarTramiteComponent } from './components/finalizar-tramite/finalizar-tramite.component';
import { DetalleSeguimientoComponent } from './components/detalle-seguimiento/detalle-seguimiento.component';
import { SeguimientoComponent } from './components/seguimiento/seguimiento.component';

@NgModule({
  declarations: [
    BandejaHojasDeRutaComponent,
    ComentarioComponent,
    FinalizarTramiteComponent,
    DetalleSeguimientoComponent,
    SeguimientoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(hojasDeRutaRoutes),
    SharedModule
  ],
  exports : [
    BandejaHojasDeRutaComponent
  ]
})
export class HojaDeRutaModule { }

