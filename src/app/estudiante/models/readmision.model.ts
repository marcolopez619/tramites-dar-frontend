import { SuspencionModel } from './suspencion.model';

export interface ReadmisionInsert {
  idCarrera?: number;
  motivo?: number;
  idSuspencion?: number;
  idEstudiante?: number;
  idTramite?: number;
  idEstado?: number;
  idEntidad?: number;
  observaciones?: number;
}

export interface ImpresionFormularioReadmision {
  ru: number;
  ci: string;
  complemento: string;
  nombrecompleto: string;
  carrera: string;
  facultad: string;
  costoTramite: number;
  periodo: string;
  idReadmision: number;
  fechaSolicitud: Date;
  motivo: string;
  suspencion: SuspencionModel;
}
