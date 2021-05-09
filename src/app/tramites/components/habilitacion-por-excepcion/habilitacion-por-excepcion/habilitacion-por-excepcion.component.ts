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
import { TramiteModel } from '../../../../shared/models/tramites.models';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { TramitesAcademicosService } from '../../../../shared/services/tramites-academicos.service';
import { BandejaHabilitacionPorExcepcion, BusquedaEstudianteResponse } from '../../../models/tramites.models';

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

  fechaLimiteSuperior = new Date();
  fechaLimiteInferior = new Date( this.fechaLimiteSuperior.getFullYear() - 1, 0, 1);

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
    private estudianteService: EstudianteService,
    private tramitesAcademicosService: TramitesAcademicosService
  ) {
    super();
  }

  ngOnInit(): void {

    this.getListaTramites();

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
        idTramite : [undefined, Validators.required],
        rangoFechaGroup: this.formBuilder.group({
          fechaInicial: [ undefined, Validators.compose([ Validators.required ]) ],
          fechaFinal  : [ undefined, Validators.compose([ Validators.required ]) ]
        })
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

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
