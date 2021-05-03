import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../../../shared/base.component';
import { CarreraModel } from '../../../../shared/models/carrera.model';
import { UniversidadService } from '../../../../shared/services/universidad.service';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { EstudianteModel } from '../../../../shared/models/estudiante.model';
import { EstudianteService } from '../../../estudiante.service';

@Component({
  selector: 'app-cambio-carrera',
  templateUrl: './cambio-carrera.component.html',
  styleUrls: ['./cambio-carrera.component.css']
})
export class CambioCarreraComponent extends BaseComponent implements OnInit {

  formCambioCarrera: FormGroup;
  listaCarreras: Array<CarreraModel> = [];
  listaCarrerasFiltradas: Observable<Array<CarreraModel>>;
  datosEstudiante: EstudianteModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    private estudianteService: EstudianteService,
    private universidadService: UniversidadService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getInformacionEstudiante( 1 );
    this.getListaCarreras();

    this.formCambioCarrera = this.formBuilder.group({
      idCarreraDestino : [undefined, Validators.compose([ Validators.required ])]
    });

    this.listaCarrerasFiltradas = this.formCambioCarrera.controls['idCarreraDestino'].valueChanges.pipe(
      startWith( '' ),
      map( ( value: string | null ) => this.filtrarValores(value))
    );

  }

  private getInformacionEstudiante(pIdEstudiante: number): void {
    this.estudianteService.getInformacionEstudiante(pIdEstudiante).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.datosEstudiante = resp.data;
    });
  }

  private getListaCarreras(): void {
    const idUniversidad = 1; // Por default sera la Tomas frias para este caso

    this.universidadService.getAllListaCarreras( idUniversidad ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.listaCarreras = resp.data;
    });
  }

  private filtrarValores(value: string): Array<CarreraModel> {
    const filterValue = value.toLowerCase();
    const dataFiltrada = this.listaCarreras.filter(carrera => carrera.carrera.toLowerCase().includes( filterValue ));
    return dataFiltrada;
  }

  onFinalizarSolicitud(): void {
    const descCarreraSeleccionada = this.formCambioCarrera.controls['idCarreraDestino'].value;
    const infCarreraSeleccionada = this.listaCarreras.filter( x => x.carrera === descCarreraSeleccionada )[ 0 ];

    console.log( `--> Carrera seleccionada : ${descCarreraSeleccionada}` );
    console.log(`--> ID carrera seleccioanda : ${ infCarreraSeleccionada.idCarrera }`);

    // this.onClose();
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
