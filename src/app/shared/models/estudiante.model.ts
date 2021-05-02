export interface EstudianteModel {
  idFacultad?: number;
  facultad?: string;
  idCarrera?: number;
  carrera?: string;
  idEstudiante?: number;
  ru?: number;
  ci?: string;
  complemento?: string;
  paterno?: string;
  materno?: string;
  nombres?: string;
  nombreCompleto?: string;
  fechaNacimiento?: Date;
  sexo?: boolean;
  fotografia?: string;

  // Lo de abajo se utiliza en otros modulos, asi q ver la posibilidad de obtenerlo en la consulta de la inf del estudiante
  fechaSolicitud?: Date;
  tipoTramite?: string;
  anioIngreso?: number;
  cantMateriasAprobadas?: number;
  cantMateriasReprobadas?: number;
  promedioGeneral?: number;

  /* ru?: number;
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
  promedioGeneral?: number; */
}
