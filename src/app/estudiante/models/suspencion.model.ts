export interface SuspencionInsert{
  idEstudiante?: number;
  idCarrera?: number;
  tiempoSolicitado?: number;
  descripcion?: string;
  idMotivo?: number;
  idTramite?: number;
  idEstado?: number;
  idEntidad?: number;
  observaciones?: number;
}


export interface SuspencionModel{
  idSuspencion?: number;
  idCarrera?: number;
  tiempoSolicitado?: number;
  descripcion?:string;
  fechaSolicitud?: Date;
  motivo?: string;
  idEstudiante?: number;
}
