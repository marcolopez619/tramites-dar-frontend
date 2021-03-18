import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { darRoutes } from './dar.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DarService } from './dar.service';
import { BandejaDarComponent } from './components/bandeja-dar/bandeja-dar.component';
import { DetalleTramiteComponent } from './components/detalle-tramite/detalle-tramite.component';



@NgModule({
  declarations: [BandejaDarComponent, DetalleTramiteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(darRoutes),
    SharedModule
  ],
  exports: [BandejaDarComponent, DetalleTramiteComponent],
  providers : [
    DarService,
    DatePipe
  ]
})
export class DarModule { }
