import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContextoService } from './contexto.service';
import { Observable } from 'rxjs';
import { Resultado } from '../models/resultado.model';
import { BusquedaAvanzadaModel } from '../models/busqueda-avanzada.model';

@Injectable()
export class BusquedaService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/busqueda');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) {}

  buscar(criteriosBusqueda: BusquedaAvanzadaModel ): Observable<Resultado>{
    return this.httpClient.post<Resultado>( `${this.baseURL}/hojaderuta`, criteriosBusqueda )
  }
}
