import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../shared/models/resultado.model';
import { HabilitacionTramiteModelInsert } from '../shared/models/tramites.models';
import { ContextoService } from '../shared/services/contexto.service';
import { UsuarioInsert, UsuarioUpdate } from './models/usuario.models';

@Injectable()
export class UsuariosService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`);

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  getAllListaUsuarios(): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/usuario`);
  }

  getListaPerfiles(): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/perfiles`);
  }

  insertUsuario(usuarioInsert: UsuarioInsert): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}/usuario`, usuarioInsert );
  }

  deleteUsuario(pIdUsuario: number): Observable<Resultado> {
    const params = new HttpParams().set( 'idUsuario' , pIdUsuario.toString() );
    return this.httpClient.delete<Resultado>(`${this.baseURL}/usuario`,{ params: params } );
  }

  updateUsuario(usuarioUpdate: UsuarioUpdate): Observable<Resultado> {
    return this.httpClient.patch<Resultado>(`${this.baseURL}/usuario`, usuarioUpdate );
  }

  /* insertHabilitaconTramite(habilitacionTramiteModelInsert: HabilitacionTramiteModelInsert): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}/tramite`, habilitacionTramiteModelInsert );
  }

  updateHabilitaconTramite(habilitacionTramiteModelUpdate: HabilitacionTramiteModelUpdate): Observable<Resultado> {
    return this.httpClient.patch<Resultado>(`${this.baseURL}/tramite`, habilitacionTramiteModelUpdate );
  }

  insertTramitePorExcepcion(habilitacionTramitePirExcepcion: HabilitacionPorExcepcionInsert): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}/excepcion`, habilitacionTramitePirExcepcion );
  }

  getAllListaTramitesPorExcepcion(): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/excepcion`);
  } */
}
