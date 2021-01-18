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

@Component({
  selector: 'derivar',
  templateUrl: './derivar.component.html',
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class DerivarComponent extends BaseComponent implements OnInit {
  listaUsuarios: Array<UsuarioModel> = [];
  listaCite: Array<CiteModelByUsuario> = [];

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public contextService: ContextoService,
    public langService: LangService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private citesService: CitesService,
    private hojaRutaService: HojaDeRutaService
  ) {
    super();
  }

  ngOnInit(): void {
    this.hojaRutaSelected = this.data.hojaRutaSelected as HojaRutaBandejaModel;
    this.vNumeroHojaRuta=this.hojaRutaSelected.numeroHojaRuta;

    this.listaInicialDestinatarios.push({
      idPersonaGd: this.hojaRutaSelected.idDestinatario,
      nombreCompleto: this.hojaRutaSelected.nombreDestinatario
    });

    const idPersonaGd = this.contextService.getItemContexto(`idPersonaGd`) ?? 542;

    if ( this.hojaRutaSelected.estado === 'creado' ) {
      this.listaCite.push({
          idCite    : this.hojaRutaSelected.idCite,
          numeroCite: this.hojaRutaSelected.cite
        });
    }
    if ( this.hojaRutaSelected.idCite <= 0 ) {
      this.getAllCitesFromPersona( idPersonaGd );
    }

    // this.getHojaRutaInstructiva();
    this.getAllusuarios( 1 );

    this.formDerivarHR = this.formBuilder.group({
      idDestinatario: [this.hojaRutaSelected.idDestinatario, Validators.compose([ Validators.required ])],
      idCite        : [this.hojaRutaSelected.idCite <= 0 ? undefined : this.hojaRutaSelected.idCite, Validators.compose([Validators.required])],
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
      this.listaCite.length = 0;
      this.listaCite = [];
      this.formDerivarHR.controls[ 'idCite' ].setValue( undefined );
      this.formDerivarHR.controls[ 'idCite' ].updateValueAndValidity();
    } else {
      // Carga los cites disponibles de la persona loggeada
      const idPersonaGd = this.contextService.getItemContexto(`idPersonaGd`) ?? 542;
      this.getAllCitesFromPersona( idPersonaGd );
    }

  }


  saveDerivar(): void {

    // Recupera el idPersonaGD, primeramente de la lista autocomplete, sino lo encuentra toma el dato de la Hoja de ruta seleccionada
    const idPersonaDestinatario = this.listaDestinatarios.map( x => x.idPersonaGd )[ 0 ];
    const idPersonaDestinatarioFromHR = this.formDerivarHR.controls[ 'idDestinatario' ].value;

    const datosFormulario: HojaRutaDerivaModel = {
      IdHojaDeRuta   : this.data.hojaRutaSelected.idHojaRuta,
      IdPersonaGb    : idPersonaDestinatario ?? idPersonaDestinatarioFromHR,
      Asunto         : this.formDerivarHR.controls['instructiva'].value,
      PlazoDias      : this.data.hojaRutaSelected.plazo,
      Urgente        : this.data.hojaRutaSelected.urgente,
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
