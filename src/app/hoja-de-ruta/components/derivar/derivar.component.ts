import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { CitesService } from '../../../cites/cites.service';
import { CiteModelByUsuario } from '../../../cites/models/cites.models';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { UsuarioModel } from '../../../shared/models/Usuario.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { DocumentoAdjuntoService } from '../../../shared/services/documento-adjunto.service';
import { LangService } from '../../../shared/services/lang.service';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { HojaDeRutaService } from '../../hoja-de-ruta.service';
import { DerivarModel } from '../../models/derivar.model';
import { HojaRutaDerivaModel } from '../../models/hoja-ruta-deriva.model';
import { InstructivaModel } from '../../models/instructiva.model';
//import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { HojaRutaBandejaModel } from '../../models/hoja-de-ruta.model';

@Component({
  selector: 'derivar',
  templateUrl: './derivar.component.html',
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class DerivarComponent extends BaseComponent implements OnInit {
  listaUsuarios: Array<UsuarioModel> = [];
  listaCite: Array<CiteModelByUsuario> = [];

  private _isDestinatarioInvalid: boolean;
  private hojaRutaSelected: HojaRutaBandejaModel;

  longMaxDescripcion = 500;
  formDerivarHR: FormGroup;
  listaDestinatarios: Array<UsuarioModel> = [];
  dataSource = new MatTableDataSource<CiteModelByUsuario>([]);
  vListaInstructiva: Array<InstructivaModel> = [];
  vListaInstructivaAux: Array<InstructivaModel> = [];
  listaInicialDestinatarios: Array<UsuarioModel> = [];
  instructiva: string;
  filteredOptions: Observable<string>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public contextService: ContextoService,
    public langService: LangService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private citesService: CitesService,
    private documentoAdjuntoService: DocumentoAdjuntoService,
    private hojaRutaService: HojaDeRutaService
  ) {
    super();
  }

  ngOnInit(): void {
    this.hojaRutaSelected = this.data.hojaRutaSelected as HojaRutaBandejaModel;

    const idPersonaGd = this.contextService.getItemContexto(`idPersonaGd`) ?? 542;

    if ( this.hojaRutaSelected.estado === 'creado' ) {
      this.listaCite = [{
          idCite    : this.hojaRutaSelected.idCite,
          numeroCite: this.hojaRutaSelected.cite
        }];
    } else {
      this.getAllCitesFromPersona( idPersonaGd );
    }

    this.getHojaRutaInstructiva();
    const idTipoTramite = 1;
    this.getAllusuarios(idTipoTramite);

    this.listaInicialDestinatarios = [{ nombreCompleto: this.hojaRutaSelected.nombreDestinatario,
                                        idPersonaGd: this.hojaRutaSelected.idDestinatario }];

    this.formDerivarHR = this.formBuilder.group({
      listaCite        : [this.listaCite[0].idCite, Validators.compose([Validators.required])],
      vListaInstructiva: [undefined, Validators.compose([Validators.required])],
      instructiva      : [this.hojaRutaSelected.asunto, Validators.compose([Validators.required])]
    });
  }
/*
  displayFn(user: InstructivaModel): string {
    return user && user.instructiva ? user.instructiva : '';
  }*/

  private getAllusuarios(idTipotramite: number): void {
    // Borra los datos de las listas
    this.listaDestinatarios.length = this.listaUsuarios.length = 0;

    this.usuarioService
      .getAllUsuarios(idTipotramite)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((respService) => {
        this.listaUsuarios = respService.data;
      });
  }

  getListaSeleccionadaInstructiva($event): void {
    this.vListaInstructivaAux = $event as Array<InstructivaModel>;
    this.formDerivarHR.controls['vListaInstructivaAux'].setValue(
      this.vListaInstructivaAux
    );
  }

  private getHojaRutaInstructiva(): void {
    this.hojaRutaService.getHojaRutaInstructiva().pipe( takeUntil( this.unsubscribe$ )).subscribe( vResultado => {
      this.vListaInstructiva = vResultado.data as Array<InstructivaModel>;
      const algo = this.vListaInstructiva;
    });
  }

  getEstatusFormDestinatario($event): void {
    this._isDestinatarioInvalid = $event;
    console.log(' is Invalid Destinatario : ' + $event);
  }

  getListaSeleccionadaDestinatarios($event): void {
    console.log('----------------------');
    this.listaDestinatarios = $event as Array<UsuarioModel>;

    this.listaDestinatarios.forEach((element) => {
      console.log(' Destinatario ---> ' + element.nombreCompleto);
    });

    this.formDerivarHR.controls['listaDestinatarios'].setValue(
      this._isDestinatarioInvalid ? undefined : this.listaDestinatarios
    );
  }

  private getAllCitesFromPersona( idPersonaGd: number ): void {
    this.citesService.getAllCitesFromPersona( idPersonaGd ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( listaCitesPersona => {
      this.listaCite = listaCitesPersona.data as Array<CiteModelByUsuario>;
    });
  }

  saveDerivar(): void {
    const objDatosFormulario: any = this.formDerivarHR.value;
    const vObjHojaRuta                         = this.data.hojaRutaSelected;
    const datosFormulario: HojaRutaDerivaModel = {};
    datosFormulario.IdHojaDeRuta         = vObjHojaRuta.idHojaRuta;
    datosFormulario.IdPersonaGb          = vObjHojaRuta.idDestinatario;
    datosFormulario.Asunto               = this.formDerivarHR.controls['instructiva'].value;
    datosFormulario.PlazoDias            = vObjHojaRuta.plazo;
    datosFormulario.Urgente              = vObjHojaRuta.urgente;
    datosFormulario.UsuarioBitacora      = this.contextService.getItemContexto('samActName');

    this.hojaRutaService
      .createHojaRutaDeriva(datosFormulario)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        this.dialogRef.close(result);
      });

  }

  cancelar(): void {
    this.dialogRef.close(undefined);
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }
}
