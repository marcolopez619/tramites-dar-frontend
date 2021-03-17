export interface EstudianteModel{
  ru?: number;
  ci?: string;
  nombreCompleto?: string;
  fotografia?: string;
  idCarrera?: number;
  carrera?: string;
  idFacultad?: number;
  facultad?:string;
  tipoTramite?: string;
  fechaSolicitud?: Date;
  anioIngreso?: number;
  cantMateriasAprobadas?: number;
  cantMateriasReprobadas?: number;
  promedioGeneral?: number;
}
