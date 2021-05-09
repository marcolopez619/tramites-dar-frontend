import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../../shared/animations/template.animation';
import { BaseComponent } from '../../../../shared/base.component';
import { UniversidadCarreraComponent } from '../../../../shared/components/universidad-carrera/universidad-carrera.component';
import { eModulo } from '../../../../shared/enums/modulo.enum';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { UniversidadService } from '../../../../shared/services/universidad.service';
import { BandejaCarreras, BandejaUniversidades } from '../../../../tramites/models/tramites.models';

@Component({
  selector: 'app-facultad',
  templateUrl: './facultad.component.html',
  styleUrls: ['./facultad.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class FacultadComponent extends BaseComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  selectedData: any;
  titToolBar: string;
  activado: boolean;
  universidadSelected: BandejaUniversidades;
  isUniversidadOperation: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    private universidadService: UniversidadService
  ) {
    super();
  }

  ngOnInit(): void {

    this.isUniversidadOperation = this.data.isUniversidadOperation as boolean;

    if ( this.isUniversidadOperation ) {
      // Operaciones con universidades
      this.universidadSelected = this.data.universidadSelected as BandejaUniversidades;
      this.setDataosInsercionEdicionUniversidad();

      /* if ( this.universidadSelected ) {
        // => Edicion de datos de universidad
      } else {
        // => Insercion de nueva universidad
        this.setDatosAdicionUniversidad();
      } */

    } else {
      // Operaciones con carreras
    }

    const isEditarUniversidad = this.universidadSelected !== undefined;
    const isAnadirCarrera = this.data.isAnadirCarrera;
    /* const isEditarUniversidad = this.data.isEditarUniversidad;
    const isAnadirCarrera = this.data.isAnadirCarrera; */

    if ( isEditarUniversidad ) {
      this.selectedData = this.universidadSelected;
      this.titToolBar = this.langService.getLang(eModulo.Base, 'lbl-editar').concat(' universidad');
      this.activado = !!this.universidadSelected.estado;

      this.formulario = this.formBuilder.group({
        nombre : [this.selectedData.nombre, Validators.compose([Validators.required, Validators.minLength( 5 ), Validators.maxLength( 100 )])],
        estado : [!!this.selectedData.estado]
      });
    } else if ( isAnadirCarrera ) {
      this.titToolBar = this.langService.getLang(eModulo.Base, 'lbl-anadir' ).concat(' carrera');

      // Crear un formulario Vacio
      this.formulario = this.formBuilder.group({
        nombre : [undefined, Validators.compose([Validators.required, Validators.minLength( 5 ), Validators.maxLength( 100 )])],
        estado : [undefined]
      });
    } else {
      this.selectedData = this.data.selectedData;
      this.titToolBar = this.langService.getLang(eModulo.Base, 'lbl-editar' ).concat(' carrera');
      this.activado = this.selectedData.estado ;

      // Asignar datos al formulario con los datos existentes.
      this.formulario = this.formBuilder.group({
        nombre : [this.selectedData.nombre, Validators.compose([Validators.required, Validators.minLength( 5 ), Validators.maxLength( 100 )])],
        estado : [this.selectedData.estado]
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  private setDataosInsercionEdicionUniversidad(): void {
    this.titToolBar = this.langService.getLang(eModulo.Base, 'lbl-editar').concat(' universidad');
    this.activado = !!this.universidadSelected?.estado;

    this.formulario = this.formBuilder.group({
        nombre : [this.universidadSelected?.nombre ?? undefined, Validators.compose([Validators.required, Validators.minLength( 5 ), Validators.maxLength( 100 )])],
        estado : [!!this.universidadSelected?.estado ?? undefined ]
    });

  }

  private onSaveUniversidad(): void {
    console.log(` Nombres : ${this.formulario.controls['nombre'].value} `);
    console.log(` Estado : ${this.activado}`);

    if ( this.universidadSelected ) {
      // => Actualizacion de datos de la universidad
      const univUpdate: BandejaUniversidades = {
        idUniversidad: this.universidadSelected.idUniversidad,
        nombre       : this.formulario.controls['nombre'].value,
        estado       : +this.activado
      };

      // Actualizacion de datos de la universidad
      this.universidadService.updateUniversidad( univUpdate ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
        this.onClose( resp.data );
      });
    } else {
      // => Insercion de nueva universidad
      const insertUniv: BandejaUniversidades = {
        idUniversidad: undefined,
        nombre       : this.formulario.controls['nombre'].value,
        estado       : +this.activado
      };

      // Actualizacion de datos de la universidad
      this.universidadService.insertUniversidad( insertUniv ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
        this.onClose( resp.data );
      });
    }

  }

  onChangeSlideToggleValue( event: MatSlideToggleChange ): void {
    this.activado = event.checked;
  }

  onSave(): void {

    if ( this.isUniversidadOperation ) {
      this.onSaveUniversidad();
    } else {
      // ..
    }

  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
