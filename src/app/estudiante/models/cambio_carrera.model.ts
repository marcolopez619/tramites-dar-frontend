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
