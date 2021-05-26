import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { EstudianteService } from '../../../../estudiante/estudiante.service';
import { fadeInAnim, slideInLeftAnim } from '../../../../shared/animations/template.animation';
import { BaseComponent } from '../../../../shared/base.component';
import { eEstado } from '../../../../shared/enums/estado.enum';
import { PeriodoGestion } from '../../../../shared/models/periodo_gestion.model';
import { TramiteModel } from '../../../../shared/models/tramites.models';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { PeriodoGestionService } from '../../../../shared/services/periodo-gestion.service';
import { TramitesAcademicosService } from '../../../../shared/services/tramites-academicos.service';
import { BandejaHabilitacionPorExcepcion, BusquedaEstudianteResponse, HabilitacionPorExcepcionInsert } from '../../../models/tramites.models';
import { TramitesService } from '../../../tramites.service';

@Component({
  selector: 'app-habilitacion-por-excepcion',
  templateUrl: './habilitacion-por-excepcion.component.html',
  styleUrls: ['./habilitacion-por-excepcion.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class HabilitacionPorExcepcionComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  formHabilitacionExcepcion: FormGroup;
  formBusqueda: FormGroup;
  selectedHabilitacion: BandejaHabilitacionPorExcepcion;
  busquedaRU: string;
  listaTramites: Array<TramiteModel> = [];
  listaPeriodosGestiones: Array<PeriodoGestion> = [];

  listaLabelColumnas: Array<string>;
  listaValoresColumnas: Array<any>;

  fechaLimiteSuperior = new Date();
  fechaLimiteInferior = new Date( this.fechaLimiteSuperior.getFullYear(), this.fechaLimiteSuperior.getMonth() - 4  );

  displayedColumns = ['ci', 'nombreCompleto', 'fechaNacimiento', 'carrera' ];
  dataSource = new MatTableDataSource<BusquedaEstudianteResponse>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private estudianteService: EstudianteService,
    private tramitesService: TramitesService,
    private periodoGestionService: PeriodoGestionService,
    private tramitesAcademicosService: TramitesAcademicosService
  ) {
    super();
  }

  ngOnInit(): void {

    this.getListaTramites();

    this.getAllPeriodos();

    this.selectedHabilitacion = this.data.selectedHabilitacion as BandejaHabilitacionPorExcepcion;

    this.formBusqueda = this.formBuilder.group({
      busquedaRU : [ undefined, Validators.compose([ Validators.required, Validators.minLength( 5 ), Validators.maxLength( 7 ) ]) ]
    });

    if ( this.selectedHabilitacion ) {
      // => Edicion
      this.formHabilitacionExcepcion = this.formBuilder.group({
        /* idEstudiante      : [ this.selectedHabilitacion.idEstudiante, Validators.compose([ Validators.required ])],
        estado         : [ +this.activado ],
        rangoFechaGroup: this.formBuilder.group({
          fechaInicial: [ this.selectedHabilitacion.fechaInicial, Validators.compose([ Validators.required ]) ],
          fechaFinal  : [ this.selectedHabilitacion.fechaFinal, Validators.compose([ Validators.required ]) ]
        }) */
      });
    } else {
      // Insercion

      this.formHabilitacionExcepcion = this.formBuilder.group({
        idTramite          : [ undefined, Validators.required],
        idPeriodoGestion   : [ undefined, Validators.required],
        fechaRegularizacion: [ undefined, Validators.compose([ Validators.required ]) ],
        motivoHabilitacion : [ undefined, Validators.compose([ Validators.required , Validators.minLength( 5 ), Validators.maxLength( 100 ) ]) ]
      });

    }

  }

  ngAfterViewInit(): void {
    if (this.dataSource !== undefined) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  private getListaTramites(): void {

    this.tramitesAcademicosService.getTramitesHabilitados().pipe( takeUntil( this.unsubscribe$ ) ).subscribe( listaTramitesAcademicos => {
      this.listaTramites = listaTramitesAcademicos.data as Array<TramiteModel>;
    });
  }

  private getAllPeriodos(): void {

    this.periodoGestionService.getAllPeriodos().pipe( takeUntil( this.unsubscribe$ ) ).subscribe( resp => {
      this.listaPeriodosGestiones = resp.data ?? [];
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  onBuscarEstudianteByRU(): void {
    const ru = this.formBusqueda.controls['busquedaRU'].value as number;

    this.estudianteService.getInformacionEstudianteByRU( ru ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      if (resp.data?.length > 0) {
        this.dataSource.data = resp.data;
      } else {
        this.dataSource.data = [];
        this.formBusqueda.controls[ 'busquedaRU' ].setValue(undefined);
        this.formBusqueda.controls[ 'busquedaRU' ].updateValueAndValidity();
      }
    });
  }

  fillLabelsAndValuesColumns(): void {
    const data = this.dataSource.data[ 0 ];
    const tramite = this.listaTramites.filter( x => x.idTramite === this.formHabilitacionExcepcion.get( 'idTramite' ).value )[ 0 ];
    const fechaRegularizacion = this.formHabilitacionExcepcion.controls[ 'fechaRegularizacion' ].value;
    const periodo = this.listaPeriodosGestiones.filter( x => x.idPeriodoGestion === this.formHabilitacionExcepcion.controls[ 'idPeriodoGestion' ].value )[ 0 ];
    const motivoHabilitacion = this.formHabilitacionExcepcion.controls[ 'motivoHabilitacion' ].value;

    this.listaLabelColumnas = [ 'CI', 'Nombre completo', 'Carrera', 'Tramite', 'Periodo', 'Fecha regularización', 'Motivo habilitacion' ];
    this.listaValoresColumnas = [ data.ci, data.nombreCompleto, data.carrera, tramite.descripcionTramite, String(periodo.periodo).concat('/').concat(periodo.gestion.toString() ), this.datePipe.transform( fechaRegularizacion, 'yyyy-MM-dd' ), motivoHabilitacion ];

  }

  onFinalizarTramite(): void {
    const data = this.dataSource.data[ 0 ];

    const habilitacionPorExcepcionInsert: HabilitacionPorExcepcionInsert = {
      idEstudiante       : data.idEstudiante,
      idTramite          : this.formHabilitacionExcepcion.get( 'idTramite' ).value,
      idPeriodoGestion   : this.formHabilitacionExcepcion.get( 'idPeriodoGestion').value,
      fechaRegularizacion: this.formHabilitacionExcepcion.get( 'fechaRegularizacion' ).value,
      motivoHabilitacion : this.formHabilitacionExcepcion.get( 'motivoHabilitacion').value,
      estado             : eEstado.ACTIVADO
    };

    this.tramitesService.insertTramitePorExcepcion( habilitacionPorExcepcionInsert ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.onClose( resp.data );
    });
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
