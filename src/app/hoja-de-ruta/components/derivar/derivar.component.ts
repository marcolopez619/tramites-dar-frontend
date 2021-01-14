import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { map, startWith } from 'rxjs/operators';
import { CitesService } from '../../../cites/cites.service';
import { CiteModelByUsuario } from '../../../cites/models/cites.models';
import { fadeInAnim, slideInLeftAnim} from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { DataDocumentoAdjunto } from '../../../shared/models/documento-adjunto.model';
import { HojaDeRutaInsertModel } from '../../../shared/models/hoja-de-ruta.model';
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


@Component({
  selector: 'derivar',
  templateUrl: './derivar.component.html',
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class DerivarComponent extends BaseComponent implements OnInit {
  listaUsuarios: Array<UsuarioModel> = [];
  listaCite: Array<CiteModelByUsuario> = [];
  //myControl = new FormControl();

  longMaxDescripcion = 500;
  formDerivarHR: FormGroup;
  private _isDestinatarioInvalid: boolean;
  listaDestinatarios: Array<UsuarioModel> = [];
  dataSource = new MatTableDataSource<CiteModelByUsuario>([]);
  vListaInstructiva: Array<InstructivaModel>=[];
  vListaInstructivaAux: Array<InstructivaModel>=[];
  listaInicialDestinatarios: Array<UsuarioModel> = [];
  instructiva: string;
  //vListaInstructiva: InstructivaModel;

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
  filteredOptions: Observable<string[]>;
  ngOnInit(): void {
    var vObjHojaRuta = this.data.hojaRutaSelected;

    const idPersonaGd = this.contextService.getItemContexto(`idPersonaGd`) ?? 542;

    if(vObjHojaRuta.estado=="creado"){
      this.listaCite=[{idCite: vObjHojaRuta.idCite,
                   numeroCite:vObjHojaRuta.cite}]
    }
    else{
      this.getAllCitesFromPersona( idPersonaGd );
    }

    this.getHojaRutaInstructiva();
    const dataForm: DerivarModel = {};
    const idTipoTramite = 1;
    this.getAllusuarios(idTipoTramite);

    this.listaInicialDestinatarios = [{ nombreCompleto: vObjHojaRuta.nombreDestinatario,
                                        idPersonaGd: vObjHojaRuta.idDestinatario }];

    this.formDerivarHR = this.formBuilder.group({
      listaCite        : [this.listaCite[0].idCite, Validators.compose([Validators.required])],
      vListaInstructiva: [undefined, Validators.compose([Validators.required])],
      instructiva      : [vObjHojaRuta.asunto, Validators.compose([Validators.required])],
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
    console.log('----------------------');
    this.vListaInstructivaAux = $event as Array<InstructivaModel>;

    this.vListaInstructivaAux.forEach((element) => {
      console.log('Remitente ---> ' + element.instructiva);
    });
    this.formDerivarHR.controls['vListaInstructivaAux'].setValue(
      this.vListaInstructivaAux
    );
  }

  private getHojaRutaInstructiva(): void {
    this.hojaRutaService.getHojaRutaInstructiva().pipe( takeUntil( this.unsubscribe$ )).subscribe( vResultado => {
      this.vListaInstructiva = vResultado.data as Array<InstructivaModel>;
      var algo=this.vListaInstructiva;
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
    var vObjHojaRuta                         = this.data.hojaRutaSelected;
    let datosFormulario: HojaRutaDerivaModel = {};
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
