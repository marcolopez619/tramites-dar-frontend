import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { EstudianteService } from '../../../estudiante/estudiante.service';
import { BusquedaEstudianteResponse } from '../../../tramites/models/tramites.models';
import { fadeInAnim, slideInLeftAnim, zoomInAnim } from '../../animations/template.animation';
import { BaseComponent } from '../../base.component';
import { ContextoService } from '../../services/contexto.service';
import { LangService } from '../../services/lang.service';

@Component({
  selector: 'sh-busqueda-estudiante',
  templateUrl: './busqueda-estudiante.component.html',
  styleUrls: ['./busqueda-estudiante.component.css'],
  animations: [zoomInAnim, slideInLeftAnim, fadeInAnim],
  host: { class: 'container-fluid', '[@zoomInAnim]': 'true', '[@fadeInAnim]': 'true'}
})
export class BusquedaEstudianteComponent  extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['ci', 'nombreCompleto', 'fechaNacimiento', 'carrera' ];
  dataSource = new MatTableDataSource<BusquedaEstudianteResponse>([]);

  formBusqueda: FormGroup;
  isSelected = false;

  @Output()
  onSelectedUser = new EventEmitter();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public contextService: ContextoService,
    public langService: LangService,
    private estudianteService: EstudianteService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.formBusqueda = this.formBuilder.group({
      busquedaRU : [ undefined, Validators.compose([ Validators.required, Validators.minLength( 5 ), Validators.maxLength( 7 ) ]) ]
    });
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

  onBuscarEstudianteByRU(): void {
    const ru = this.formBusqueda.controls['busquedaRU'].value;

    if ( ru ) {
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

  }

  onSelectedUserFromTable(userSelected: BusquedaEstudianteResponse): void {
    this.isSelected = !this.isSelected;
    this.onSelectedUser.next( userSelected as any );
  }

}
