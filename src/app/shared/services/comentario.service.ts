import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { ComentarioComponent } from '../../hoja-de-ruta/components/comentario-hoja-de-ruta/comentario-hoja-de-ruta.component';
import { ComentarioModel } from '../models/comentario.model';
import { Resultado } from '../models/resultado.model';
//import { UsuarioModel } from '../models/Usuario.model';
import { ContextoService } from './contexto.service';

@Injectable()
export class ComentarioService {

    readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/Comentario');

    constructor(
        private httpClient: HttpClient,
        private contextoService: ContextoService
    ) {}

    insertComentario(pDatosComentario: ComentarioModel): Observable<Resultado> {
        return this.httpClient.post<Resultado>(`${this.baseURL}`, pDatosComentario);
    }
}
