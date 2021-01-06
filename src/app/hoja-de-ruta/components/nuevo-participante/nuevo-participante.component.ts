import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { UsuarioModel } from '../../../shared/models/Usuario.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-nuevo-participante',
  templateUrl: './nuevo-participante.component.html',
  styleUrls: ['./nuevo-participante.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class NuevoParticipanteComponent extends BaseComponent implements OnInit {

  formAnadirNuevoParticipante: FormGroup;
  listaUsuarios: Array<UsuarioModel> = [];
  listaParcitipantesSelected : Array<UsuarioModel> = [];


  private _isParticipanteInvalid: boolean;
  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public contextService: ContextoService,
    public langService: LangService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder
  ) { super(); }

  ngOnInit(): void {
    // Carga los usuarios de la bd
    const idTipoTramite = 1;
    this.getAllusuarios( idTipoTramite );

    this.formAnadirNuevoParticipante = this.formBuilder.group({
      listaParticipantes: [undefined, [Validators.compose([ Validators.required])]],
      descripcion       : [ undefined, [Validators.compose( [ Validators.required, Validators.minLength(5), Validators.maxLength(50) ])] ]
    });
  }

  private getAllusuarios( idTipotramite: number ): void {
    this.usuarioService.getAllUsuarios( idTipotramite ).pipe( takeUntil(this.unsubscribe$)).subscribe( usuarios => {;
      this.listaUsuarios = usuarios.data;
    });
  }

  getEstatusFormDestinatario($event): void {
    this._isParticipanteInvalid = $event;
    console.log( ' is Invalid participante : ' + $event );
  }

  getListaSeleccionadaDestinatarios($event): void {
    this.listaParcitipantesSelected = $event as Array<UsuarioModel>;

    this.listaParcitipantesSelected.forEach( element => {
      console.log( ' Participante ---> ' + element.nombreCompleto );
    });

    this.formAnadirNuevoParticipante.controls['listaParticipantes'].setValue( (this._isParticipanteInvalid) ? undefined : this.listaParcitipantesSelected );
  }

  onSave(): void {
    console.log(`GUARDANDO PARTICIPANTESSSSSSSSSSSSS`);
    const listaIdParticipantes = this.listaParcitipantesSelected.map( x => x.idPersonaGd );
    console.log( `lista participantes : ${JSON.stringify(listaIdParticipantes)}`);
    console.log( `lista participantes : ${this.formAnadirNuevoParticipante.controls['descripcion'].value}`);
  }

  onEdit(): void {
    console.log(`EDITANDO PARTICIPANTESSSSSSSSSSSSS`);

  }

  onCancel(): void {
      this.dialogRef.close();
  }

}
