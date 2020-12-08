import { HojaDeRutaModule } from './../hoja-de-ruta/hoja-de-ruta.module';
import { CitesModule } from './../cites/cites.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerBandejaComponent } from './components/container-bandeja/container-bandeja.component';
import { OpcionesBandejaComponent } from './components/opciones-bandeja/opciones-bandeja.component';
import { DetalleBandejaComponent } from './components/detalle-bandeja/detalle-bandeja.component';



@NgModule({
  declarations: [ContainerBandejaComponent, OpcionesBandejaComponent, DetalleBandejaComponent],
  imports: [
    CommonModule,
    SharedModule,
    CitesModule,
    HojaDeRutaModule
  ],
  exports:[
    ContainerBandejaComponent, OpcionesBandejaComponent, DetalleBandejaComponent
  ]
})
export class BandejaPrincipalModule { }
