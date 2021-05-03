import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../../shared/models/resultado.model';
import { ContextoService } from '../../shared/services/contexto.service';
import { AnulacionInsert } from '../models/anulacion.models';

@Injectable()
export class CambioCarreraService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/cambio');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  getAllListaCambiosCarrera(pIdEstudiante: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/${pIdEstudiante}`);
  }

  insertCambioCarrera(anulacionInsert: AnulacionInsert): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}`, anulacionInsert );
  }
}
