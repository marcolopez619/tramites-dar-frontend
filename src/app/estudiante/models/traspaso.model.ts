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


export interface ImpresionFormularioTraspaso {
  idEstudiante: number;
  ru: number;
  ci: string;
  complemento: string;
  nombrecompleto: string;
  idTraspaso: number;
  idUnivDestino: number;
  universidaddestino: string;
  idCarreraDestino: number;
  carreradestino: string;
  idCarreraOrigen: number;
  carreraorigen: string;
  numerodiploma: string;
  periodo: string;
  promediogeneral: number;
  anioIngreso: number;
  descripcionMotivo: string;
  materiasAprobadas: number;
  materiasReprobadas: number;
  fechaSolicitud: Date;
  motivo: string;
}
