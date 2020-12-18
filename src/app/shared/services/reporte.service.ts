import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CiteTemplateJsReport } from '../../cites/models/cites.models';
import { ContextoService } from './contexto.service';

@Injectable()
export class ReporteService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`);

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  getPlanillaCiteTemplate(pDatosReporte: CiteTemplateJsReport): Observable<Blob> {
    return this.httpClient.post(`${this.baseURL}/reporte/cite`, pDatosReporte, { responseType : 'blob'} );
  }
}
