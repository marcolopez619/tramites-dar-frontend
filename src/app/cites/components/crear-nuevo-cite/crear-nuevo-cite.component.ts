import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { TipoTramiteModel } from '../../../hoja-de-ruta/models/hoja-de-ruta.model';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { UsuarioModel } from '../../../shared/models/Usuario.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { UsuarioService } from '../../../shared/services/usuario.service';

@Component({
  selector: 'app-crear-nuevo-cite',
  templateUrl: './crear-nuevo-cite.component.html',
  styleUrls: ['./crear-nuevo-cite.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class CrearNuevoCiteComponent extends BaseComponent implements OnInit {

  formCrearCite: FormGroup;
  secondFormGroup: FormGroup;

  listaUsuarios: Array<UsuarioModel>;

  listaTipoDocumento: Array<TipoTramiteModel> = [
    { idTipoTramite: 1, descripcionTipoTramite: 'INTERNO' },
    { idTipoTramite: 2, descripcionTipoTramite: 'EXTERNO' }
  ];

  listaVias: Array<UsuarioModel> = [];
  listaDestinatarios: Array<UsuarioModel> = [];
  listaRemitentes: Array<UsuarioModel> = [];

  private _isDestinatarioInvalid: boolean;
  private _isRemitenteInvalid: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    public contextService: ContextoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService
  ) { super(); }

  ngOnInit(): void {

    this.usuarioService.getAllUsuarios().pipe( takeUntil( this.unsubscribe$ )).subscribe( respService => {
      this.listaUsuarios = respService.data;
    });

    this.formCrearCite = this.formBuilder.group({
      tipoDocumento     : [undefined, Validators.compose([Validators.required])],
      // listaVias         : [undefined],
      listaDestinatarios: [undefined, Validators.compose([Validators.required])],
      listaRemitentes   : [undefined, Validators.compose([Validators.required])],
      referencia        : [undefined, Validators.compose([Validators.required])]
    });

    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  getListaSeleccionadaVias($event): void {
    console.log('----------------------');

    this.listaVias = $event as Array<UsuarioModel>;

    this.listaVias.forEach( element => {
      console.log( ' VIAS : ---> ' + ( element as UsuarioModel ).nombreCompleto );
    });
  }

  getListaSeleccionadaDestinatarios($event): void {
    console.log('----------------------');
    this.listaDestinatarios = $event as Array<UsuarioModel>;

    this.listaDestinatarios.forEach( element => {
      console.log( ' Destinatario ---> ' + element.nombreCompleto );
    });

    this.formCrearCite.controls['listaDestinatarios'].setValue( (this._isDestinatarioInvalid) ? undefined : this.listaDestinatarios );
  }

  getListaSeleccionadaRemitentes($event): void {
    console.log('----------------------');
    this.listaRemitentes = $event as Array<UsuarioModel>;

    this.listaRemitentes.forEach( element => {
      console.log( 'Remitente ---> ' + element.nombreCompleto );
    });

    this.formCrearCite.controls['listaRemitentes'].setValue( (this._isRemitenteInvalid) ? undefined : this.listaRemitentes );
  }

  getEstatusFormDestinatario($event): void {
    this._isDestinatarioInvalid = $event;
    console.log( ' is Invalid Destinatario : ' + $event );
  }
  getEstatusFormRemitente($event): void {
    this._isRemitenteInvalid = $event;
    console.log( ' is Invalid Remitente : ' + $event );
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
