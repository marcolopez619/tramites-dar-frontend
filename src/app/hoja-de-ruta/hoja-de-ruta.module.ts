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
import { DerivarComponent } from './components/derivar/derivar.component';
import { AdjuntarDocumentoComponent } from './components/adjuntar-documento/adjuntar-documento.component';
import { NuevoParticipanteComponent } from './components/nuevo-participante/nuevo-participante.component';

@NgModule({
  declarations: [
    BandejaHojasDeRutaComponent,
    ComentarioComponent,
    FinalizarTramiteComponent,
    DetalleSeguimientoComponent,
    SeguimientoComponent,
    DerivarComponent,
    AdjuntarDocumentoComponent,
    NuevoParticipanteComponent
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

