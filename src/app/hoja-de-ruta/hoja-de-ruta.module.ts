import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandejaHojasDeRutaComponent } from './components/bandeja-hojas-de-ruta/bandeja-hojas-de-ruta.component';
import { hojasDeRutaRoutes } from './hoja-de-ruta.routing';
import { RouterModule } from '@angular/router';
import { ComentarioComponent } from './components/comentario-hoja-de-ruta/comentario-hoja-de-ruta.component';
import { FinalizarTramiteComponent } from './components/finalizar-tramite/finalizar-tramite.component';
import { AdjuntarDocumentoComponent } from './components/adjuntar-documento/adjuntar-documento.component';

@NgModule({
  declarations: [
    BandejaHojasDeRutaComponent,
    ComentarioComponent,
    FinalizarTramiteComponent,
    AdjuntarDocumentoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(hojasDeRutaRoutes),
    SharedModule
  ],
  exports : [
    BandejaHojasDeRutaComponent,
    AdjuntarDocumentoComponent
  ]
})
export class HojaDeRutaModule { }

