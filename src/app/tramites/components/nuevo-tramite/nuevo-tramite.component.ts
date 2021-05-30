import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle/slide-toggle';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { PeriodoGestion } from '../../../shared/models/periodo_gestion.model';
import { HabilitacionTramiteModelInsert, HabilitacionTramiteModelUpdate, TramiteModel } from '../../../shared/models/tramites.models';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { PeriodoGestionService } from '../../../shared/services/periodo-gestion.service';
import { TramitesAcademicosService } from '../../../shared/services/tramites-academicos.service';
import { BandejaTramite } from '../../models/tramites.models';
import { TramitesService } from '../../tramites.service';

@Component({
  selector: 'app-nuevo-tramite',
  templateUrl: './nuevo-tramite.component.html',
  styleUrls: ['./nuevo-tramite.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class NuevoTramiteComponent extends BaseComponent implements OnInit {
  formTramite: FormGroup;
  listaTramites: Array<TramiteModel> = [];
  activado = true;
  periodoActivo: PeriodoGestion;
  fechaLimiteSuperior = new Date();
  fechaLimiteInferior = new Date( this.fechaLimiteSuperior.getFullYear(), 0, 1 );

  elementBandejaSelected: BandejaTramite;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    private tramiteService: TramitesService,
    private tramitesAcademicosService: TramitesAcademicosService,
    private periodoGestionService: PeriodoGestionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaTramites();

    this.getPeriodoActivo();

    // Captura el elemento a editar si es que lo hay
    this.elementBandejaSelected = this.data.elementBandejaTramite as BandejaTramite;

    if ( this.elementBandejaSelected ) {
      // => es edicion
      this.activado = !!this.elementBandejaSelected.estado;

      this.elementBandejaSelected.fechaInicial = new Date( this.elementBandejaSelected.fechaInicial );
      this.elementBandejaSelected.fechaFinal   = new Date( this.elementBandejaSelected.fechaFinal );

      this.formTramite = this.formBuilder.group({
        idTramite      : [ this.elementBandejaSelected.idTramite, Validators.compose([ Validators.required ])],
        estado         : [ +this.activado ],
        rangoFechaGroup: this.formBuilder.group({
          fechaInicial: [ this.elementBandejaSelected.fechaInicial, Validators.compose([ Validators.required ]) ],
          fechaFinal  : [ this.elementBandejaSelected.fechaFinal, Validators.compose([ Validators.required ]) ]
        })
      });

    } else {
      // => Nueva insercion
      this.formTramite = this.formBuilder.group({
        idTramite      : [ undefined, Validators.compose([ Validators.required ])],
        estado         : [ undefined ],
        rangoFechaGroup: this.formBuilder.group({
          fechaInicial: [ undefined, Validators.compose([ Validators.required ]) ],
          fechaFinal  : [ undefined, Validators.compose([ Validators.required ]) ]
        })
      });
    }

  }

  private getListaTramites(): void {

    this.tramitesAcademicosService.getTramitesHabilitados().pipe( takeUntil( this.unsubscribe$ ) ).subscribe( listaTramitesAcademicos => {
      this.listaTramites = listaTramitesAcademicos.data as Array<TramiteModel>;
    });
  }

  private getPeriodoActivo(): void {
    this.periodoGestionService.getPeriodoActivo().pipe( takeUntil( this.unsubscribe$ )).subscribe( resp => {
      this.periodoActivo = resp.data;
    });
  }

  onChangeSlideToggleValue( event: MatSlideToggleChange ): void {
    this.activado = event.checked;
  }

  onSaveTramite(): void {
    const rangoFechas = this.formTramite.controls['rangoFechaGroup'].value;
    const fechaIncial = rangoFechas.fechaInicial;
    const fechaFinal  = rangoFechas.fechaFinal;

    if ( this.elementBandejaSelected ) {
      // => Edicion
      const habilitacionTramiteModelUpdate: HabilitacionTramiteModelUpdate = {
        idHabilitacionTramite: this.elementBandejaSelected.idHabilitacionTramite,
        fechaInicial         : fechaIncial,
        fechaFinal           : fechaFinal,
        estado               : +this.activado,
        idTramite            : this.formTramite.controls['idTramite'].value,
        idPeriodoGestion     : this.periodoActivo.idPeriodoGestion
      };

      this.tramiteService.updateHabilitaconTramite( habilitacionTramiteModelUpdate ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( respUpdate => {
        this.onClose(respUpdate);
      });

    } else {
      // => Nueva insercion
      const habilitacionTramiteInsert: HabilitacionTramiteModelInsert = {
        fechaInicial    : fechaIncial,
        fechaFinal      : fechaFinal,
        estado          : +this.activado,
        idTramite       : this.formTramite.controls['idTramite'].value,
        idPeriodoGestion: this.periodoActivo.idPeriodoGestion
      };

      this.tramiteService.insertHabilitaconTramite( habilitacionTramiteInsert ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( respInsert => {
        this.onClose(respInsert);
      });
    }

  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
