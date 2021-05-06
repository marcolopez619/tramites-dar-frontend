import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TraspasoInsert } from '../estudiante/models/traspaso.model';
import { Resultado } from '../shared/models/resultado.model';
import { ContextoService } from '../shared/services/contexto.service';

@Injectable()
export class DarService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/dar');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  getSolicitudesPorAtender(): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}`);
  }

 /*  insertTraspaso(traspasoInsert: TraspasoInsert): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}`, traspasoInsert );
  } */
}
