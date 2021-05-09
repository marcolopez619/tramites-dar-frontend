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

export interface BandejaTranseferencia extends BandejaAbstract{
  idTransferencia?: number;
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
  tipoTramite?: string;
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
  tipoTramite?: string;
  estado?: number;

  suspencion?: SuspencionModel;
}
export interface BandejaTraspasoUniversidad extends BandejaAbstract {
  idTraspaso?: number;
  iduniversidaddestino?: number;
  nombreuniversidaddestino?: string;
  idcarreradestino?: number;
  nombrecarreradestino?: string;
  periodo?: string;
  fechaSolicitud?: Date;
  motivo?: string;
  anioingreso?: number;
  materiasaprobadas?: number;
  materiasreprobadas?: number;
  tipoTramite?: string;
  estado?: number;
}

export interface BandejaDar extends BandejaAbstract {
  idEstudiante?: number;
  paterno?: string;
  materno?: string;
  nombres?: string;
  carrera?: string;
  idEstudianteTramite?: number;
  fechaSolicitud?: Date;
  estado?: number;
  idTipoTramite?: number;
  idTramite?: number;
  tipoTramite?: string;
}

export interface BandejaUniversidades extends BandejaAbstract {
  idUniversidad?: number;
  nombre?: string;
  estado?: number;
}
export interface BandejaFacultad extends BandejaAbstract {
  idFacultad?: number;
  nombre?: string;
  estado?: number;
  idUniversidad? : number;
}
export interface BandejaCarreras extends BandejaAbstract {
  idCarrera?: number;
  nombre?: string;
  estado?: number;
  idFacultad?: number;
}
