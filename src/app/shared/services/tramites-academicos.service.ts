import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../models/resultado.model';
import { EstadoTramiteUpdate } from '../models/tramites.models';
import { ContextoService } from './contexto.service';

@Injectable()
export class TramitesAcademicosService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/tramite');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  getTramitesHabilitados() : Observable<Resultado>{
    return this.httpClient.get<Resultado>(`${this.baseURL}`);
  }

  updateEstadoTramite( pEstadoTramiteUpdate: EstadoTramiteUpdate): Observable<Resultado> {
    return this.httpClient.patch<Resultado>(`${this.baseURL}/estado`, pEstadoTramiteUpdate );
  }
}
