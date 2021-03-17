import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { darRoutes } from './dar.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DarService } from './dar.service';
import { BandejaDarComponent } from './components/bandeja-dar/bandeja-dar.component';



@NgModule({
  declarations: [BandejaDarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(darRoutes),
    SharedModule
  ],
  exports: [BandejaDarComponent],
  providers : [
    DarService
  ]
})
export class DarModule { }
