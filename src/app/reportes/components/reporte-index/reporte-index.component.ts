import { Component, OnInit } from '@angular/core';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ReportesService } from '../../../shared/services/reportes.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reporte-index',
  templateUrl: './reporte-index.component.html',
  styleUrls: ['./reporte-index.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class ReporteIndexComponent extends BaseComponent implements OnInit {

  tituloGrafico: string;

  barChartOptions: ChartOptions = {
    responsive: true
  };

  barChartLabels: Array<Label> = []; // ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: Array<ChartDataSets> = [
    // { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' },
    // { data: [32, 45, 34, 20, 46, 5], label: 'Best Putas' }
  ];

  lineChartColors: Array<Color> = [
    // { backgroundColor: 'blue' },
    // { backgroundColor: 'green' }
  ];

  constructor(
    private reportesService: ReportesService
  ) {
    super();
  }

  ngOnInit(): void {
    // this.getCantidadPorTipoTramite( 3 );
    this.getCantidadPorTipoTramitePorCarrera( 3, 3 );
  }

  private getCantidadPorTipoTramite(pIdGestion: number): void {

    this.reportesService.getCantidadPorTipoTramite( pIdGestion ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      if ( resp.data ) {
        this.tituloGrafico = 'CANTIDAD DE ESTUDIANTES POR TIPO DE TRAMITE EN LA GESTION : 1/2021';
        this.barChartLabels = resp.data.map( x => x.label);

        const cantidades = resp.data.map ( x => ({ data : [x.cantidad], label : x.label.concat( ` (${x.cantidad})` ) }) );
        this.barChartData = cantidades;
      }
    });
  }

  private getCantidadPorTipoTramitePorCarrera(pIdGestion: number, pIdCarrera: number): void {

    this.reportesService.getCantidadPorTipoTramitePorCarrera( pIdGestion, pIdCarrera ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      if ( resp.data ) {
        this.tituloGrafico = `ESTUDIANTES POR TIPO DE TRAMITE DE LA CARRERA <mi_carrera> EN LA GESTION : 1/2021`;
        this.barChartLabels = resp.data.map( x => x.label);

        const cantidades = resp.data.map ( x => ({ data : [x.cantidad], label : x.label.concat( ` (${x.cantidad})` ) }) );
        this.barChartData = cantidades;
      }
    });
  }

}
