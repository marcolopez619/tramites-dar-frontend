import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../shared/models/resultado.model';
import { ContextoService } from '../shared/services/contexto.service';

@Injectable()
export class UsuariosService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/usuario');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  getAllListaUsuarios(): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}`);
  }

  /* insertHabilitaconTramite(habilitacionTramiteModelInsert: HabilitacionTramiteModelInsert): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}/tramite`, habilitacionTramiteModelInsert );
  }

  updateHabilitaconTramite(habilitacionTramiteModelUpdate: HabilitacionTramiteModelUpdate): Observable<Resultado> {
    return this.httpClient.patch<Resultado>(`${this.baseURL}/tramite`, habilitacionTramiteModelUpdate );
  }

  insertTramitePorExcepcion(habilitacionTramitePirExcepcion: HabilitacionPorExcepcionInsert): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}/excepcion`, habilitacionTramitePirExcepcion );
  }

  getAllListaTramitesPorExcepcion(): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/excepcion`);
  } */
}
