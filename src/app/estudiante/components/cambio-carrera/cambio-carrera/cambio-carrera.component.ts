import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { BaseComponent } from '../../../../shared/base.component';
import { CarreraModel } from '../../../../shared/models/carrera.model';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';

@Component({
  selector: 'app-cambio-carrera',
  templateUrl: './cambio-carrera.component.html',
  styleUrls: ['./cambio-carrera.component.css']
})
export class CambioCarreraComponent extends BaseComponent implements OnInit {

  formCambioCarrera: FormGroup;
  listaCarreras: Array<CarreraModel> = [];
  listaCarrerasFiltradas: Observable<Array<CarreraModel>>;

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
    this.getListaCarreras();

    this.formCambioCarrera = this.formBuilder.group({
      idCarreraDestino : [undefined, Validators.compose([ Validators.required ])]
    });

    this.listaCarrerasFiltradas = this.formCambioCarrera.controls['idCarreraDestino'].valueChanges.pipe(
      startWith( '' ),
      map( ( value : string | null ) => this.filtrarValores(value))
    );

  }


  private getListaCarreras(): void {
    const data: Array<CarreraModel> = [{
      idCarrera : 1,
      descCarrera : 'CONTADURIA PUBLICA'
    },{
      idCarrera : 2,
      descCarrera : 'ENFERMERIA'
    },{
      idCarrera : 3,
      descCarrera : 'INGENIERIA COMERCIAL'
    }];

    this.listaCarreras = data;
  }

  private filtrarValores(value: string): Array<CarreraModel> {
    const filterValue = value.toLowerCase();
    const dataFiltrada = this.listaCarreras.filter(carrera => carrera.descCarrera.toLowerCase().includes( filterValue ));
    return dataFiltrada;
  }

  onFinalizarSolicitud(): void{
    const descCarreraSeleccionada = this.formCambioCarrera.controls['idCarreraDestino'].value;
    const infCarreraSeleccionada = this.listaCarreras.filter( x => x.descCarrera == descCarreraSeleccionada )[ 0 ];

    console.log( `--> Carrera seleccionada : ${descCarreraSeleccionada}` );
    console.log(`--> ID carrera seleccioanda : ${ infCarreraSeleccionada.idCarrera }`);

    // this.onClose();
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}


