import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../../../shared/models/resultado.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { TransferenciaInsert } from '../../models/transferencia.model';

@Injectable()
export class TransferenciaService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/transferencia');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  getListaTransferencias(pIdEstudiante: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/${pIdEstudiante}`);
  }

  insertTransferencia(transferenciaInsert: TransferenciaInsert): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}`, transferenciaInsert );
  }
}
