import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { fadeInAnim, slideInLeftAnim } from '../../animations/template.animation';
import { BaseComponent } from '../../base.component';
import { DataDocumentoAdjunto, DocumentoAdjuntoModel } from '../../models/documento-adjunto.model';
import { LangService } from '../../services/lang.service';
import { DocumentoAdjuntoService } from './../../services/documento-adjunto.service';
import { eModulo } from '../../enums/modulo.enum';
import { CiteModelByUsuario } from '../../../cites/models/cites.models';

@Component({
  selector: 'sh-documento-adjunto',
  templateUrl: './documento-adjunto.component.html',
  styleUrls: ['./documento-adjunto.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class DocumentoAdjuntoComponent extends BaseComponent implements  OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ['nombre', 'tipo', 'fechaSubida', 'acciones'];
  dataSource = new MatTableDataSource<DocumentoAdjuntoModel>([]);

  listaDocumentosToUpload: Array<DocumentoAdjuntoModel> = [];
  dataDocumentoAdjunto: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @Input()
  isRequired = false;

  @Input()
  titleToolbar: string;

  @Output()
  isValid = new  EventEmitter();

  constructor(
    public langService: LangService,
    private documentoAdjuntoService: DocumentoAdjuntoService
  ) {
    super();

    // Monitorea si se desea guardar los documentos adjuntos
    this.documentoAdjuntoService.getFlagToSaveDocument().pipe( takeUntil(this.unsubscribe$)).subscribe( data => {

      // Asigna los datos necesarios para guardar la informacion del doc adjunto.
      this.dataDocumentoAdjunto = this.dataDocumentoAdjunto ?? (data as DataDocumentoAdjunto).datosAdicionales;

      console.log( `SHARED DOCUMENTO ADJUNTO --> ${data.startSaveDocuments}`);

      if (data.startSaveDocuments) {
        console.log( `Subiendo Cantidad : ${this.listaDocumentosToUpload.length} archivos al servidor` );
        console.log( `Informacion adicional :  ${ JSON.stringify(this.dataDocumentoAdjunto) }` );

        if (this.dataDocumentoAdjunto) {
          // Sube los documentos al servidor de archivos.
          this.onSaveDocument();
        }
      }

    });
  }

  ngOnInit(): void {
    this.titleToolbar = this.titleToolbar ?? this.langService.getLang(eModulo.Base, 'tit-documentos-adjuntos');
    // ...
   /*  this.listaDocumentosToUpload = [{
      id : 1,
      tipo : 'pdf',
      nombre : 'primer archivo',
      fechaSubida : new Date(),
      informacion : undefined
    },
    {
      id : 2,
      tipo : 'docx',
      nombre : 'Segundo archivo',
      fechaSubida : new Date(),
      informacion : undefined
    }]; */

    this.listaDocumentosToUpload = [];

    // this.dataSource.data = this.listaDocumentosToUpload;
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

    if ($event.target.files.length > 0 ) {

      const listaTemporalDocumentosUpload: Array<File> = Array.from($event.target.files);

      listaTemporalDocumentosUpload.forEach(fileTemporal => {

        const indexInicioExtensionFile = fileTemporal.name.lastIndexOf( '.' );

        let idFile = 0;

         // Verifica que tipo es dataDocumentoAdjunto
        if ( 'idCite' in this.dataDocumentoAdjunto   ) {
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
          informacion        : fileTemporal
        };

        this.listaDocumentosToUpload.push( documentoAdjuntoToUpload );

      });

      this.dataSource.data = this.listaDocumentosToUpload;

    } else {

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

    this.listaDocumentosToUpload.forEach(element => {
      this.documentoAdjuntoService.uploadDocumentToServer( element ).pipe( takeUntil ( this.unsubscribe$ ) ).subscribe( respSave => {
        console.log( '----> ', respSave.data );
      });
    });
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
