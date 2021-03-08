import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { estudianteRoutes } from './estudiante.routing';
import { RouterModule } from '@angular/router';
import { AnulacionComponent } from './components/anulacion/anulacion.component';
import { EstudianteService } from './estudiante.service';
import { BandejaAnulacionComponent } from './components/bandeja-anulacion/bandeja-anulacion.component';



@NgModule({
  declarations: [AnulacionComponent, BandejaAnulacionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(estudianteRoutes),
    SharedModule
  ],
  exports : [
    AnulacionComponent, BandejaAnulacionComponent
  ],
  providers : [
    EstudianteService
  ]
})
export class EstudianteModule { }
