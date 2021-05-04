import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../../../shared/models/resultado.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { ReadmisionInsert } from '../../models/readmision.model';

@Injectable()
export class ReadmisionService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/readmision');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  getAllListaReadmisiones(pIdEstudiante: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/${pIdEstudiante}`);
  }

  insertReadmision(cambioCarreraInsert: ReadmisionInsert): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}`, cambioCarreraInsert );
  }
}
