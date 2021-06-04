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

export interface BandejaCambioCarrera {
  idEstudiante?: number;
  ru?: number;
  ci?: string;
  complemento?: string;
  paterno?: string;
  materno?: string;
  nombres?: string;
  fechaNacimiento?: Date;
  idCambioCarrera?: number;
  idCarreraOrigen?: number;
  carreraOrigen?: string;
  idCarreraDestino?: number;
  carreradestino?: string;
  fechaSolicitud?: Date;
  motivo?: string;
  fechaProceso?: Date;
  observaciones?: string;
  idTramite?: number;
  tramite?: string;
  idEstado?: number;
  estado?: string;
  idEntidad?: number;
  entidad?: string;

}

export interface BandejaTranseferencia {
  idEstudiante?: number;
  ru?: number;
  ci?: string;
  complemento?: string;
  paterno?: string;
  materno?: string;
  nombres?: string;
  fechaNacimiento?: Date;
  idTransferencia?: number;
  idCarreraOrigen?: number;
  carreraOrigen?: string;
  idCarreraDestino?: number;
  carreradestino?: string;
  fechaSolicitud?: Date;
  motivo?: string;
  fechaProceso?: Date;
  observaciones?: string;
  idTramite?: number;
  tramite?: string;
  idEstado?: number;
  estado?: string;
  idEntidad?: number;
  entidad?: string;
}

export interface BandejaSuspencion {
  idEstudiante?: number;
  ru?: number;
  ci?: string;
  complemento?: string;
  paterno?: string;
  materno?: string;
  nombres?: string;
  fechaNacimiento?: Date;
  idSuspencion?: number;
  idCarrera?: number;
  carrera?: string;
  tiempoSolicitado?: number;
  descripcionMotivo?: string;
  fechaSolicitud?: Date;
  descripcion?: string;
  fechaProceso?: Date;
  observaciones?: string;
  idTramite?: number;
  tramite?: string;
  idEstado?: number;
  estado?: string;
  idEntidad?: number;
  entidad?: string;
}
export interface BandejaReadmision {
  idEstudiante?: number;
  ru?: number;
  ci?: string;
  complemento?: string;
  paterno?: string;
  materno?: string;
  nombres?: string;
  fechaNacimiento?: Date;
  idReadmision?: number;
  idCarrera?: number;
  carrera?: string;
  fechaSolicitud?: Date;
  motivo?: string;
  fechaProceso?: Date;
  observaciones?: string;
  idTramite?: number;
  tramite?: string;
  idEstado?: number;
  estado?: string;
  idEntidad?: number;
  entidad?: string;
  suspencion: SuspencionModel;
}
export interface BandejaTraspasoUniversidad {
  idEstudiante?: number;
  ru?: number;
  ci?: string;
  complemento?: string;
  paterno?: string;
  materno?: string;
  nombres?: string;
  fechaNacimiento?: Date;
  idTraspaso?: number;
  idUnivDestino?: number;
  universidaddestino?: string;
  idCarrera?: number;
  carreradestino?: string;
  descripcionMotivo?: string;
  anioIngreso?: number;
  materiasAprobadas?: number;
  materiasReprobadas?: number;
  fechaSolicitud?: Date;
  periodo?: string;
  motivo?: string;
  fechaProceso?: Date;
  observaciones?: string;
  idTramite?: number;
  tramite?: string;
  idEstado?: number;
  estado?: string;
  idEntidad?: number;
  entidad?: string;
}

export interface BandejaDar extends BandejaDirector {
  /* idEstudiante?: number;
  paterno?: string;
  materno?: string;
  nombres?: string;
  carrera?: string;
  idEstudianteTramite?: number;
  fechaSolicitud?: Date;
  estado?: number;
  idTipoTramite?: number;
  idTramite?: number;
  tipoTramite?: string; */
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
  idEstudianteTipoTramiteTablaIntermedia?: number;
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
  sigla?: string;
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
  fechaHabilitacion: Date;
  fechaRegularizacion: Date;
  motivo?: string;
  estado?: number;
  tramite?: string;
}

export interface BandejaUsuarios extends BandejaAbstract {
  idUsuario?: number;
  paterno?: string;
  materno?: string;
  nombres?: string;
  nickName?: string;
  password?: string;
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
  // fechaInicial?: Date;
  // fechaFinal?: Date;
  fechaRegularizacion: Date;
  idPeriodoGestion: number;
  idEstudiante: number;
  idTramite: number;
  motivoHabilitacion: string;
  estado: number;
}
