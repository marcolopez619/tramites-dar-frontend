import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { CitesService } from '../../../cites/cites.service';
import { CiteModelByUsuario } from '../../../cites/models/cites.models';
import {
  fadeInAnim,
  slideInLeftAnim
} from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { DataDocumentoAdjunto } from '../../../shared/models/documento-adjunto.model';
import { UsuarioModel } from '../../../shared/models/Usuario.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { DocumentoAdjuntoService } from '../../../shared/services/documento-adjunto.service';
import { LangService } from '../../../shared/services/lang.service';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { DerivarModel } from '../../models/derivar.model';

@Component({
  selector: 'derivar',
  templateUrl: './derivar.component.html',
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class DerivarComponent extends BaseComponent implements OnInit {
  listaUsuarios: Array<UsuarioModel> = [];
  listaCite: Array<CiteModelByUsuario> = [];

  longMaxDescripcion = 500;
  formDerivarHR: FormGroup;
  private _isDestinatarioInvalid: boolean;
  listaDestinatarios: Array<UsuarioModel> = [];
  dataSource = new MatTableDataSource<CiteModelByUsuario>([]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public contextService: ContextoService,
    public langService: LangService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private citesService: CitesService,
    private documentoAdjuntoService: DocumentoAdjuntoService
  ) {
    super();
  }

  ngOnInit(): void {

    const idPersonaGd = this.contextService.getItemContexto(`idPersonaGd`) ?? 542;
    this.getAllCitesFromPersona( idPersonaGd );
    const dataForm: DerivarModel = {};

    // Carga los usuarios de la bd
    const idTipoTramite = 1;
    this.getAllusuarios(idTipoTramite);

    this.formDerivarHR = this.formBuilder.group({
      listaDestinatarios: [undefined, Validators.compose([Validators.required])]
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

  save(): void {
    const data: DataDocumentoAdjunto = {
      startSaveDocuments : true,
      datosAdicionales : undefined
    };
    this.documentoAdjuntoService.sendFlagToSaveDocument( data );
    const datosFormulario: DerivarModel = { };

  }

  cancelar(): void {
    this.dialogRef.close(undefined);
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }
}
