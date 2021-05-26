import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../../shared/animations/template.animation';
import { BaseComponent } from '../../../../shared/base.component';
import { PeriodoGestion } from '../../../../shared/models/periodo_gestion.model';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { LangService } from '../../../../shared/services/lang.service';
import { PeriodoGestionService } from '../../../../shared/services/periodo-gestion.service';

@Component({
  selector: 'app-habilitacion-gestion',
  templateUrl: './habilitacion-gestion.component.html',
  styleUrls: ['./habilitacion-gestion.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class HabilitacionGestionComponent extends BaseComponent implements OnInit {
  formHabilitacionGestion: FormGroup;
  listaGestiones: Array<PeriodoGestion> = [];
  activado = true;
  periodoActivo: PeriodoGestion;

  elementBandejaSelected: PeriodoGestion;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    private periodoGestionService: PeriodoGestionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllPeriodos();

    // Captura el elemento a editar si es que lo hay
    this.elementBandejaSelected = this.data.elementSelected as PeriodoGestion;

    if ( this.elementBandejaSelected ) {
      // => es edicion
      this.activado = !!this.elementBandejaSelected.estado;

      this.formHabilitacionGestion = this.formBuilder.group({
        idPeriodoGestion: [ this.elementBandejaSelected.idPeriodoGestion, Validators.compose([ Validators.required ])],
        estado          : [ +this.activado ]
      });

    } else {
      // => Nueva insercion
      /* this.formHabilitacionGestion = this.formBuilder.group({
        idPeriodoGestion: [ undefined, Validators.compose([ Validators.required ])],
        estado          : [ +this.activado ]
      }); */
    }

  }

  private getAllPeriodos(): void {
    this.periodoGestionService.getAllPeriodos().pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.listaGestiones = resp.data ?? [];
    });
  }

  onChangeSlideToggleValue( event: MatSlideToggleChange ): void {
    this.activado = event.checked;
  }

  onSaveTramite(): void {
    const updateModel: PeriodoGestion = {
      idPeriodoGestion: this.formHabilitacionGestion.controls['idPeriodoGestion'].value,
      estado          : this.formHabilitacionGestion.controls['estado'].value
    };

    this.periodoGestionService.updatePeriodo(updateModel).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( respUpdate => {
      this.onClose(respUpdate);
    });

    /* if ( this.elementBandejaSelected ) {
      // => Edicion
      const updateModel : PeriodoGestion = {
        idPeriodoGestion: this.formHabilitacionGestion.controls['idPeriodoGestion'].value,
        estado          : this.formHabilitacionGestion.controls['estado'].value
      };

      this.periodoGestionService.updatePeriodo(updateModel).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( respUpdate => {
        this.onClose(respUpdate);
      });

    } else {
      // => Nueva insercion
      const habilitacionTramiteInsert: HabilitacionTramiteModelInsert = {
        fechaInicial    : fechaIncial,
        fechaFinal      : fechaFinal,
        estado          : +this.activado,
        idTramite       : this.formHabilitacionGestion.controls['idTramite'].value,
        idPeriodoGestion: this.periodoActivo.idPeriodoGestion
      };

      this.tramiteService.insertHabilitaconTramite( habilitacionTramiteInsert ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( respInsert => {
        this.onClose(respInsert);
      });
    } */

  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
