import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../shared/models/resultado.model';
import { ContextoService } from '../shared/services/contexto.service';
import { HojaDeRutaAceptarModel } from './models/hoja-de-ruta-aceptar.model';
import { HojaRutaFinalizarPatch } from './models/hoja-de-ruta.model';
import { HojaRutaDerivaModel } from './models/hoja-ruta-deriva.model';
import { HojaRutaRechazarModel } from './models/hoja-ruta-rechazar.model';
import { ParticipanteInsertModel } from './models/participante.model';

@Injectable()
export class HojaDeRutaService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/HojaDeRuta');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) {}

  getAllHojaRutaBandeja(idPersonaGd: number, tipoBandeja: string): Observable<Resultado> {
    const headers = new HttpHeaders().set('X-Notificador', 'false');
    return this.httpClient.get<Resultado>( `${this.baseURL}/bandeja/${idPersonaGd}/${tipoBandeja}`, {headers : headers } );
  }

  createParticipante(pParticipanteInsert: ParticipanteInsertModel ): Observable<Resultado> {
    return this.httpClient.post<Resultado>(`${this.baseURL}/participante`, pParticipanteInsert );
  }

  getAllHojaRutaSeguimiento(idHojaRuta: number): Observable<Resultado> {
    return this.httpClient.get<Resultado>( `${this.baseURL}/seguimiento/${idHojaRuta}`);
  }
  createHojaRutaDeriva(pHojaRutaDeriva: HojaRutaDerivaModel): Observable<Resultado> {
    return this.httpClient.post<Resultado>( `${this.baseURL}/derivar`, pHojaRutaDeriva);
  }
  getHojaRutaInstructiva(): Observable<Resultado> {
    return this.httpClient.get<Resultado>( `${this.baseURL}/instructiva`)
  }

  FinalizarHojaRuta(pHojaRHData: HojaRutaFinalizarPatch ): Observable<Resultado> {
    return this.httpClient.patch<Resultado>(`${this.baseURL}/finalizar`, pHojaRHData );
  }
  hojaRutaAceptar(pHojaRutaDeriva: HojaDeRutaAceptarModel): Observable<Resultado> {
    return this.httpClient.post<Resultado>( `${this.baseURL}/aceptar`, pHojaRutaDeriva);
  }
  hojaRutaRechazar(pHojaRutaDeriva: HojaRutaRechazarModel): Observable<Resultado> {
    return this.httpClient.post<Resultado>( `${this.baseURL}/rechazar`, pHojaRutaDeriva);
  }
}
