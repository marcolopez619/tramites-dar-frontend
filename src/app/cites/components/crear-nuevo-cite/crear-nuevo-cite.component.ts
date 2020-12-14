import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoTramiteModel, RemitenteModel, DestinatarioModel } from '../../../hoja-de-ruta/models/hoja-de-ruta.model';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { UsuarioModel } from '../../../shared/models/Usuario.model';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

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

  listaVias: Array<RemitenteModel> = [
    { idRemitente: 1, descripcionRemitente: 'ZORRINNO CATARI ALBERTO' },
    { idRemitente: 2, descripcionRemitente: 'ZUNAGUA SARDINA LEILA' }
  ];

  listaDestinatarios: Array<DestinatarioModel> = [
    { idDestinatario: 1, descripcionDestinatario: 'CACHICATARI JUAN GONZALO' },
    { idDestinatario: 2, descripcionDestinatario: 'SALMON HUALLPA OZUNA' }
  ];

  listaRemitentes: Array<DestinatarioModel> = [
    { idDestinatario: 1, descripcionDestinatario: 'PRIMIR REMITENTE' },
    { idDestinatario: 2, descripcionDestinatario: 'SEGUNDO REMITENTE' }
  ];

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

    $event.forEach( element => {
      console.log( ' VIAS : ---> ' + ( element as UsuarioModel ).nombreCompleto );
    });
  }

  getListaSeleccionadaDestinatarios($event): void {
    console.log('----------------------');

    $event.forEach( element => {
      console.log( ' Destinatario ---> ' + ( element as UsuarioModel ).nombreCompleto );
    });
  }

  getListaSeleccionadaRemitentes($event): void {
    console.log('----------------------');

    $event.forEach( element => {
      console.log( 'Remitente ---> ' + ( element as UsuarioModel ).nombreCompleto );
    });
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
