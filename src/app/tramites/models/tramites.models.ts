import { BandejaAbstract } from "../../shared/models/abstract.models";

export interface BandejaTramite extends BandejaAbstract {
  idTramite?: number;
  tramite?: string;
  gestion?: number;
  fechaInicio?: Date;
  fechaFinal?: Date;
}

export interface BandejaCambioCarrera extends BandejaAbstract{
  idCambioCarrera?: number,
  idOrigen?: number;
  origen?:string;
  idDestino?: number;
  destino?:string;
  fechaSolicitud?: Date;
  motivo?: string;
}
