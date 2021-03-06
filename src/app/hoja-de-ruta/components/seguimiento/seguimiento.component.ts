import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { LangService } from '../../../shared/services/lang.service';
import { HojaDeRutaService } from '../../hoja-de-ruta.service';
import { DetalleSeguimientoModel, SeguimientoModel } from '../../models/detalle-seguimiento.model';

@Component({
  selector: 'seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class SeguimientoComponent extends BaseComponent implements OnInit {
  longMaxDescripcion = 500;
  numeroHojaRuta = '';
  referencia = '';

  listaAux: Array<DetalleSeguimientoModel> = [];
  listaDetalleSeguimiento: Array<DetalleSeguimientoModel> = [];
  vObjSeguimiento: SeguimientoModel;
  dataSource = new MatTableDataSource<DetalleSeguimientoModel>([]);

  formSeguimiento: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public langService: LangService,
    private formBuilder: FormBuilder,
    private hojaRutaService: HojaDeRutaService
  ) {
    super();
  }

  ngOnInit(): void {
    this.hojaRutaService
      .getAllHojaRutaSeguimiento(this.data.idHojaRuta)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((vObjSeguimiento) => {

        this.numeroHojaRuta = vObjSeguimiento.data[0].numeroHojaRuta;
        //this.formSeguimiento.controls['numeroHojaRuta'].setValue( vHojaRuta );
        this.referencia = vObjSeguimiento.data[0].referencia;

        const vSeg = vObjSeguimiento.data[0].seguimiento;
        //vObjSeguimiento
        this.listaAux = JSON.parse( vSeg ) as Array<DetalleSeguimientoModel>;
        this.dataSource.data = vObjSeguimiento as Array<SeguimientoModel>;
        this.data.idHojaRuta = undefined;
      });
      /*
      this.formSeguimiento = this.formBuilder.group({
        NroHojaRuta :this.remitente,
        Referencia: this.referencia
      });*/

  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }
  cancelar(): void {
    this.dialogRef.close(undefined);
  }
}
