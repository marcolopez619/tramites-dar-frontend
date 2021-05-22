import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../../../shared/base.component';
import { eEstado } from '../../../../shared/enums/estado.enum';
import { eTipoTramite } from '../../../../shared/enums/tipoTramite.enum';
import { eEntidad } from '../../../../shared/enums/tipo_entidad.enum';
import { CarreraModel } from '../../../../shared/models/carrera.model';
import { EstudianteModel } from '../../../../shared/models/estudiante.model';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { UniversidadService } from '../../../../shared/services/universidad.service';
import { EstudianteService } from '../../../estudiante.service';
import { TransferenciaInsert } from '../../../models/transferencia.model';
import { TransferenciaService } from '../transferencia.service';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent extends BaseComponent implements OnInit {

  formTransferencia: FormGroup;
  listaCarreras: Array<CarreraModel> = [];
  listaCarrerasFiltradas: Observable<Array<CarreraModel>>;
  datosEstudiante: EstudianteModel;

  listaLabelColumnas: Array<string> = [];
  listaValoresColumnas: Array<any> = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    private estudianteService: EstudianteService,
    private universidadService: UniversidadService,
    private transferenciaService: TransferenciaService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getInformacionEstudiante( );
    this.getListaCarreras();

    this.formTransferencia = this.formBuilder.group({
      idCarreraDestino : [undefined, Validators.compose([ Validators.required ])],
      motivo           : [undefined, Validators.compose([ Validators.required ])]
    });

    this.listaCarrerasFiltradas = this.formTransferencia.controls['idCarreraDestino'].valueChanges.pipe(
      startWith( '' ),
      map( ( value: string | null ) => this.filtrarValores(value))
    );

  }

  private getInformacionEstudiante(): void {
    const idEstudiante = this.contextService.getItemContexto('idEstudiante');

    this.estudianteService.getInformacionEstudiante(idEstudiante).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.datosEstudiante = resp.data;
    });
  }

  private getListaCarreras(): void {
    const idCarreraEstudiante = this.contextService.getItemContexto('idCarrera');
    const nombreCarreraEstudiante = this.contextService.getItemContexto('Carrera');

    this.universidadService.getListaCarrerasParaTransferencia( nombreCarreraEstudiante ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      //** La transferencia se realiza solo entre iguales carreras de la ambas sedes o subsedes
      this.listaCarreras = resp.data?.filter( x => x.idCarrera !== idCarreraEstudiante ) ?? [];
    });
  }

  private filtrarValores(value: string): Array<CarreraModel> {
    const filterValue = value.toLowerCase();
    const dataFiltrada = this.listaCarreras.filter(carrera => carrera.nombre.toLowerCase().includes( filterValue ));
    return dataFiltrada;
  }

  setDatosFormatoTabla(): void{
    this.listaLabelColumnas = ['Carrera origen', 'Carrera destino', 'Motivo'];
    this.listaValoresColumnas = [this.datosEstudiante.carrera , this.formTransferencia.get('idCarreraDestino').value, this.formTransferencia.controls['motivo'].value];
  }

  onFinalizarSolicitud(): void {
    const carreraDestino = this.listaCarreras.filter( x => x.nombre === this.formTransferencia.controls[ 'idCarreraDestino' ].value ) [ 0 ];

    const cambioCarreraInsert: TransferenciaInsert = {
      idCarreraOrigen : this.datosEstudiante.idCarrera,
      idCarreraDestino: carreraDestino.idCarrera,
      motivo          : this.formTransferencia.controls['motivo'].value,
      idEstudiante    : this.datosEstudiante.idEstudiante,
      idTramite       : eTipoTramite.TRANSFERENCIA,
      idEstado        : eEstado.ACTIVADO,
      idEntidad       : eEntidad.ESTUDIANTE,
      observaciones   : undefined
    };

    this.transferenciaService.insertTransferencia( cambioCarreraInsert ).pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.onClose( resp.data );
    });

  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
