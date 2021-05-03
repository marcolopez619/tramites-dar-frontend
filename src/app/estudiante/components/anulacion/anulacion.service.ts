import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../../../shared/models/resultado.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { AnulacionInsert } from '../../models/anulacion.models';

@Injectable()
export class AnulacionService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/anulacion');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  getAllListaAnulaciones(pIdEstudiante: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/${pIdEstudiante}`);
  }

  insertAnulacion(anulacionInsert: AnulacionInsert): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}`, anulacionInsert );
  }

}
