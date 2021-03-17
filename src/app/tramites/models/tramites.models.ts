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

export interface BandejaSuspencion extends BandejaAbstract{
  idSuspencion?: number;
  idCarrera?: number;
  carrera?: string;
  tiempo?: string;
  fechaInicio?: Date;
  fechaFinal?: Date;
  motivo?: string;
  fechaSolicitud?: Date;
}
export interface BandejaReadmision extends BandejaAbstract{
  idReadmision?: number;
  idCarrera?: number;
  carrera?: string;
  fechaSolicitudSuspencion?: Date;
  fechaSolicitudReadmision?: Date;
  tiempo?: string;
}
export interface BandejaTraspasoUniversidad extends BandejaAbstract{
  idTramite?: number;
  idUniversidadDestino?: number;
  universidadDestino?: string;
  idCarreraDestino?: number;
  carreraDestino?: string;
  idPeriodo?: number;
  periodo?: string;
  motivo?: string;
  fechaSolicitud?: Date;
}

export interface BandejaDar extends BandejaAbstract{
  idSolicitudTramite?: number;
  nombreCompleto?: string;
  idTipoTramite?: number;
  descTipoTramite?: string;
  fechaSolicitud?: Date;
}
