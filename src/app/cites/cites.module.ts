import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandejaCitesComponent } from './components/bandeja-cites/bandeja-cites.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { citesRoutes } from './cites.routing';
import { CrearNuevoCiteComponent } from './components/crear-nuevo-cite/crear-nuevo-cite.component';
import { CitesService } from './cites.service';
import { AdjuntarDocumentoComponent } from './components/adjuntar-documento/adjuntar-documento.component';



@NgModule({
  declarations: [BandejaCitesComponent, CrearNuevoCiteComponent, AdjuntarDocumentoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(citesRoutes),
    SharedModule
  ],
  exports : [
    BandejaCitesComponent
  ],
  providers : [
    CitesService
  ]
})
export class CitesModule { }
