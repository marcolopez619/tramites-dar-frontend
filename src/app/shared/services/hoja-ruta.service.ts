import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { ComentarioHojaDeRutaComponent } from '../../hoja-de-ruta/components/comentario-hoja-de-ruta/comentario-hoja-de-ruta.component';
import { Resultado } from '../models/resultado.model';
//import { UsuarioModel } from '../models/Usuario.model';
import { ContextoService } from './contexto.service';

@Injectable()
export class HojaRutaService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`);

  //readonly LISTA_USUARIOS: Array<ComentarioHojaDeRutaComponent> = [];

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) {
    // this.getAllUsuarios();
   }  
}