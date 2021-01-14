import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { HojaDeRutaComponent } from '../../../shared/components/hoja-de-ruta/hoja-de-ruta.component';
import { eModulo } from '../../../shared/enums/modulo.enum';
import { eTipoArchivo } from '../../../shared/enums/tipo-archivo.enum';
import { eTipoNotificacion } from '../../../shared/enums/tipo-notificacion.enum';
import { DocumentoAdjuntoDownloadParam } from '../../../shared/models/documento-adjunto.model';
import { HojaDeRutaRespInsert } from '../../../shared/models/hoja-de-ruta.model';
import { DestinatarioModel } from '../../../shared/models/Usuario.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { DocumentoAdjuntoService } from '../../../shared/services/documento-adjunto.service';
import { LangService } from '../../../shared/services/lang.service';
import { NotificacionService } from '../../../shared/services/notificacion.service';
import { UtilService } from '../../../shared/services/util.service';
import { CitesService } from '../../cites.service';
import { CiteModelByUsuario, ResultCiteInst } from '../../models/cites.models';
import { AdjuntarDocumentoComponent } from '../adjuntar-documento/adjuntar-documento.component';
import { BaseComponent } from './../../../shared/base.component';
import { CrearNuevoCiteComponent } from './../crear-nuevo-cite/crear-nuevo-cite.component';

