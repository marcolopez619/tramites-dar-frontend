import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DocumentoAdjuntoService } from './../../services/documento-adjunto.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { fadeInAnim, slideInLeftAnim } from '../../animations/template.animation';
import { BaseComponent } from '../../base.component';
import { DocumentoAdjuntoModel } from '../../models/documento-adjunto.model';
import { LangService } from '../../services/lang.service';

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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public langService: LangService,
    private formBuilder: FormBuilder,
    private documentoAdjuntoService: DocumentoAdjuntoService
  ) {
    super();
  }

  ngOnInit(): void {
    // ...
    this.listaDocumentosToUpload = [{
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
    }];

    this.listaDocumentosToUpload = [];

    // this.dataSource.data = this.listaDocumentosToUpload;
  }

  ngAfterViewInit(): void {
    if (this.dataSource !== undefined) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  onUploadDocument($event): void {

    if ($event.target.files.length > 0 ) {

      const listaTemporalDocumentosUpload: Array<File> = Array.from($event.target.files);

      listaTemporalDocumentosUpload.forEach(fileTemporal => {

        const indexInicioExtensionFile = fileTemporal.name.lastIndexOf( '.' );

        const documentoAdjuntoToUpload: DocumentoAdjuntoModel = {
          id         : ( Math.random() * 10 ) / 100,
          tipo       : fileTemporal.name.substring( indexInicioExtensionFile + 1 ),
          nombre     : fileTemporal.name.substring( 0, indexInicioExtensionFile ),
          fechaSubida: new Date(),
          informacion: fileTemporal
        };

        this.listaDocumentosToUpload.push( documentoAdjuntoToUpload );

      });

      this.dataSource.data = this.listaDocumentosToUpload;

    } else {

    }

  }

  onDeleteDocument(pDocumento: DocumentoAdjuntoModel): void {
    const index = this.listaDocumentosToUpload.findIndex( x => x.nombre === pDocumento.nombre );

    if ( index >= 0 ) {
      this.listaDocumentosToUpload.splice(index, 1 );
      this.dataSource.data = this.listaDocumentosToUpload;
    } else {
      alert('no se encontro el documento');
    }
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
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

}
