import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../models/resultado.model';
import { ContextoService } from './contexto.service';

@Injectable()
export class ParametricaService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat( '/parametrica' );

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) {}

  getTipoDocumentos(idUnidadOrg: number ): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/tipodocumento/${idUnidadOrg}`);
  }
}
