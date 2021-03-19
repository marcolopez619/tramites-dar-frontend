import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle/slide-toggle';
import { BaseComponent } from '../../base.component';
import { eModulo } from '../../enums/modulo.enum';
import { ContextoService } from '../../services/contexto.service';
import { LangService } from '../../services/lang.service';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    const isEditarUniversidad = this.data.isEditarUniversidad;
    const isAnadirCarrera = this.data.isAnadirCarrera;

    if ( isEditarUniversidad ) {
      this.selectedData = this.data.selectedData;
      this.titToolBar = this.langService.getLang(eModulo.Base, 'lbl-editar').concat(' universidad');
      this.activado = this.selectedData.estado;

      this.formulario = this.formBuilder.group({
        nombre : [this.selectedData.nombre, Validators.compose([Validators.required, Validators.minLength( 5 ), Validators.maxLength( 100 )])],
        estado : [this.selectedData.estado]
      });
    } else if ( isAnadirCarrera ){
      this.titToolBar = this.langService.getLang(eModulo.Base, 'lbl-anadir' ).concat(' carrera');

      // Crear un formulario Vacio
      this.formulario = this.formBuilder.group({
        nombre : [undefined, Validators.compose([Validators.required, Validators.minLength( 5 ), Validators.maxLength( 100 )])],
        estado : [undefined]
      });
    }else{
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

  onChangeSlideToggleValue( event:MatSlideToggleChange ): void{
    this.activado = event.checked;
  }

  onSave(): void {
    console.log(` Nombres : ${this.formulario.controls['nombre'].value} `);
    console.log(` Estado : ${this.activado}`);

    this.onClose( true );

  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
