import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../../../shared/models/resultado.model';
import { ContextoService } from '../../../shared/services/contexto.service';
import { TraspasoInsert } from '../../models/traspaso.model';

@Injectable()
export class TraspasoUniversidadService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/traspaso');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  getAllTraspasos(pIdEstudiante: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/${pIdEstudiante}`);
  }

  getDatosParaImpresionFormularioTraspasoUniversidad(pIdTraspaso:number, pIdEstudiante: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/${pIdTraspaso}/estudiante/${pIdEstudiante}`);
  }

  insertTraspaso(traspasoInsert: TraspasoInsert): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}`, traspasoInsert );
  }
}
