export interface TraspasoUniversidad{
  universidadDestino?: Universidad;
  carreraDestino?: Carrera;
  motivoTraspaso?: MotivoTraspaso;
  descripcionTraspaso?: string;
}

export interface Universidad {
  idUniversidad?: number;
  descUniversidad?: string;
}

export interface Carrera {
  idCarrera?: number;
  descCarrera?: string;
}

export interface MotivoTraspaso{
  idMotivoTraspaso?:  number;
  motivoTraspaso?: string;
}
