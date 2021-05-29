import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../../shared/models/resultado.model';
import { ContextoService } from '../../shared/services/contexto.service';
import { CambioCarreraInsert, CambioCarreraUpdate } from '../models/cambio_carrera.model';

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

  insertCambioCarrera(cambioCarreraInsert: CambioCarreraInsert): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}`, cambioCarreraInsert );
  }

  updateCambioCarrera( cambioCarreraUpdate: CambioCarreraUpdate ): Observable<Resultado> {
    return this.httpClient.patch<Resultado>(`${this.baseURL}`, cambioCarreraUpdate );
  }
}
