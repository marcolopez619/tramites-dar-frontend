import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ContextoService } from './contexto.service';
import { Resultado } from '../models/resultado.model';
import { DocumentoAdjuntoModel } from '../models/documento-adjunto.model';

@Injectable()
export class DocumentoAdjuntoService {
  readonly baseURL = this.contextoService.getConfig('backendApi').concat( '/documentoadjunto' );

  saveDocumentoAdjuntos = new Subject();

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  sendFlagToSaveDocument( startSaveDocuments: boolean): void {
    this.saveDocumentoAdjuntos.next( startSaveDocuments );
  }

  getFlagToSaveDocument(): Observable<unknown> {
    return  this.saveDocumentoAdjuntos.asObservable();
  }

  uploadDocumentToServer(pDocumento: DocumentoAdjuntoModel): Observable<Resultado> {

    const formData = new FormData();
    formData.append('file', pDocumento.informacion );
    formData.append('BucketName', `prueba`);
    formData.append('PathDestinoOnServer',  `nivel1/nivel2`);

    const options = {
      params: new HttpParams().set('isMultipart', 'true'),
      reportProgress: true
    };

    return this.httpClient.post<Resultado>( `${this.baseURL}/upload`, formData, options );
  }
}
