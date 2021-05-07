import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BandejaUniversidades } from '../../tramites/models/tramites.models';
import { Resultado } from '../models/resultado.model';
import { ContextoService } from './contexto.service';

@Injectable()
export class UniversidadService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`);

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  getAllListaUniversidades(): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/universidad`);
  }

  getAllListaCarreras(pIdUniversidad: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/carrera/${pIdUniversidad}`);
  }

  getAllInformation(pIdUniversidad: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/universidad/${pIdUniversidad}/all`);
  }

  insertUniversidad(pUniversidad: BandejaUniversidades): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}/universidad/`, pUniversidad );
  }

  updateUniversidad(pUniversidad: BandejaUniversidades): Observable<Resultado> {
    return this.httpClient.patch<Resultado>(`${this.baseURL}/universidad/`, pUniversidad );
  }




}
