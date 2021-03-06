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
import { AutocompleteData } from '../../../shared/models/autocomplete.model';
import { UsuarioModel } from '../../../shared/models/Usuario.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { HojaDeRutaService } from '../../hoja-de-ruta.service';
import { HojaRutaBandejaModel } from '../../models/hoja-de-ruta.model';
import { HojaRutaDerivaModel } from '../../models/hoja-ruta-deriva.model';
import { InstructivaModel } from '../../models/instructiva.model';
import { ListaDocumentosAdjuntos } from '../../../shared/models/documento-adjunto.model';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { NotificacionService } from '../../../shared/services/notificacion.service';
import { eTipoNotificacion } from '../../../shared/enums/tipo-notificacion.enum';

@Component({
  selector: 'derivar',
  templateUrl: './derivar.component.html',
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class DerivarComponent extends BaseComponent implements OnInit {
  listaUsuarios: Array<UsuarioModel> = [];
  listaCite: Array<CiteModelByUsuario> = [];
  listaDocumentosAdjuntos: string;

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
  vNumeroHojaRuta: string;
  showAllDocAdj: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public contextService: ContextoService,
    public langService: LangService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private notificacionService: NotificacionService,
    private citesService: CitesService,
    private hojaRutaService: HojaDeRutaService
  ) {
    super();
  }

  ngOnInit(): void {
    this.hojaRutaSelected = this.data.hojaRutaSelected as HojaRutaBandejaModel;
    this.vNumeroHojaRuta = this.hojaRutaSelected.numeroHojaRuta;
    const idPersonaGd = this.contextService.getItemContexto(`idPersonaGd`) ?? 542;

    if ( this.hojaRutaSelected.estado.toUpperCase() == 'CREADO' || this.hojaRutaSelected.estado.toUpperCase() == 'EN ATENCION') {
      this.listaCite.push({
          idCite    : this.hojaRutaSelected.idCite,
          numeroCite: this.hojaRutaSelected.cite
        });
    }

    this.getAllCitesFromPersona( idPersonaGd );

    this.getAllusuarios( 1 );

    this.formDerivarHR = this.formBuilder.group({
      idDestinatario: [undefined, Validators.compose([ Validators.required ])],
      // idCite        : [this.hojaRutaSelected.idCite <= 0 ? undefined : this.hojaRutaSelected.idCite, Validators.compose([Validators.required])],
      idCite        : [this.hojaRutaSelected ? this.hojaRutaSelected.idCite : undefined],
      instructiva   : [this.hojaRutaSelected.asunto, Validators.compose([Validators.required])]
    });
  }

  private getAllusuarios(idTipotramite: number): void {
    // Borra los datos de las listas
    this.listaDestinatarios.length = this.listaUsuarios.length = 0;

    this.usuarioService
      .getAllUsuarios(idTipotramite)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((respService) => {
        this.listaUsuarios = respService.data;

        if (this.hojaRutaSelected.estado.toUpperCase() == 'CREADO') {
          const destinatario = this.listaUsuarios.find( x => x.idPersonaGd === this.hojaRutaSelected.idDestinatario );
          this.listaInicialDestinatarios.push( destinatario );
          this.formDerivarHR.controls['idDestinatario'].setValue( destinatario.idPersonaGd );
        }
      });
  }

  private getHojaRutaInstructiva(): void {
    this.hojaRutaService.getHojaRutaInstructiva().pipe( takeUntil( this.unsubscribe$ )).subscribe( vResultado => {
      this.vListaInstructiva = vResultado.data as Array<InstructivaModel>;
    });
  }

  private getAllCitesFromPersona( idPersonaGd: number ): void {
    this.citesService.getAllCitesFromPersona( idPersonaGd ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( listaCitesPersona => {
      this.listaCite = listaCitesPersona.data as Array<CiteModelByUsuario>;
    });
  }

  private getListaDocumentosAdjuntos(): void {
    this.listaDocumentosAdjuntos = this.hojaRutaSelected.listaAdjuntos; // JSON.parse(this.hojaRutaSelected.listaAdjuntos) as Array<ListaDocumentosAdjuntos>;
  }

  onChangeSlideToggleValue(event:  MatSlideToggleChange ): void {
    this.showAllDocAdj = event.checked;

    if (this.showAllDocAdj) {
      this.getListaDocumentosAdjuntos();
    } else {
      this.listaDocumentosAdjuntos = '';
    }
  }

  getListaSeleccionadaInstructiva($event): void {
    this.vListaInstructivaAux = $event as Array<InstructivaModel>;
    this.formDerivarHR.controls['vListaInstructivaAux'].setValue(
      this.vListaInstructivaAux
    );
  }

  getEstatusFormDestinatario(isInvalid: boolean): void {
    // this.formDerivarHR.controls[ 'destinatario' ].setValue( isInvalid ? undefined : true );
  }

  getListaSeleccionadaDestinatarios(data: AutocompleteData): void {
    this.listaDestinatarios = data.listaSeleccionados;

    if (this.listaDestinatarios.length === 0 ) {
      this.formDerivarHR.controls[ 'idDestinatario' ].setValue( undefined );
      this.formDerivarHR.controls[ 'idDestinatario' ].updateValueAndValidity();
    } else {
      this.formDerivarHR.controls[ 'idDestinatario' ].setValue( this.listaDestinatarios[ 0 ].idPersonaGd );
    }

  }

  saveDerivar(): void {

    // Recupera el idPersonaGD, primeramente de la lista autocomplete, sino lo encuentra toma el dato de la Hoja de ruta seleccionada
    const idPersonaDestinatario = this.listaDestinatarios.map( x => x.idPersonaGd )[ 0 ];
    const idPersonaDestinatarioFromHR = this.formDerivarHR.controls[ 'idDestinatario' ].value;
    const idPersonaGdLogeado = this.contextService.getItemContexto(`idPersonaGd`);

    if ( idPersonaDestinatario === idPersonaGdLogeado || idPersonaDestinatarioFromHR === idPersonaGdLogeado || !idPersonaGdLogeado ) {
      this.notificacionService.showSnackbarMensaje( 'NO SE PUEDE DERIVAR A SI MISMO', 4000, eTipoNotificacion.Informativo );
      return;
    }

    const idCiteRecuperado = this.formDerivarHR.controls['idCite'].value;

    const datosFormulario: HojaRutaDerivaModel = {
      IdHojaDeRuta   : this.hojaRutaSelected.idHojaRuta,
      IdPersonaGb    : idPersonaDestinatario ?? idPersonaDestinatarioFromHR,
      Asunto         : this.formDerivarHR.controls['instructiva'].value,
      PlazoDias      : this.hojaRutaSelected.plazo,
      Urgente        : this.hojaRutaSelected.urgente,
      UsuarioBitacora: this.contextService.getItemContexto('samActName')
    };

    this.hojaRutaService
      .createHojaRutaDeriva(datosFormulario)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        this.dialogRef.close(result);
      });

  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }
}
