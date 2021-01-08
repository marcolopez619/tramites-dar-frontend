export interface SeguimientoModel {
    idHojaruta? : number;
    numeroHojaRuta?: string;
    referencia?: string;
    seguimiento?: Array<DetalleSeguimientoModel>;
  }

  export interface DetalleSeguimientoModel {
    idHojaruta? : number;
    idPersonaGr?: number;
    remitente?: string;
    cargo?: string;
    idEstado?: number;
    estadoInicio?: string;
    estadoFin?: string;
    fechaInicio?: Date;
    fechaFin?: Date;
    asunto?: string;
    plazoDias?: number;
    participantes?: string;
    adjunto?: File;
  }
