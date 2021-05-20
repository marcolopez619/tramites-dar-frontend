import { BandejaAbstract } from '../../shared/models/abstract.models';

export interface BandejaAnulacion extends BandejaAbstract {
  idEstudiante?: number;
  ru?: number;
  ci?: string;
  complemento?: string;
  paterno?: string;
  materno?: string;
  nombres?: string;
  fechaNacimiento?: Date;
  sexo?: boolean;
  idAnulacion?: number;
  fechaSolicitud?: Date;
  idCarreraOrigen?: number;
  carrera?: string;
  motivo?: string;
  fechaProceso?: Date;
  observaciones?: string;
  idTramite?: number;
  tramite?:string;
  estado?: number;
  idEntidad?: number;
  entidad?: string;
}

export interface AnulacionInsert {
  motivo?: string;
  idCarreraOrigen?: number;
  idEstudiante?: number;

  idTramite?: number;
  idEstado?: number;
  idEntidad?: number;
  observaciones?: string;
}
