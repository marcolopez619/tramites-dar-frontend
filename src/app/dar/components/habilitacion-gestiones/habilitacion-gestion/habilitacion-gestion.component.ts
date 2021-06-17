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
  listaPeriodosDisponibles = [ 1, 2 ];
  listaGestionesDisponibles: Array<number> = [];
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
    // this.getAllPeriodos();

    this.getGestionesDisponibles();

    // Captura el elemento a editar si es que lo hay
    this.elementBandejaSelected = this.data.elementSelected as PeriodoGestion;

    if ( this.elementBandejaSelected ) {
      // => es edicion
      this.activado = !!this.elementBandejaSelected.estado;

      this.formHabilitacionGestion = this.formBuilder.group({
        periodo: [ this.elementBandejaSelected.periodo, Validators.compose([ Validators.required])],
        gestion: [ this.elementBandejaSelected.gestion, Validators.compose([ Validators.required])],
        estado : [ +this.activado ]
      });

    } else {
      // => Nueva insercion
      this.formHabilitacionGestion = this.formBuilder.group({
        periodo: [ undefined, Validators.compose([ Validators.required])],
        gestion: [ undefined, Validators.compose([ Validators.required])],
        estado : [ +this.activado ]
      });
    }

  }

  private getAllPeriodos(): void {
    this.periodoGestionService.getAllPeriodos().pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.listaGestiones = resp.data ?? [];
    });
  }

  private getGestionesDisponibles(): void {
    const date = new Date();
    const anioActual = date.getFullYear();

    for (let gestion =  anioActual; gestion < anioActual + 5; gestion++) {
      this.listaGestionesDisponibles.push( gestion );
    }

  }

  onChangeSlideToggleValue( event: MatSlideToggleChange ): void {
    this.activado = event.checked;
  }

  onSaveTramite(): void {

    if ( this.elementBandejaSelected ) {
      // => Edicion
      const updateModel: PeriodoGestion = {
        idPeriodoGestion: this.elementBandejaSelected.idPeriodoGestion,
        periodo         : this.formHabilitacionGestion.controls[ 'periodo' ].value,
        gestion         : this.formHabilitacionGestion.controls[ 'gestion' ].value,
        estado          : this.formHabilitacionGestion.controls['estado'].value
      };

      this.periodoGestionService.updatePeriodo(updateModel).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( respUpdate => {
        this.onClose(respUpdate);
      });

    } else {
      // => Nueva insercion
      const insertModel: PeriodoGestion = {
        periodo: this.formHabilitacionGestion.controls[ 'periodo' ].value,
        gestion: this.formHabilitacionGestion.controls[ 'gestion' ].value,
        estado : this.formHabilitacionGestion.controls['estado'].value
      };

      this.periodoGestionService.addPeriodo(insertModel).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( respUpdate => {
        this.onClose(respUpdate);
      });

    }

  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
