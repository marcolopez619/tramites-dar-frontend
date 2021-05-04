import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../../../shared/models/resultado.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { SuspencionInsert } from '../../models/suspencion.model';

@Injectable()
export class SuspencionService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/suspencion');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  getAllListaSuspenciones(pIdEstudiante: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/${pIdEstudiante}`);
  }

  insertSuspencion(cambioCarreraInsert: SuspencionInsert): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}`, cambioCarreraInsert );
  }
}
