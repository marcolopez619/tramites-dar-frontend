import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TraspasoInsert } from '../estudiante/models/traspaso.model';
import { eTipoTramite } from '../shared/enums/tipoTramite.enum';
import { Resultado } from '../shared/models/resultado.model';
import { ContextoService } from '../shared/services/contexto.service';

@Injectable()
export class DarService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/dar');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  getTramitesPorAtender(): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}`);
  }
  getTramitesAtendidos(): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/tramites/atendidos`);
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
