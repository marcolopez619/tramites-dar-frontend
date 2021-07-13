import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../../base.component';
import { eTipoTramite } from '../../enums/tipoTramite.enum';
import { Seguimiento } from '../../models/seguimiento.models';
import { ContextoService } from '../../services/contexto.service';
import { LangService } from '../../services/lang.service';
import { TramitesAcademicosService } from '../../services/tramites-academicos.service';

@Component({
  selector: 'sh-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent extends BaseComponent implements OnInit {

  formSeguimiento: FormGroup;
  dataSeguimiento : Seguimiento;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private tramiteAcademicoService: TramitesAcademicosService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    super();
  }

  ngOnInit(): void {
    const idTramite = this.data.idTramite;
    const idTipoTramite = this.data.idTipoTramite;

    this.formSeguimiento = this.formBuilder.group({
      idTramite    : [ undefined ],
      tramite      : [ undefined ],
      idEstado     : [ undefined ],
      estado       : [ undefined ],
      idEntidad    : [ undefined ],
      entidad      : [ undefined ],
      fechaProceso : [ undefined ],
      observaciones: [ undefined ],
      idMotivo     : [ undefined ],
      motivo       : [ undefined ]
    });

    this.getDatosSeguimiento(idTramite, idTipoTramite);
  }

  private getDatosSeguimiento( pIdTramite: number, pIdTipoTramite: eTipoTramite ): void {

    this.tramiteAcademicoService.getSeguimientoTramite(pIdTramite, pIdTipoTramite).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( resp => {
      const ninguna = '---- NINGUNA ----';
      this.dataSeguimiento = resp.data;

      this.formSeguimiento = this.formBuilder.group({
        idTramite    : [this.dataSeguimiento.idTramite],
        tramite      : [this.dataSeguimiento.tramite ],
        idEstado     : [this.dataSeguimiento.idEstado],
        estado       : [this.dataSeguimiento.estado],
        idEntidad    : [this.dataSeguimiento.idEntidad],
        entidad      : [this.dataSeguimiento.entidad],
        fechaProceso : [this.dataSeguimiento.estado.concat( ` en fecha : `, this.datePipe.transform( this.dataSeguimiento.fechaProceso, 'dd-MM-yyyy') ) ],
        observaciones: [this.dataSeguimiento.observaciones ?? `${ninguna}`],
        idMotivo     : [this.dataSeguimiento.idMotivo],
        motivo       : [this.dataSeguimiento.motivo ?? `${ninguna}` ]
      });

    });
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
