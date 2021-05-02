import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../shared/models/resultado.model';
import { HabilitacionTramiteModelInsert, HabilitacionTramiteModelUpdate } from '../shared/models/tramites.models';
import { ContextoService } from '../shared/services/contexto.service';

@Injectable()
export class TramitesService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/habilitacion/tramite');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  getAllListaTramites(): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}`);
  }

  insertHabilitaconTramite(habilitacionTramiteModelInsert: HabilitacionTramiteModelInsert): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}`, habilitacionTramiteModelInsert );
  }

  updateHabilitaconTramite(habilitacionTramiteModelUpdate: HabilitacionTramiteModelUpdate): Observable<Resultado> {
    return this.httpClient.patch<Resultado>(`${this.baseURL}`, habilitacionTramiteModelUpdate );
  }

}
