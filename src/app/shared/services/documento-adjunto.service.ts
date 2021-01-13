import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ContextoService } from './contexto.service';
import { Resultado } from '../models/resultado.model';
import { DataDocumentoAdjunto, DocumentoAdjuntoModel } from '../models/documento-adjunto.model';

@Injectable()
export class DocumentoAdjuntoService {
  readonly baseURL = this.contextoService.getConfig('backendApi').concat( '/documentoadjunto' );

  saveDocumentoAdjuntos = new Subject();

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  sendFlagToSaveDocument( pDataDocumentoAdjunto: DataDocumentoAdjunto): void {
    this.saveDocumentoAdjuntos.next( pDataDocumentoAdjunto );
  }

  getFlagToSaveDocument(): Observable<unknown> {
    return  this.saveDocumentoAdjuntos.asObservable();
  }

  uploadDocumentToServer(pDocumento: DocumentoAdjuntoModel): Observable<Resultado> {

    const formData = new FormData();
    formData.append('file', pDocumento.informacion );
    formData.append('Id', `${pDocumento.id}`);
    formData.append('Nombre', `${pDocumento.nombre}`);
    formData.append('BucketName', `${pDocumento.bucketName}`);
    formData.append('PathDestinoOnServer',  `${pDocumento.pathDestinoOnServer}`);
    formData.append('descripcion',  `${pDocumento.descripcion}`);
    formData.append('Tipo', `${pDocumento.tipo}`);
    formData.append('FechaSubida', `${pDocumento.fechaSubida}`);
    formData.append('IsCiteOrHR', `${pDocumento.isCiteOrHR}`);
    formData.append('UsuarioBitacora', `${this.contextoService.getItemContexto(`samActName`)}`);

    const options = {
      params: new HttpParams().set('isMultipart', 'true').set('filename', pDocumento.informacion.name),
      reportProgress: true
    };

    return this.httpClient.post<Resultado>( `${this.baseURL}/upload`, formData, options );
  }
}
