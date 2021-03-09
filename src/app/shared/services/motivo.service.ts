import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { MotivoSuspencion } from '../models/motivos.models';
import { Resultado } from '../models/resultado.model';
import { ContextoService } from './contexto.service';

@Injectable()
export class MotivoService {

  readonly baseURL = this.contextoService.getConfig(`backendApi`).concat('/algo');

  constructor(
    private httpClient: HttpClient,
    private contextoService: ContextoService
  ) {}

  getMotivoSuspencion(): Observable<Resultado> {
    // const params = new HttpParams().set( 'idTipoTramite' , pIdtipoTramite.toString() );
    // return this.httpClient.get<Resultado>(`${this.baseURL}/usuario`, { params: params});
    const data : Array<MotivoSuspencion> = [{
      idMotivoSuspencion : 1,
      motivoSuspencion : 'LABORAL'
    },{
      idMotivoSuspencion : 2,
      motivoSuspencion : 'FAMILIAR'
    },{
      idMotivoSuspencion : 3,
      motivoSuspencion : 'OTRO'
    }];



    const resultado: Resultado = {
      data   : data,
      message: 'SE ENCONTRARON RESULTADO',
      error  : undefined
    }

    return of(resultado);

  }

}
