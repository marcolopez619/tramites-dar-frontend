import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';
import { AutocompleteData } from '../../../shared/models/autocomplete.model';
import { UsuarioModel } from '../../../shared/models/Usuario.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { LangService } from '../../../shared/services/lang.service';
import { UsuarioService } from '../../../shared/services/usuario.service';
import { HojaDeRutaService } from '../../hoja-de-ruta.service';
import { ParticipanteInsertModel } from '../../models/participante.model';

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
  listaParcitipantesSelected: Array<UsuarioModel> = [];

  private _isParticipanteInvalid: boolean;
  private _idHojaRuta: number;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public contextService: ContextoService,
    public langService: LangService,
    private usuarioService: UsuarioService,
    private hojaDeRutaService: HojaDeRutaService,
    private formBuilder: FormBuilder
  ) { super(); }

  ngOnInit(): void {

    this._idHojaRuta = this.data.idHojaRuta ?? -1;

    // Carga los usuarios de la bd
    const idTipoTramite = 1;
    this.getAllusuarios( idTipoTramite );

    this.formAnadirNuevoParticipante = this.formBuilder.group({
      listaParticipantes: [ undefined, [Validators.compose([ Validators.required])]],
      mensaje           : [ undefined, [Validators.compose( [ Validators.required, Validators.minLength(5), Validators.maxLength(100) ])] ]
    });
  }

  private getAllusuarios( idTipotramite: number ): void {
    this.usuarioService.getAllUsuarios( idTipotramite ).pipe( takeUntil(this.unsubscribe$)).subscribe( usuarios => {
      this.listaUsuarios = usuarios.data;
    });
  }

  getEstatusFromDestinatario(isInvalid : boolean): void {
    this._isParticipanteInvalid = isInvalid;
    this.formAnadirNuevoParticipante.controls[ 'listaParticipantes' ].setValue( isInvalid ? undefined: this.listaParcitipantesSelected );
  }

  getListaSeleccionadaDestinatarios(dataSelected: AutocompleteData ): void {
    this.listaParcitipantesSelected = dataSelected.listaSeleccionados;
    this.formAnadirNuevoParticipante.controls['listaParticipantes'].setValue( (this._isParticipanteInvalid) ? undefined : this.listaParcitipantesSelected );
  }

  onSave(): void {
    const listaIdPersonaGd = this.listaParcitipantesSelected.map( x => x.idPersonaGd );
    const listaIdParticipantes: Array<any> = [];

    listaIdPersonaGd.forEach(idPersonagd => {

      listaIdParticipantes.push({
        'idPersonaGd' : idPersonagd
      });

    });

    const participanteInsertModel: ParticipanteInsertModel = {
      idHojaRuta       : this._idHojaRuta,
      listParticipantes: JSON.stringify( listaIdParticipantes ),
      mensaje          : `${this.formAnadirNuevoParticipante.controls['mensaje'].value}`,
      usuarioBitacora  : `${this.contextService.getItemContexto('samActName')}`
    };

    this.hojaDeRutaService.createParticipante( participanteInsertModel ).pipe( takeUntil(this.unsubscribe$)).subscribe( respCreateParticipante => {
      console.log( `${respCreateParticipante.data}` );
      this.onClose(respCreateParticipante.data);
    });

  }

  onEdit(): void {
    console.log(`EDITANDO PARTICIPANTESSSSSSSSSSSSS`);

  }

  onClose(object?: any): void {
      this.dialogRef.close( object );
  }

}
