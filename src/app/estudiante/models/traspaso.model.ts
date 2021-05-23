export interface TraspasoInsert {
  idUnivDestino ?: number;
  idCarreraDestino?: number;
  idCarreraOrigen: number;
  descripcion ?: string;
  anioIngreso ?: number;
  materiasAprobadas ?: number;
  materiasReprobadas ?: number;
  idMotivo ?: number;
  idEstudiante ?: number;

  idTramite ?: number;
  idEstado ?: number;
  idEntidad ?: number;
  observaciones ?: string;
}
