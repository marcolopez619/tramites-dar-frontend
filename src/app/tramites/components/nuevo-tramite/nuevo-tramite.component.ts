import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle/slide-toggle';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { HabilitacionTramiteModelInsert, TramiteModel } from '../../../shared/models/tramites.models';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { TramitesAcademicosService } from '../../../shared/services/tramites-academicos.service';
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
  fechaLimiteSuperior = new Date();
  fechaLimiteInferior = new Date( this.fechaLimiteSuperior.getFullYear() - 1, 0, 1);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    private tramiteService: TramitesService,
    private tramitesAcademicosService: TramitesAcademicosService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getListaTramites();

    this.formTramite = this.formBuilder.group({
      idTramite : [ undefined, Validators.compose([ Validators.required ])],
      rangoFechaGroup: this.formBuilder.group({
        fechaInicial: [ undefined, Validators.compose([ Validators.required ]) ],
        fechaFinal  : [ undefined, Validators.compose([ Validators.required ]) ]
      })
    });
  }

  private getListaTramites(): void {

    this.tramitesAcademicosService.getTramitesHabilitados().pipe( takeUntil( this.unsubscribe$ ) ).subscribe( listaTramitesAcademicos => {
      this.listaTramites = listaTramitesAcademicos.data as Array<TramiteModel>;
    });
  }

  onChangeSlideToggleValue( event: MatSlideToggleChange ): void {
    this.activado = event.checked;
  }

  onSaveTramite(): void {
    const rangoFechas = this.formTramite.controls['rangoFechaGroup'].value;
    const fechaIncial = rangoFechas.fechaInicial;
    const fechaFinal  = rangoFechas.fechaFinal;

    const habilitacionTramiteInsert: HabilitacionTramiteModelInsert = {
      fechaInicial: fechaIncial,
      fechaFinal  : fechaFinal,
      estado      : +this.activado, // Habilitado por default
      gestion     : new Date().getFullYear(),
      idTramite   : this.formTramite.controls['idTramite'].value
    };

    this.tramiteService.insertHabilitaconTramite( habilitacionTramiteInsert ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( respInsert => {
      this.onClose(respInsert);
    });

  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
