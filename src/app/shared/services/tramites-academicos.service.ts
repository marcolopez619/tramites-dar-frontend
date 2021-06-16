import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { eTipoTramite } from '../enums/tipoTramite.enum';
import { Resultado } from '../models/resultado.model';
import { EstadoTramiteUpdate, TablaIntermediaInsert } from '../models/tramites.models';
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

  getSeguimientoTramite(pIdTramite: number, pIdTipoTramite: eTipoTramite): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/${pIdTramite}/tipo/${pIdTipoTramite}`);
  }

  verificarHabilitacionTramite(pIdTramite: number, pIdEstudiante: number) : Observable<Resultado>{
    const headers = new HttpHeaders().set('X-Notificador', 'false');
    return this.httpClient.get<Resultado>(`${this.baseURL}/verificar/habilitacion/${pIdTramite}/estudiante/${pIdEstudiante}`, {headers : headers});
  }

  insertDataTablaIntermedia(pTablaIntermediaInsert : TablaIntermediaInsert ) : Observable<Resultado>{
    return this.httpClient.post<Resultado>(`${this.baseURL}/tabla/intermedia`, pTablaIntermediaInsert);
  }

  updateEstadoTramite( pEstadoTramiteUpdate: EstadoTramiteUpdate): Observable<Resultado> {
    return this.httpClient.patch<Resultado>(`${this.baseURL}/estado`, pEstadoTramiteUpdate );
  }


}
