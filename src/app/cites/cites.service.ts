import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../shared/models/resultado.model';
import { ContextoService } from '../shared/services/contexto.service';
import { CiteModel } from './models/cites.models';

@Injectable()
export class CitesService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/cite');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) {}

  insertCite( pCite: CiteModel): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}`, pCite );
  }

  getAllCitesFromPersona(idPersonaGd: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>( `${this.baseURL}/persona/${idPersonaGd}`);
  }
}
