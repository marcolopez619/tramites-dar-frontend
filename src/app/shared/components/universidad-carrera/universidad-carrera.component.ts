import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle/slide-toggle';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BandejaCarreras, BandejaFacultad, BandejaUniversidades } from '../../../tramites/models/tramites.models';
import { BaseComponent } from '../../base.component';
import { eModulo } from '../../enums/modulo.enum';
import { eTipoObjetoUniversidad } from '../../enums/tipo_objeto_universidad.enum';
import { eTipoOperacion } from '../../enums/tipo_operacion.enum';
import { ContextoService } from '../../services/contexto.service';
import { LangService } from '../../services/lang.service';
import { UniversidadService } from '../../services/universidad.service';

@Component({
  selector: 'sh-universidad-carrera',
  templateUrl: './universidad-carrera.component.html',
  styleUrls: ['./universidad-carrera.component.css']
})
export class UniversidadCarreraComponent extends BaseComponent implements OnInit, OnDestroy {

  formulario: FormGroup;
  selectedData: any;
  titToolBar: string;
  activado: boolean;
  universidadSelected: BandejaUniversidades;
  facultadSelected: BandejaFacultad;
  operationType: eTipoOperacion;
  objetoUniversidad: eTipoObjetoUniversidad;
  idUniversidadSelectedForInsert: number;
  idFacultadSelectedForInsert: number;
  placeHolderEdicion: string;
  placeHolderError: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private universidadService: UniversidadService
  ) {
    super();
  }

  ngOnInit(): void {

    this.objetoUniversidad = this.data.objetoUniversidad as eTipoObjetoUniversidad;
    this.operationType = this.data.operationType as eTipoOperacion;
    this.idUniversidadSelectedForInsert = this.data.idUniversidad;
    this.idFacultadSelectedForInsert = this.data.idFacultad;

    this.setTitulosFormulario();

    if ( this.objetoUniversidad === eTipoObjetoUniversidad.UNIVERSIDAD ) {
      // Operaciones con universidades

      if ( this.operationType === eTipoOperacion.ACTUALIZACION) {
        // Modificacion de datos
        this.selectedData = this.data.selectedData as BandejaUniversidades;
        this.setDatosEdicion();
      } else {
        // Insercion de datos
        this.setDatosInsercion();
      }

    } else if (this.objetoUniversidad === eTipoObjetoUniversidad.FACULTAD) {
      // Operaciones con facultadades

      if ( this.operationType === eTipoOperacion.ACTUALIZACION) {
        // Modificacion de datos
        this.selectedData = this.data.selectedData as BandejaFacultad;
        this.setDatosEdicion();
      } else {
        // Insercion de datos
        this.setDatosInsercion();
      }
    } else if (this.objetoUniversidad === eTipoObjetoUniversidad.CARRERA) {
      // Operaciones con carreras
      if ( this.operationType === eTipoOperacion.ACTUALIZACION) {
        // Modificacion de datos
        this.selectedData = this.data.selectedData as BandejaCarreras;
        this.setDatosEdicion();
      } else {
        // Insercion de datos
        this.setDatosInsercion();
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  private setDatosInsercion(): void {
    this.activado = !!this.selectedData?.estado;

    this.formulario = this.formBuilder.group({
        nombre : [undefined , Validators.compose([Validators.required, Validators.minLength( 5 ), Validators.maxLength( 100 )])],
        estado : [undefined  ]
    });
  }

  private setDatosEdicion(): void {
    this.activado = !!this.selectedData?.estado;

    this.formulario = this.formBuilder.group({
        nombre : [  this.selectedData.nombre , Validators.compose([Validators.required, Validators.minLength( 5 ), Validators.maxLength( 100 )])],
        estado : [!!this.selectedData.estado ]
    });
  }

  private setTitulosFormulario(): void {
    if ( this.objetoUniversidad === eTipoObjetoUniversidad.UNIVERSIDAD) {
      this.titToolBar = this.langService.getLang(eModulo.Base, (this.operationType === eTipoOperacion.ACTUALIZACION) ? 'lbl-editar' : 'lbl-anadir').concat(' universidad');
      this.placeHolderEdicion = this.langService.getLang(eModulo.Dar, 'lbl-universidad');
      this.placeHolderError = this.langService.getLang(eModulo.Dar, 'lbl-universidad-error');
    } else if ( this.objetoUniversidad === eTipoObjetoUniversidad.FACULTAD ) {
      this.titToolBar = this.langService.getLang(eModulo.Base, (this.operationType === eTipoOperacion.ACTUALIZACION) ? 'lbl-editar' : 'lbl-anadir').concat(' facultad');
      this.placeHolderEdicion = this.langService.getLang(eModulo.Dar, 'lbl-facultad');
      this.placeHolderError = this.langService.getLang(eModulo.Dar, 'lbl-facultad-error');
    } else {
      this.titToolBar = this.langService.getLang(eModulo.Base, (this.operationType === eTipoOperacion.ACTUALIZACION) ? 'lbl-editar' : 'lbl-anadir').concat(' carrera');
      this.placeHolderEdicion = this.langService.getLang(eModulo.Dar, 'lbl-carrera');
      this.placeHolderError = this.langService.getLang(eModulo.Dar, 'lbl-carrera-error');
    }
  }

  onSave(): void {

    if ( this.objetoUniversidad === eTipoObjetoUniversidad.UNIVERSIDAD ) {

      if ( this.operationType === eTipoOperacion.INSERCION) {
        // => Insercion de nueva universidad
        const insertUniv: BandejaUniversidades = {
          idUniversidad: undefined,
          nombre       : this.formulario.controls['nombre'].value.trim(),
          estado       : +this.activado
        };

        // Actualizacion de datos de la universidad
        this.universidadService.insertUniversidad( insertUniv ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
          this.onClose( resp.data );
        });

      } else {
        // => Actualizacion de datos de la universidad
        const univUpdate: BandejaUniversidades = {
          idUniversidad: this.selectedData.idUniversidad,
          nombre       : this.formulario.controls['nombre'].value.trim(),
          estado       : +this.activado
        };

        // Actualizacion de datos de la universidad
        this.universidadService.updateUniversidad( univUpdate ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
          this.onClose( resp.data );
          // this.router.navigate[ 'dar/universidades/index' ];
        });
      }
    } else if ( this.objetoUniversidad === eTipoObjetoUniversidad.FACULTAD ) {

      if ( this.operationType === eTipoOperacion.INSERCION) {
        // => Insercion de nueva universidad
        const insertFacultad: BandejaFacultad = {
          idFacultad   : undefined,
          nombre       : this.formulario.controls['nombre'].value.trim(),
          estado       : +this.activado,
          idUniversidad: this.idUniversidadSelectedForInsert
        };

        // Actualizacion de datos de la universidad
        this.universidadService.insertFacultad( insertFacultad ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
          this.onClose( resp.data );
        });

      } else {
        // => Actualizacion de datos de la universidad
        const facultadUpdate: BandejaFacultad = {
          idFacultad: this.selectedData.idFacultad,
          nombre    : this.formulario.controls['nombre'].value.trim(),
          estado    : +this.activado
        };

        // Actualizacion de datos de la universidad
        this.universidadService.updateFacultad( facultadUpdate ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
          this.onClose( resp.data );
        });
      }
    } else if ( this.objetoUniversidad === eTipoObjetoUniversidad.CARRERA ) {

      if ( this.operationType === eTipoOperacion.INSERCION) {
        // => Insercion de nueva facultad
        const insertCarrera: BandejaCarreras = {
          nombre    : this.formulario.controls['nombre'].value.trim(),
          estado    : +this.activado,
          idFacultad: this.idFacultadSelectedForInsert
        };

        // Actualizacion de datos de la carrera
        this.universidadService.insertCarrera( insertCarrera ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
          this.onClose( resp.data );
        });

      } else {
        // => Actualizacion de datos de la carrera
        const carreraUpdate: BandejaCarreras = {
          idCarrera : this.selectedData.idCarrera,
          nombre    : this.formulario.controls['nombre'].value.trim(),
          estado    : +this.activado
        };

        // Actualizacion de datos de la carrera
        this.universidadService.updateCarrera( carreraUpdate ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
          this.onClose( resp.data );
        });
      }
    }
  }

  onChangeSlideToggleValue( event: MatSlideToggleChange ): void {
    this.activado = event.checked;
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
