import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandejaHojasDeRutaComponent } from './components/bandeja-hojas-de-ruta/bandeja-hojas-de-ruta.component';
import { hojasDeRutaRoutes } from './hoja-de-ruta.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BandejaHojasDeRutaComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(hojasDeRutaRoutes),
    SharedModule
  ],
  exports : [BandejaHojasDeRutaComponent]
})
export class HojaDeRutaModule { }
