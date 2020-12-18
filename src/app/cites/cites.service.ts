import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContextoService } from '../shared/services/contexto.service';
import { CiteTemplateJsReport } from './models/cites.models';

@Injectable()
export class CitesService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`);

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) {}

 /*  getPlanillaCiteTemplate(pDatosReporte: CiteTemplateJsReport): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/reporte/cite`, pDatosReporte, { responseType : 'blob'} );
  } */
}
