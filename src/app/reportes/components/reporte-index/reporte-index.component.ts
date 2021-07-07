import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { CarreraModel } from '../../../shared/models/carrera.model';
import { PeriodoGestion } from '../../../shared/models/periodo_gestion.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { PeriodoGestionService } from '../../../shared/services/periodo-gestion.service';
import { ReportesService } from '../../../shared/services/reportes.service';
import { UniversidadService } from '../../../shared/services/universidad.service';

@Component({
  selector: 'app-reporte-index',
  templateUrl: './reporte-index.component.html',
  styleUrls: ['./reporte-index.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class ReporteIndexComponent extends BaseComponent implements OnInit {

  tituloGrafico: string;
  formReporte: FormGroup;
  listaGestiones: Array<PeriodoGestion> = [];
  listaCarreras: Array<CarreraModel> = [];
  selectedCarrera: CarreraModel;
  selectedGestion: PeriodoGestion;

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
    public contextService: ContextoService,
    public langService: LangService,
    private formBuilder: FormBuilder,
    private reportesService: ReportesService,
    private universidadService: UniversidadService,
    private periodoGestionService: PeriodoGestionService
  ) {
    super();
  }

  ngOnInit(): void {
    // this.getCantidadPorTipoTramite( 3 );
    // this.getCantidadPorTipoTramitePorCarrera( 3, 3 );

    this.getListaCarreras();
    this.getAllPeriodos();

    this.formReporte = this.formBuilder.group({
      idPeriodoGestion: [ undefined ],
      idCarrera       : [ undefined ]
    });
  }

  private getAllPeriodos(): void {
    this.periodoGestionService.getAllPeriodos().pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.listaGestiones = resp.data ?? [];
    });
  }

  private getListaCarreras(): void {
    const idUniversidad = this.contextService.getItemContexto('idUniversidad') ?? 2;

    this.universidadService.getListaCarreras( ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.listaCarreras = resp.data ?? [];
    });
  }

  private getCantidadPorTipoTramite(pIdGestion: number): void {

    this.reportesService.getCantidadPorTipoTramite( pIdGestion ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      if ( resp.data ) {
        this.tituloGrafico = `CANTIDAD DE ESTUDIANTES POR TIPO DE TRAMITE EN LA GESTION : ${this.selectedGestion.periodo}/${this.selectedGestion.gestion}`;
        this.barChartLabels = resp.data.map( x => x.label);

        const cantidades = resp.data.map ( x => ({ data : [x.cantidad], label : x.label.concat( ` (${x.cantidad})` ) }) );
        this.barChartData = cantidades;
      } else {
        this.tituloGrafico = '';
        this.barChartLabels = [];
        this.barChartData = [];
      }
    });
  }

  private getCantidadPorTipoTramitePorCarrera(pIdGestion: number, pIdCarrera: number): void {

    this.reportesService.getCantidadPorTipoTramitePorCarrera( pIdGestion, pIdCarrera ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      if ( resp.data ) {
        this.tituloGrafico = `ESTUDIANTES POR TIPO DE TRAMITE DE LA CARRERA ${this.selectedCarrera.nombre} EN LA GESTION : ${this.selectedGestion.periodo}/${this.selectedGestion.gestion}`;
        this.barChartLabels = resp.data.map( x => x.label);

        const cantidades = resp.data.map ( x => ({ data : [x.cantidad], label : x.label.concat( ` (${x.cantidad})` ) }) );
        this.barChartData = cantidades;
      } else {
        this.tituloGrafico = '';
        this.barChartLabels = [];
        this.barChartData = [];
      }
    });
  }

  onPeriodoGestionSelectionChange(event: MatSelectChange): void {
    this.selectedGestion = this.listaGestiones.find( x => x.idPeriodoGestion === event.value );
    this.getCantidadPorTipoTramite( event.value );
  }

  onCarreraSelectionChange(event: MatSelectChange): void {
    this.selectedCarrera = this.listaCarreras.find( x => x.idCarrera === event.value );
    this.getCantidadPorTipoTramitePorCarrera(this.selectedGestion.idPeriodoGestion, event.value );
  }

}
