import { SuspencionModel } from '../../estudiante/models/suspencion.model';
import { BandejaAbstract } from '../../shared/models/abstract.models';

export interface BandejaTramite extends BandejaAbstract {
  idTramite?: number;
  descripcionTramite?: string;
  idHabilitacionTramite?: number;
  fechaInicial?: Date;
  fechaFinal?: Date;
  estado?: number;
  gestion?: number;
}

export interface BandejaCambioCarrera extends BandejaAbstract {
  idCambioCarrera?: number;
  idCarreraOrigen?: number;
  carreraorigen?: string;
  idCarreraDestino?: number;
  carreradestino?: string;
  fechaSolicitud?: Date;
  motivo?: string;
  fechaProceso?: Date;
  observaciones?: string;
  idTramite?: number;
  tipoTramite?: string;
  estado?: number;
}

export interface BandejaSuspencion extends BandejaAbstract {
  idSuspencion?: number;
  idCarrera?: number;
  carrera?: string;
  tiempoSolicitado?: number;
  fechaSolicitud?: Date;
  motivo?: string;
  fechaProceso?: Date;
  observaciones?: string;
  idTramite?: number;
  tipoTramite?: number;
  estado?: number;
}
export interface BandejaReadmision extends BandejaAbstract {
  idReadmision?: number;
  idCarrera?: number;
  carrera?: string;
  fechaSolicitudReadmision?: Date;
  motivo?: string;
  fechaProceso?: Date;
  observaciones?: string;
  idTramite?: number;
  tramite?: string;
  estado?: number;

  suspencion?: SuspencionModel;
}
export interface BandejaTraspasoUniversidad extends BandejaAbstract {
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

export interface BandejaDar extends BandejaAbstract {
  idSolicitudTramite?: number;
  nombreCompleto?: string;
  carrera?: string;
  idTipoTramite?: number;
  descTipoTramite?: string;
  fechaSolicitud?: Date;
}

export interface BandejaUniversidades extends BandejaAbstract {
  idUniversidad?: number;
  descUniversidad?: string;
}
export interface BandejaCarreras extends BandejaAbstract {
  idCarrera?: number;
  descCarrera?: string;
}
