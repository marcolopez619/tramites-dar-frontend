import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteIndexComponent } from './components/reporte-index/reporte-index.component';
import { SharedModule } from '../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { reportesRoutes } from './reportes.routing';



@NgModule({
  declarations: [ReporteIndexComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild( reportesRoutes )
  ]
})
export class ReportesModule { }
