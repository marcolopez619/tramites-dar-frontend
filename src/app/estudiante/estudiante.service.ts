import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../shared/models/resultado.model';
import { ContextoService } from '../shared/services/contexto.service';

@Injectable()
export class EstudianteService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/estudiante');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  getInformacionEstudiante(pIdEstudiante: number): Observable<Resultado> {
    const headers = new HttpHeaders().set('X-Notificador', 'false');
    return this.httpClient.get<Resultado>(`${this.baseURL}/${pIdEstudiante}`,{ headers : headers });
  }

  getInformacionEstudianteByRU(pRu: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/search/${pRu}`);
  }


}
