export interface TraspasoUniversidad{
  universidadDestino?: Universidad;
  carreraDestino?: Carrera;
  motivoTraspaso?: MotivoTraspaso;
  descripcionTraspaso?: string;
}

export interface AllInformationUniversity{
  idUniversidad?: number;
  universidad?: string;
  estadoUniversidad?: number;
  idFacultad?: number;
  facultad?: string;
  estadofacultad?: number;
  idCarrera?: number;
  carrera?: string;
  estadoCarrera?: number;
}

export interface Universidad {
  idUniversidad?: number;
  nombre?: string;
  estado?: number;
}

export interface Carrera {
  idCarrera?: number;
  nombre?: string;
  estado?: number;
}

export interface MotivoTraspaso{
  idMotivoTraspaso?:  number;
  motivoTraspaso?: string;
}
