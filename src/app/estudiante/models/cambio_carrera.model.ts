export interface CambioCarreraInsert {
  idEstudiante?: number;
  idCarreraOrigen?: number;
  idCarreraDestino?: number;
  motivo?: string;
  idTramite?: number;
  idEstado?: number;
  idEntidad?: number;
  observaciones?: string;
}

export interface CambioCarreraUpdate {
  idCambioCarrera: number;
  convalidacion?: boolean;
}

export interface ImpresionFormularioCambioCarrera {
  idEstudiante: number;
  ru: number;
  ci: string;
  complemento: string;
  nombrecompleto: string;
  carreraOrigen: string;
  carreradestino: string;
  cantidadtraspasosrealizados: number;
  idCambioCarrera: number;
  fechaSolicitud: string;
  motivo: string;
  materiasaprobadas: number;
  materiasreprobadas: number;
  fechaProceso: Date;
  observaciones: string;
  costoTramite: number,
  periodo: string;
}
