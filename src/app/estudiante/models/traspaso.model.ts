export interface TraspasoInsert {
  idUnivDestino ?: number;
  idCarreraDestino?: number;
  descripcion ?: string;
  anioIngreso ?: number;
  materiasAprobadas ?: number;
  materiasReprobadas ?: number;
  motivo ?: string;
  idEstudiante ?: number;

  idTramite ?: number;
  idEstado ?: number;
  idEntidad ?: number;
  observaciones ?: string;
}
