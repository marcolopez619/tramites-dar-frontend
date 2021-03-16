import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { BaseComponent } from '../../../../shared/base.component';
import { EstudianteModel } from '../../../../shared/models/estudiante.model';
import { SuspencionEstudiante } from '../../../../shared/models/suspencion.estudiante.model';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';

@Component({
  selector: 'app-readmision',
  templateUrl: './readmision.component.html',
  styleUrls: ['./readmision.component.css']
})
export class ReadmisionComponent  extends BaseComponent implements OnInit {

  formReadmision: FormGroup;
  datoEstudiante: EstudianteModel;
  listaSuspenciones : Array<SuspencionEstudiante> = [];
  rangoLiteralSeleccionado : string;

   constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDatosEstudiante();
    this.getListSuspenciones(32926);

    this.formReadmision = this.formBuilder.group({
      idSuspencionSelected : [undefined, Validators.compose([ Validators.required ])],
      motivo             : ['', Validators.compose([ Validators.required ])],
    });
  }

  private getDatosEstudiante(): void{
    this.datoEstudiante = {
      ru            : 32926,
      ci            : '5550155',
      nombreCompleto: 'MOLINA LOPEZ MARCO ANTONIO',
      fotografia    : 'https://imagenes.elpais.com/resizer/Y6ooftjQIqJ38yuds-ss-PDsMxY=/768x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/ICWTJEOAHJBRXAPAO4ACVRSTQ4.jpg',
      idCarrera     : 1,
      carrera       : 'INGENIERIA DE SISTEMAS',
      idFacultad    : 1,
      facultad      : 'VICERRECTORADO',
      tipoTramite   : 'SUSPENCION DE ESTUDIOS',
      fechaSolicitud: new Date()
    };
  }

  private getListSuspenciones(pRu : number): void{
    const listaSuspencionesEstudiante : Array<SuspencionEstudiante> = [
      {
        idSuspencion : 1,
        motivoSuspencion : 'ALGUNA MOTIVO DE MIERDA DE SUSPENCION',
        fechaInicial : new Date(),
        fechaFinal : new Date()
      },
      {
        idSuspencion : 2,
        motivoSuspencion : 'POR MOTIVOS FAMILIZARES Y MAS COSAS QUE NO TE INTERESAN',
        fechaInicial : new Date( 2019 ),
        fechaFinal : new Date( 2020 )
      }
    ]
    this.listaSuspenciones = listaSuspencionesEstudiante;
  }


  onSuspencionSelectedChange(event: MatSelectChange): void{
    const datosSuspencionSelected =  this.listaSuspenciones.find( x => x.idSuspencion == event.value );
    this.rangoLiteralSeleccionado = this.datePipe.transform( datosSuspencionSelected.fechaInicial, 'dd-MM-yyyy' )
                                    .concat( ' al ' )
                                    .concat( this.datePipe.transform( datosSuspencionSelected.fechaFinal, 'dd-MM-yyyy' ) );
  }


  onFinalizarSolicitud(): void{
    this.onClose();
  }


  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
