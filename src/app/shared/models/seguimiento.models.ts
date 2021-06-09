export interface Seguimiento{
  idTramite: number;
  tramite: string;
  idEstado: number;
  estado: string;
  idEntidad: string;
  entidad: string;
  fechaProceso: Date;
  observaciones: string;
  idMotivo?: number;
  motivo: string;
}