@Component({
  selector: 'app-bandeja-cites',
  templateUrl: './bandeja-cites.component.html',
  styleUrls: ['./bandeja-cites.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class BandejaCitesComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['tipoDestinatario', 'tipoDocumento', 'numeroCite', 'destinatario', 'referencia', 'fechaCreacion', 'estado'];
  dataSource = new MatTableDataSource<CiteModelByUsuario>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  showMouseOverActions = false;
  idPersonaGd = 0;

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    private citesService: CitesService,
    private dialog: MatDialog,
    private notificacionService: NotificacionService,
    private utilService: UtilService,
    private documentoAdjuntoService: DocumentoAdjuntoService
  ) {  super(); }

  ngOnInit(): void {
    this.idPersonaGd = this.contextService.getItemContexto(`idPersonaGd`) ?? 542;
    this.getAllCitesFromPersona( this.idPersonaGd );
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

  private getAllCitesFromPersona( idPersonaGd: number ): void {
    this.citesService.getAllCitesFromPersona( idPersonaGd ).pipe( takeUntil( this.unsubscribe$ ) ).subscribe( listaCitesPersona => {

      if (listaCitesPersona.data?.length > 0 && listaCitesPersona.data !== null ) {
        listaCitesPersona.data.map( cite => cite.destinatarios = ( cite.destinatarios !== '' ) ? JSON.parse( cite.destinatarios ) as Array<DestinatarioModel> : cite.destinatarios );
        listaCitesPersona.data.map( cite => cite.remitentes = ( cite.remitentes !== '' ) ? JSON.parse( cite.remitentes ) as Array<DestinatarioModel> : cite.remitentes );
        listaCitesPersona.data.map( cite => cite.vias = ( cite.vias !== '' ) ? JSON.parse( cite.vias ) as Array<DestinatarioModel> : cite.vias );
        this.dataSource.data = listaCitesPersona.data as Array<CiteModelByUsuario>;
      } else {
        // Borra la lista porque no existe ninguna data para mostrar
        this.dataSource.data = [];
        this.dataSource.data.length = 0;
      }

    });
  }

  private getTipoArchivo(pExtensionArchivo: string): eTipoArchivo {

    let tipoArchivo: eTipoArchivo;

    switch (pExtensionArchivo) {

      case 'pdf': tipoArchivo = eTipoArchivo.Pdf; break;

      case 'doc':
      case 'docx':
      tipoArchivo = eTipoArchivo.Word; break;

      case 'xls':
      case 'xlsx': tipoArchivo = eTipoArchivo.Excel; break;

      default:
        break;
    }

    return tipoArchivo;
  }

  onMouseOver(row: CiteModelByUsuario): void {
    row.isRowMouseOver = true;
    this.showMouseOverActions = true;
  }
  onMouseLeave(row: CiteModelByUsuario): void {
    row.isRowMouseOver = false;
    this.showMouseOverActions = false;
  }

  onCrearNuevoCite(): void {
    const dlgNuevoCite = this.dialog.open( CrearNuevoCiteComponent,  {
      disableClose: false,
      width: '1000px',
      data: {

      }
    });
    dlgNuevoCite.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        const resultCiteInst = result as ResultCiteInst;
        const idPersonaGd = this.contextService.getItemContexto(`idPersonaGd`) ?? 542;
        this.getAllCitesFromPersona(idPersonaGd);
      }
    });

  }

  onEdit(pCiteModel: CiteModelByUsuario): void {
    console.log( `EDITANDO ---> ${pCiteModel.idCite}` );
  }

  onGenerateHojaRuta(pCiteModel: CiteModelByUsuario): void {
    console.log( `GENERANDO ---> ${pCiteModel.idCite}` );

    const dlgNuevaHojaDeRuta = this.dialog.open( HojaDeRutaComponent,  {
      disableClose: false,
      width: '1000px',
      data: {
        citeSelected : pCiteModel
      }
    });
    dlgNuevaHojaDeRuta.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        const resultHRInsert = result.data as HojaDeRutaRespInsert;
        this.getAllCitesFromPersona(this.idPersonaGd ?? 542);
      }
    });

  }

  onPrintHojaRuta(pCiteModel: CiteModelByUsuario): void {
    console.log( `IMPRIMIENDO ---> ${pCiteModel.idCite}` );
  }

  onUploadArchivo(pCiteModel: CiteModelByUsuario): void {

    const dlgUploadArchivo = this.dialog.open( AdjuntarDocumentoComponent,  {
      disableClose: false,
      width: '1000px',
      data: {
        citeSelected                   : pCiteModel,
        cantidadPermitidaSubidaArchivos: 3
      }
    });
    dlgUploadArchivo.afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe( result => {
      if (result) {
        /* const resultCiteInst = result as ResultCiteInst;
        const idPersonaGd = this.contextService.getItemContexto(`idPersonaGd`) ?? 542;
        this.getAllCitesFromPersona(idPersonaGd); */
      }
      this.getAllCitesFromPersona(this.idPersonaGd);
    });
  }

  onDownloadDocumentoFromCite(pCiteModel: CiteModelByUsuario): void {

    const index                     = pCiteModel.pathArchivo.lastIndexOf('/');
    const nombreArchivoConExtension = pCiteModel.pathArchivo.substr( index + 1 );
    const extensionArchivo          = nombreArchivoConExtension.substr( nombreArchivoConExtension.lastIndexOf( '.' ) + 1 );
    const nombreAchivoSinExtension  = nombreArchivoConExtension.substr( 0 , nombreArchivoConExtension.lastIndexOf('.') );
    const tipoArchivo: eTipoArchivo = this.getTipoArchivo(extensionArchivo);

    const parametros: DocumentoAdjuntoDownloadParam = {
      bucketName           : 'prueba',
      nombreArchivoDownload: nombreArchivoConExtension,
      NivelBucketName      : '/nivel1/nivel2/'
    };

    this.documentoAdjuntoService.downloadDocumentFromServer( parametros ).pipe( takeUntil(this.unsubscribe$) ).subscribe( blob => {

      if ( blob ) {
        this.utilService.createDocumentFromBlob( blob, tipoArchivo, nombreAchivoSinExtension );
      } else {
        const mensajeInformativo = this.langService.getLang(eModulo.Base, 'lbl-no-existe-ducumento-from-cite' );
        this.notificacionService.showSnackbarMensaje(mensajeInformativo, 5000, eTipoNotificacion.Informativo);
      }

    });
  }

}
