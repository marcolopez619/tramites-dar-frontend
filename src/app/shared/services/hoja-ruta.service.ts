import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HojaDeRutaInsertModel } from '../models/hoja-de-ruta.model';
//import { ComentarioHojaDeRutaComponent } from '../../hoja-de-ruta/components/comentario-hoja-de-ruta/comentario-hoja-de-ruta.component';
import { Resultado } from '../models/resultado.model';
//import { UsuarioModel } from '../models/Usuario.model';
import { ContextoService } from './contexto.service';

@Injectable()
export class HojaRutaService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/hojaderuta');

  //readonly LISTA_USUARIOS: Array<ComentarioHojaDeRutaComponent> = [];

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) {
    // this.getAllUsuarios();
   }
   insertHojaDeRuta(pDatosComentario: HojaDeRutaInsertModel): Observable<Resultado> {
    const algo=1;
     //TODO: verificar el httpClient
    return this.httpClient.post<Resultado>(`${this.baseURL}`, pDatosComentario);
    //return this.httpClient.post<Resultado>(`${this.baseURL}`, pDatosComentario);
    //this.http.post<Resultado>(`${this.contextoService.getConfig('backendApi')}/Autentificacion/login`, params)
}
}
