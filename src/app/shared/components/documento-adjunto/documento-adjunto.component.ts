import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { fadeInAnim, slideInLeftAnim } from '../../animations/template.animation';
import { BaseComponent } from '../../base.component';
import { eModulo } from '../../enums/modulo.enum';
import { eTipoNotificacion } from '../../enums/tipo-notificacion.enum';
import { DataDocumentoAdjunto, DataDocumentoAdjuntoResultFromSave, DocumentoAdjuntoModel } from '../../models/documento-adjunto.model';
import { LangService } from '../../services/lang.service';
import { NotificacionService } from '../../services/notificacion.service';
import { DocumentoAdjuntoService } from './../../services/documento-adjunto.service';
import { HojaRutaBandejaModel } from '../../../hoja-de-ruta/models/hoja-de-ruta.model';
import { ContextoService } from '../../services/contexto.service';
import { eTipoDocumento } from '../../enums/tipo_documento.enum';

@Component({
  selector: 'sh-documento-adjunto',
  templateUrl: './documento-adjunto.component.html',
  styleUrls: ['./documento-adjunto.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class DocumentoAdjuntoComponent extends BaseComponent implements  OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['nombre', 'tipo', 'fechaSubida', 'progreso', 'acciones'];
  dataSource = new MatTableDataSource<DocumentoAdjuntoModel>([]);

  listaDocumentosToUpload: Array<DocumentoAdjuntoModel> = [];
  dataDocumentoAdjunto: any;
  isUploadedFile: boolean;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input()
  isRequired = false;

  @Input()
  titleToolbar: string;

  @Input()
  cantidadPermitidaSubida;

  @Output()
  isValid = new  EventEmitter();

  @Output()
  isUploadedAllFiles = new  EventEmitter();

  constructor(
    public langService: LangService,
    public contextService: ContextoService,
    public notificacionService: NotificacionService,
    private documentoAdjuntoService: DocumentoAdjuntoService
  ) {
    super();

    // Monitorea si se desea guardar los documentos adjuntos
    this.documentoAdjuntoService.getFlagToSaveDocument().pipe( takeUntil(this.unsubscribe$)).subscribe( dataSUbscriber => {

      const data = dataSUbscriber as DataDocumentoAdjunto;

      // Asigna los datos necesarios para guardar la informacion del doc adjunto.
      this.dataDocumentoAdjunto = data.datosAdicionales ?? this.dataDocumentoAdjunto;

      console.log( `SHARED DOCUMENTO ADJUNTO --> ${data.startSaveDocuments}`);

      if (data.startSaveDocuments) {
        console.log( `Subiendo Cantidad : ${this.listaDocumentosToUpload.length} archivos al servidor` );
        console.log( `Informacion adicional :  ${ JSON.stringify(this.dataDocumentoAdjunto) }` );

        if (data.datosAdicionales) {
          // Si es la subida desde la hoja de ruta, => asigna el id del file al id de la hoja de ruta.
          // Verifica que tipo es dataDocumentoAdjunto
          if ( 'idHojaRuta' in data.datosAdicionales ) {

            this.listaDocumentosToUpload.forEach(element => {
              element.id = ( data.datosAdicionales as HojaRutaBandejaModel).idHojaRuta;
              element.isCiteOrHR = eTipoDocumento.HOJA_DE_RUTA;
            });
          }

          // Sube los documentos al servidor de archivos.
          this.onSaveDocument();
        }
      }

    });
  }

  ngOnInit(): void {
    this.cantidadPermitidaSubida = this.cantidadPermitidaSubida ?? 100;

    if (this.cantidadPermitidaSubida !== 100 ) {
      this.titleToolbar = this.langService.getLang(eModulo.Base, 'tit-cantidad-documentos-adjuntos').replace('$cantidadPermitida', this.cantidadPermitidaSubida.toString() );
    } else {
      this.titleToolbar = this.titleToolbar ?? this.langService.getLang(eModulo.Base, 'tit-documentos-adjuntos');
    }
    this.listaDocumentosToUpload = [];
  }

  ngAfterViewInit(): void {
    if (this.dataSource !== undefined) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  private verifyisValid(): void {

    const isListaVacia = this.listaDocumentosToUpload.length === 0;
    let isValid = false;

    if ( isListaVacia === false && this.isRequired) {
      isValid = true;
    }

    return this.isValid.next( isValid );
  }

  onUploadDocument($event): void {

    if ($event.target.files.length > 0 && $event.target.files.length <= this.cantidadPermitidaSubida && this.listaDocumentosToUpload.length < this.cantidadPermitidaSubida) {

      const listaTemporalDocumentosUpload: Array<File> = Array.from($event.target.files);

      listaTemporalDocumentosUpload.forEach(fileTemporal => {

        const indexInicioExtensionFile = fileTemporal.name.lastIndexOf( '.' );

        let idFile = 0;

         // Verifica que tipo es dataDocumentoAdjunto
        if ( this.dataDocumentoAdjunto && 'idCite' in this.dataDocumentoAdjunto   ) {
          // => es de tipo: idCite
          idFile = this.dataDocumentoAdjunto.idCite;
        }

        const documentoAdjuntoToUpload: DocumentoAdjuntoModel = {
          id                 : idFile,
          bucketName         : 'prueba', // FIXME: DATO QUEMADO
          pathDestinoOnServer: 'nivel1/nivel2/', // FIXME: DATO QUEMADO
          tipo               : fileTemporal.name.substring( indexInicioExtensionFile + 1 ),
          nombre             : fileTemporal.name.substring( 0, indexInicioExtensionFile ),
          fechaSubida        : new Date().toISOString(),
          informacion        : fileTemporal,
          porcentajeUploaded : 0,
          isCiteOrHR         : eTipoDocumento.CITE
        };

        this.listaDocumentosToUpload.push( documentoAdjuntoToUpload );

      });

      this.dataSource.data = this.listaDocumentosToUpload;

    } else {
      this.notificacionService.showSnackbarMensaje(`SOLO SE PERMITE SUBIR ${this.cantidadPermitidaSubida} ARCHIVOS`, 3500, eTipoNotificacion.Advertencia);
    }

    this.verifyisValid();
  }

  onDeleteDocument(pDocumento: DocumentoAdjuntoModel): void {
    const index = this.listaDocumentosToUpload.findIndex( x => x.nombre === pDocumento.nombre );

    if ( index >= 0 ) {
      this.listaDocumentosToUpload.splice(index, 1 );
      this.dataSource.data = this.listaDocumentosToUpload;
    } else {
      alert('no se encontro el documento');
    }

    this.verifyisValid();
  }

  onSaveDocument(): void {

    if (this.listaDocumentosToUpload.length < 0 ) {
      return;
    }

    for (let index = 0; index < this.listaDocumentosToUpload.length; index++) {
      const element = this.listaDocumentosToUpload[index];

      this.documentoAdjuntoService.uploadDocumentToServer( element ).pipe( takeUntil ( this.unsubscribe$ ) ).subscribe( respSave => {

        this.notificacionService.progressSubject.asObservable().subscribe( porcentajeUpload => {

          if (porcentajeUpload.progress) {
            element.porcentajeUploaded = 100;
            this.isUploadedFile = element.porcentajeUploaded >= 100;

            const dataDocAdjResult: DataDocumentoAdjuntoResultFromSave = {
              isUploadedFile              : element.porcentajeUploaded >= 100,
              cantidadArchivosSubidos     : index,
              cantidaTotalArchivosPorSubir: this.listaDocumentosToUpload.length - 1
            };

            this.isUploadedAllFiles.emit( dataDocAdjResult );
          }

        });
        console.log( 'Resp subida archivo : ----> ', respSave.message );
      });

    }

    /* this.listaDocumentosToUpload.forEach(( element, index ) => {
      this.documentoAdjuntoService.uploadDocumentToServer( element ).pipe( takeUntil ( this.unsubscribe$ ) ).subscribe( respSave => {

        this.notificacionService.progressSubject.asObservable().subscribe( porcentajeUpload => {

          if (porcentajeUpload.progress) {
            element.porcentajeUploaded = 100;
            this.isUploadedFile = element.porcentajeUploaded >= 100;
            this.isUploadedAllFiles.emit(
              {
                isUploadedFile         : this.isUploadedFile,
                cantidadArchivosSubidos: index,
                cantidaTotaldArchivos  : this.listaDocumentosToUpload.length - 1
              }
            );
          }

        });
        console.log( 'Resp subida archivo : ----> ', respSave.message );
      });
    }); */
  }

  onCancel(): void {
    this.listaDocumentosToUpload.length = 0;
    this.dataSource.data = this.listaDocumentosToUpload;
    this.verifyisValid();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

}
