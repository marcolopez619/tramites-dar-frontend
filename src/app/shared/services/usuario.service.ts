import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ContextoService } from './contexto.service';
import { Observable } from 'rxjs';
import { Resultado } from '../models/resultado.model';
import { UsuarioModel } from '../models/Usuario.model';

@Injectable()
export class UsuarioService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`);

  readonly LISTA_USUARIOS: Array<UsuarioModel> = [];

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) {
    this.getAllUsuarios();
   }

  getAllUsuarios(): Observable<Resultado> {

    // FIXME: ESTO NO DEBE SER QUEMADO.
    const params = {
      'Usuario' : 'direccion.tecnologia',
      'Password': 'Segip2020'
    };

    return this.httpClient.get<Resultado>(`${this.baseURL}/usuario`, { params : params });
  }
}
