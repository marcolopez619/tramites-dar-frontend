import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../models/resultado.model';
import { ContextoService } from './contexto.service';

@Injectable()
export class PeriodoGestionService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/periodo');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) {}

  getAllPeriodos(): Observable<Resultado> {
    const headers = new HttpHeaders().set('X-Notificador', 'false');
    return this.httpClient.get<Resultado>(`${this.baseURL}`, {headers : headers });
  }
  getPeriodoActivo(): Observable<Resultado> {
    const headers = new HttpHeaders().set('X-Notificador', 'false');
    return this.httpClient.get<Resultado>(`${this.baseURL}/activo`, {headers : headers });
  }
}
