import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Resultado } from '../models/resultado.model';
import { ContextoService } from './contexto.service';

@Injectable()
export class UniversidadService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`);

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  getAllListaCarreras(pIdUniversidad: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/carreras/${pIdUniversidad}`);
  }

}
