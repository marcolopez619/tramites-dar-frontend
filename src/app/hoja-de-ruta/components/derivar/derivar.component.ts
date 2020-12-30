import { Component, Inject, OnInit, Output, EventEmitter } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import {
  fadeInAnim,
  slideInLeftAnim,
} from "../../../shared/animations/template.animation";
import { BaseComponent } from "../../../shared/base.component";
import { ComentarioModel } from "../../../shared/models/comentario.model";
import { UsuarioModel } from "../../../shared/models/Usuario.model";
import { ComentarioService } from "../../../shared/services/comentario.service";
import { ContextoService } from "../../../shared/services/contexto.service";
import { LangService } from "../../../shared/services/lang.service";
import { UsuarioService } from "../../../shared/services/usuario.service";
import { DerivarModel } from "../../models/derivar.model";

@Component({
  selector: "derivar",
  templateUrl: "./derivar.component.html",
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: "container-fluid", "[@fadeInAnim]": "true" },
})
export class DerivarComponent extends BaseComponent implements OnInit {
  listaUsuarios: Array<UsuarioModel> = [];
  longMaxDescripcion = 500;
  formDerivarHR: FormGroup;
  private _isDestinatarioInvalid: boolean;
  listaDestinatarios: Array<UsuarioModel> = [];
  listaCite: Array<DerivarModel> = [
    { IdCite: 1, DescripcionCite: 'SEGIP/NDAF/INF/011-2020' },
    { IdCite: 2, DescripcionCite: 'SEGIP/NDAF/XXX/012-2020' },
    { IdCite: 3, DescripcionCite: 'SEGIP/NDAF/YYY/013-2020' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public contextService: ContextoService,
    public langService: LangService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) //private comentarioService: ComentarioService
  {
    super();
  }

  ngOnInit(): void {
    /*
    const listaFuncionario: Array<string> = [ 'SARDINA GUMUCIO FLORIPONDIO', 'CONDORI GUMER TITO', 'JUAN JOSE PEREZ CASTILLO' ];
    */
    const listaCite: Array<string> = [ 'SEGIP/NDAF/INF/011-2020', 'SEGIP/NDAF/DOC/012-2020', 'SEGIP/NDAF/XXX/013-2020' ];

    const dataForm: DerivarModel = {};

    // Carga los usuarios de la bd
    const idTipoTramite = 1;
    this.getAllusuarios(idTipoTramite);

    this.formDerivarHR = this.formBuilder.group({
      listaDestinatarios: [undefined, Validators.compose([Validators.required])],
      listaCite: [ 'SEGIP/NDAF/INF/011-2020', 'SEGIP/NDAF/DOC/012-2020', 'SEGIP/NDAF/XXX/013-2020' ]
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
    console.log(" is Invalid Destinatario : " + $event);
  }

  getListaSeleccionadaDestinatarios($event): void {
    console.log("----------------------");
    this.listaDestinatarios = $event as Array<UsuarioModel>;

    this.listaDestinatarios.forEach((element) => {
      console.log(" Destinatario ---> " + element.nombreCompleto);
    });

    this.formDerivarHR.controls["listaDestinatarios"].setValue(
      this._isDestinatarioInvalid ? undefined : this.listaDestinatarios
    );
  }

  save(): void {

    const datosFormulario: DerivarModel = { };
    //datosFormulario.idDerivacion = 1;
    // TODO: Logica para guardar la derivacion de la hoja de ruta.
    //this.comentarioService.insertComentario(datosFormulario).pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
    //});
  }

  cancelar(): void {
    this.dialogRef.close(undefined);
  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }
}
