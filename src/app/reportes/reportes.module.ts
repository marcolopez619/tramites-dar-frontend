import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteIndexComponent } from './components/reporte-index/reporte-index.component';
import { SharedModule } from '../shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { reportesRoutes } from './reportes.routing';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [ReporteIndexComponent],
  imports: [
    CommonModule,
    SharedModule,
    ChartsModule,
    RouterModule.forChild( reportesRoutes )
  ],
  exports: [ ReporteIndexComponent ]
})
export class ReportesModule { }
