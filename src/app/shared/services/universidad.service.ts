import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BandejaCarreras, BandejaFacultad, BandejaUniversidades } from '../../tramites/models/tramites.models';
import { Resultado } from '../models/resultado.model';
import { ContextoService } from './contexto.service';

@Injectable()
export class UniversidadService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`);

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) { }

  getAllListaUniversidades(): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/universidad`);
  }

  getAllListaCarrerasByIdUniversidad(pIdUniversidad: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/universidad/${pIdUniversidad}/carreras`);
  }

  getAllInformation(pIdUniversidad: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/universidad/${pIdUniversidad}/all`);
  }

  insertUniversidad(pUniversidad: BandejaUniversidades): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}/universidad/`, pUniversidad );
  }

  updateUniversidad(pUniversidad: BandejaUniversidades): Observable<Resultado> {
    return this.httpClient.patch<Resultado>(`${this.baseURL}/universidad/`, pUniversidad );
  }

  getListaFacultades( pIdUniversidad: number ) : Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/facultad/${pIdUniversidad}`);
  }

  insertFacultad(pUniversidad: BandejaFacultad): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}/facultad/`, pUniversidad );
  }

  updateFacultad(datosFacultad: BandejaFacultad): Observable<Resultado> {
    return this.httpClient.patch<Resultado>(`${this.baseURL}/facultad`, datosFacultad );
  }

  getListaCarrerasByIdFacultad(pIdFacultad: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/carrera/${pIdFacultad}`);
  }

  getListaCarreras(): Observable<Resultado> {
    return this.httpClient.get<Resultado>(`${this.baseURL}/carrera`);
  }

  insertCarrera(pCarrera: BandejaCarreras): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}/carrera`, pCarrera );
  }

  updateCarrera(datosCarrera: BandejaCarreras): Observable<Resultado> {
    return this.httpClient.patch<Resultado>(`${this.baseURL}/carrera`, datosCarrera );
  }

}
