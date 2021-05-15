import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Motivo } from '../models/motivos.models';
import { Resultado } from '../models/resultado.model';
import { ContextoService } from './contexto.service';

@Injectable()
export class MotivoService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/motivo');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) {}

  getMotivoSuspencion(): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}`);
  }

}
