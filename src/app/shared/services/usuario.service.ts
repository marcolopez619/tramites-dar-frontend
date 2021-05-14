import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../models/resultado.model';
import { UsuarioModel } from '../models/Usuario.model';
import { ContextoService } from './contexto.service';

@Injectable()
export class UsuarioService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`);

  readonly LISTA_USUARIOS: Array<UsuarioModel> = [];

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) {
    // this.getAllUsuarios();
   }

  getAllUsuarios(pIdtipoTramite: number): Observable<Resultado> {
    const params = new HttpParams().set( 'idTipoTramite' , pIdtipoTramite.toString() );
    return this.httpClient.get<Resultado>(`${this.baseURL}/usuario`, { params: params});
  }
}
