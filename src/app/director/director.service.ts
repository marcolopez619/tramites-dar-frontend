import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../shared/models/resultado.model';
import { ContextoService } from '../shared/services/contexto.service';

@Injectable()
export class DirectorService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/director');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  getTramitesPorAtender(pIdeCarrera: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/${pIdeCarrera}`);
  }

  getTramitesAtendidos(pIdeCarrera: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/${pIdeCarrera}/tramites/atendidos`);
  }

  /* getDetalleTramitePorAtender(pIdTramite: number, pIdEstudiante: number): Observable<Resultado> {

    const params = new HttpParams().set( 'idTramite', pIdTramite.toString() )
                                   .set( 'idEstudiante', pIdEstudiante.toString() );

    return this.httpClient.get<Resultado>(`${this.baseURL}/detalle/tramite`, {params : params});
  } */

 /*  insertTraspaso(traspasoInsert: TraspasoInsert): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}`, traspasoInsert );
  } */
}
