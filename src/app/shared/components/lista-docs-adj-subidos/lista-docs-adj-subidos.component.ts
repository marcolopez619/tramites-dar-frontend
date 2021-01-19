import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInAnim, zoomInAnim, slideInLeftAnim } from '../../animations/template.animation';
import { BaseComponent } from '../../base.component';
import { ListaDocumentosAdjuntos, DocumentoAdjuntoDownloadParam } from '../../models/documento-adjunto.model';
import { DocumentoAdjuntoService } from '../../services/documento-adjunto.service';
import { LangService } from '../../services/lang.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { UtilService } from '../../services/util.service';
import { NotificacionService } from '../../services/notificacion.service';
import { eModulo } from '../../enums/modulo.enum';
import { eTipoNotificacion } from '../../enums/tipo-notificacion.enum';

@Component({
  selector: 'sh-lista-docs-adj-subidos',
  templateUrl: './lista-docs-adj-subidos.component.html',
  styleUrls: ['./lista-docs-adj-subidos.component.css'],
  animations: [fadeInAnim, zoomInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@zoomInAnim]': 'true', 'fadeInAnim' : 'true' }
})
export class ListaDocsAdjSubidosComponent extends BaseComponent  implements OnInit, AfterViewInit,  OnDestroy {

  displayedColumns = [ 'nombreArchivo', 'referencia', 'fechaRegistro', 'cite', 'acciones' ];
  dataSource = new MatTableDataSource<ListaDocumentosAdjuntos>([]);

  @Input()
  listaDocumentosAdjuntos: Array<ListaDocumentosAdjuntos> = [];

  @Input()
  bandeja: string;

  @Input()
  ocultarToolbar: boolean;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    public langService: LangService,
    private utilService: UtilService,
    private notificacionService: NotificacionService,
    private documentoAdjuntoService: DocumentoAdjuntoService
  ) {
    super();
  }

  ngOnInit(): void {
    this.listaDocumentosAdjuntos = JSON.parse( this.data.listaDocumentosAdj ?? this.listaDocumentosAdjuntos ) as Array<ListaDocumentosAdjuntos>;



    this.listaDocumentosAdjuntos.forEach(element => {
      const indexUltimaSlah           = element.pathArchivo.lastIndexOf('/');
      const indexPunto                = element.pathArchivo.lastIndexOf('.');
      const nombreArchivoConExtension = element.pathArchivo.substring( indexUltimaSlah + 1);
      const tipoArchivo               = element.pathArchivo.substr( indexPunto + 1 );

      element.nombreArchivo = nombreArchivoConExtension;
      element.tipoArchivo   = tipoArchivo;
      element.nivelBucket   = element.pathArchivo.substr( 0, indexUltimaSlah + 1 );
    });

    this.dataSource.data = this.listaDocumentosAdjuntos;
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  onDowloadSelectedDocument(pSelectedItem: ListaDocumentosAdjuntos): void {

    const paramDocAdjToDownload: DocumentoAdjuntoDownloadParam = {
      bucketName           : 'prueba',
      NivelBucketName      : pSelectedItem.nivelBucket,
      nombreArchivoDownload: `${pSelectedItem.nombreArchivo}`
    };

    this.documentoAdjuntoService.downloadDocumentFromServer( paramDocAdjToDownload ).pipe( takeUntil ( this.unsubscribe$ ) ).subscribe( blob => {

      if ( blob ) {
        this.utilService.createDocumentFromBlob( blob, pSelectedItem.tipoArchivo, pSelectedItem.nombreArchivo);
      } else {
        const mensaje = this.langService.getLang( eModulo.Base, 'lbl-doc-adj-no-encontrado' );
        this.notificacionService.showSnackbarMensaje( mensaje, 4000, eTipoNotificacion.Informativo );
      }
    });

  }

  onClose(object?: any): void {
    this.dialogRef.close(object);
  }

}
