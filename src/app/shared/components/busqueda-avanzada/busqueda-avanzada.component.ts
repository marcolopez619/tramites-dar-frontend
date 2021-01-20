import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { slideInLeftAnim, zoomInAnim, fadeInAnim } from '../../animations/template.animation';
import { BaseComponent } from '../../base.component';
import { BusquedaAvanzadaModel, BusquedaAvanzadaResult } from '../../models/busqueda-avanzada.model';
import { OpcionesBandejaDefault } from '../../models/opciones-bandeja.model';
import { TipoDocumentoModel, TipoTramiteModel } from '../../models/parametricas.model';
import { UsuarioModel } from '../../models/Usuario.model';
import { ContextoService } from '../../services/contexto.service';
import { LangService } from '../../services/lang.service';
import { ParametricaService } from '../../services/parametrica.service';
import { UsuarioService } from '../../services/usuario.service';
import { BusquedaService } from '../../services/busqueda.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'sh-busqueda-avanzada',
  templateUrl: './busqueda-avanzada.component.html',
  animations: [zoomInAnim, slideInLeftAnim, fadeInAnim],
  host: { class: 'container-fluid', '[@zoomInAnim]': 'true', '[@fadeInAnim]': 'true'}
})

export class BusquedaAvanzadaComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['hojaRuta', 'tipoRemitente', 'remitente', 'tipoDocumento', 'numeroCite', 'destinatario', 'referencia', 'fecha', 'estado'];
  dataSource = new MatTableDataSource<BusquedaAvanzadaResult>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  formBusquedaAvanzada: FormGroup;

  listaTipoDocumento: Array<TipoDocumentoModel> = [];
  listaDestinatarios: Array<UsuarioModel> = [];
  listaRemitentes: Array<UsuarioModel> = [];
  listaTipoTramite: Array<TipoTramiteModel> = [];
  listaUsuarios: Array<UsuarioModel> = [];

  listaTipobandeja: Array<string> = [ 'Todos' ];

  fechaLimiteSuperior = new Date();
  fechaLimiteInferior = new Date( this.fechaLimiteSuperior.getFullYear() - 1, 0, 1);

  constructor(
    public contextService: ContextoService,
    public langService: LangService,
    private formBuilder: FormBuilder,
    private parametricaService: ParametricaService,
    private usuarioService: UsuarioService,
    private busquedaService: BusquedaService
  ) {
    super();
  }

  ngOnInit(): void {
    const idUnidadDir = this.contextService.getItemContexto('idUnidadDir');
    const idUnidadJef = this.contextService.getItemContexto('idUnidadJef');
    const idUnidadOrg = Number( idUnidadJef && idUnidadJef >= 0 ? idUnidadJef : idUnidadDir );
    const idPersonaGD = this.contextService.getItemContexto('idPersonaGd') ?? 542;

    this.parametricaService.getTipoDocumentos( idUnidadOrg ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( listaTipoDocs => {
      this.listaTipoDocumento = listaTipoDocs.data as Array<TipoDocumentoModel>;
    });

    // Carga los usuarios de la bd
    const idTipoTramite = 1;
    this.getAllusuarios(idTipoTramite);

    this.fillTipoBandejaOptions();

    this.formBusquedaAvanzada = this.formBuilder.group({
      idPersonaLogin : [ idPersonaGD ],
      hojaRuta       : [ undefined ],
      numeroCite     : [ undefined ],
      idTipoDocumento: [ 0, Validators.compose([Validators.required])],
      referencia     : [ undefined ],
      idDestinatario : [ 0 ],
      idRemitente    : [ 0 ],
      rangoFechaGroup: this.formBuilder.group({
        fechaInicial: [ new Date() ],
        fechaFinal  : [ new Date() ]
      }),
      idTipoBandeja: [ 0 ]
    });
  }

  ngAfterViewInit(): void {
    if (this.dataSource !== undefined) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  private setFormDefaultValues(): void{
    const idPersonaGD = this.contextService.getItemContexto('idPersonaGd') ?? 542;

    this.formBusquedaAvanzada.controls[ 'idPersonaLogin' ].setValue( idPersonaGD );
    this.formBusquedaAvanzada.controls[ 'idTipoDocumento' ].setValue( 0 );
    this.formBusquedaAvanzada.controls[ 'idDestinatario' ].setValue( 0 );
    this.formBusquedaAvanzada.controls[ 'idRemitente' ].setValue( 0 );
    this.formBusquedaAvanzada.controls[ 'rangoFechaGroup' ].setValue( {
      fechaInicial : new Date(),
      fechaFinal : new Date()
    } );
    this.formBusquedaAvanzada.controls[ 'idTipoBandeja' ].setValue( 0 );

  }

  private getAllusuarios( idTipotramite: number ): void {
    // Borra los datos de las listas
    this.listaDestinatarios.length = this.listaRemitentes.length = this.listaUsuarios.length = 0;

    this.usuarioService.getAllUsuarios( idTipotramite ).pipe( takeUntil( this.unsubscribe$ )).subscribe( respService => {
      this.listaUsuarios = respService.data;
    });
  }

  private fillTipoBandejaOptions(): void {
    OpcionesBandejaDefault.LISTA_OPCIONES_BANDEJA.forEach(element => {
      element.children.forEach(children => {

        if (element.displayName !== 'CITES' && element.displayName !== 'OPCIONES' && children.children === undefined  ) {
          this.listaTipobandeja.push( children.displayName );
        }
      });
    });

  }

  getEstatusFormDestinatario(event: any): void {
    console.log( ' is Invalid Destinatario : ' + event );
  }

  getListaSeleccionadaDestinatarios(event): void {
    this.listaDestinatarios = event as Array<UsuarioModel>;
    const idDestinatario = this.listaDestinatarios.map( x => x.idPersonaGd )[ 0 ];
    this.formBusquedaAvanzada.controls[ 'idDestinatario' ].setValue( idDestinatario );
  }

  getListaSeleccionadaRemitentes($event): void {
    this.listaRemitentes = $event as Array<UsuarioModel>;
    const idRemitente = this.listaRemitentes.map( x => x.idPersonaGd )[ 0 ];
    this.formBusquedaAvanzada.controls[ 'idRemitente' ].setValue( idRemitente );
  }

  onBuscar(): void {
    const idPersonaGD = this.contextService.getItemContexto('idPersonaGd') ?? 542; // FIXME: DATO QUEMADO CUANDO ES NULL.
    const rangoFechas = this.formBusquedaAvanzada.controls['rangoFechaGroup'].value;
    const fechaIncialRecuperada = rangoFechas.fechaInicial;
    const fechaFinalRecuperada  = rangoFechas.fechaFinal;

    const criterioBusqueda: BusquedaAvanzadaModel = {
      idPersonaLogin : this.formBusquedaAvanzada.controls['idPersonaLogin'].value ?? idPersonaGD,
      hojaRuta       : this.formBusquedaAvanzada.controls['hojaRuta'].value,
      numeroCite     : this.formBusquedaAvanzada.controls['numeroCite'].value,
      idDocumentoTipo: this.formBusquedaAvanzada.controls['idTipoDocumento'].value,
      referencia     : this.formBusquedaAvanzada.controls['referencia'].value,
      idDestinatario : this.formBusquedaAvanzada.controls['idDestinatario'].value,
      idRemitente    : this.formBusquedaAvanzada.controls['idRemitente'].value,
      fechaInicio    : fechaIncialRecuperada,
      fechaFinal     : fechaFinalRecuperada
      // idBandeja      : this.formBusquedaAvanzada.controls['idTipoBandeja'].value
    };

    console.log(` Criterios de busqueda: --> ${JSON.stringify(criterioBusqueda)}`);

    this.busquedaService.buscar(criterioBusqueda).pipe( takeUntil(this.unsubscribe$)).subscribe( respBusqueda => {
      console.log(`${respBusqueda.data}`);

      if (respBusqueda.data !== null ) {
        this.dataSource.data = respBusqueda.data as Array<BusquedaAvanzadaResult>;
      } else {
        this.dataSource.data.length = 0;
        this.dataSource.data = [];
      }
    });

  }

  onLimpiarFormulario(): void {
    this.dataSource.data = [];
    this.dataSource.data.length = 0;
    this.formBusquedaAvanzada.reset();
    this.formBusquedaAvanzada.updateValueAndValidity();
    this.setFormDefaultValues();
  }

}
