import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandejaCitesComponent } from './components/bandeja-cites/bandeja-cites.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { citesRoutes } from './cites.routing';



@NgModule({
  declarations: [BandejaCitesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(citesRoutes),
    SharedModule
  ],
  exports : [
    BandejaCitesComponent
  ]
})
export class CitesModule { }
