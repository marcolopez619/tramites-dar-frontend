import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DirectorService } from './director.service';
import { directorRoutes } from './director.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BandejaDirectorComponent } from './components/bandeja-director/bandeja-director.component';
import { DetalleTramiteComponent } from './components/detalle-tramite/detalle-tramite.component';

@NgModule({
  declarations: [BandejaDirectorComponent, DetalleTramiteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(directorRoutes),
    SharedModule
  ],
  exports: [ BandejaDirectorComponent, DetalleTramiteComponent ],
  providers: [
    DirectorService,
    DatePipe
  ]
})
export class DirectorModule { }
