import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from '../shared/models/resultado.model';
import { ContextoService } from '../shared/services/contexto.service';
import { HojaRutaDerivaModel } from './models/hoja-ruta-deriva.model';
import { ParticipanteInsertModel } from './models/participante.model';

@Injectable()
export class HojaDeRutaService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/HojaDeRuta');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) {}

  getAllHojaRutaBandeja(idPersonaGd: number, tipoBandeja: string): Observable<Resultado> {
    return this.httpClient.get<Resultado>( `${this.baseURL}/bandeja/${idPersonaGd}/${tipoBandeja}`);
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
}
