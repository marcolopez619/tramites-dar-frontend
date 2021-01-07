import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Resultado } from "../shared/models/resultado.model";
import { ContextoService } from "../shared/services/contexto.service";

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
}
