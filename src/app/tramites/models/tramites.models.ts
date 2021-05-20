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

export interface BandejaTranseferencia extends BandejaAbstract {
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
  idMotivo?: number;
  descripcionMotivo?: string;
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
  idMotivo?: number;
  descripcionMotivo?: string;
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

export interface BandejaDirector {
  idEstudiante?: number;
  ru?: number;
  ci?: string;
  complemento?: string;
  paterno?: string;
  materno?: string;
  nombres?: string;
  fechaNacimiento?: Date;
  sexo?: string;
  idTipoTramite?: number;
  fechaSolicitud?: Date;
  idCarreraOrigen?: number;
  carrera?: string;
  motivo?: string;
  idEstudianteTipoTramite?: number;
  fechaProceso?: Date;
  observaciones?: string;
  idTramite?: number;
  tramite?: string;
  idEstado?: number;
  estado?: string;
  idEntidad?: number;
  entidad?: string;
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
  idUniversidad?: number;
}
export interface BandejaCarreras extends BandejaAbstract {
  idCarrera?: number;
  nombre?: string;
  estado?: number;
  idFacultad?: number;
}

export interface BandejaHabilitacionPorExcepcion  extends BandejaAbstract {
  ci?: string;
  complemento?: string;
  nombrecompleto?: string;
  carrera?: string;
  tiempo?: string;
  idHabilitacionPorExcepcion?: number;
  fechaInicial?: Date;
  fechaFinal?: Date;
  estado?: number;
  tramite?: string;
}

export interface BandejaUsuarios extends BandejaAbstract {
  idUsuario?: number;
  password?: string;
  nombre?: string;
  celular?: string;
  estado?: number;
  idPerfil?: number;
  nombrePerfil?: string;
  idCarrera?: number;
  carrera?: string;
}

export interface BusquedaEstudianteResponse {
  idFacultad?: number;
  facultad?: string;
  idCarrera?: number;
  carrera?: string;
  idEstudiante?: number;
  ru?: number;
  ci?: string;
  complemento?: string;
  paterno?: string;
  materno?: string;
  nombres?: string;
  fechaNacimiento?: Date;
  sexo?: boolean;
  nombreCompleto?: string;

}

export interface HabilitacionPorExcepcionInsert {
  fechaInicial?: Date;
  fechaFinal?: Date;
  idEstudiante?: number;
  idTramite?: number;
  estado?: number;
}
