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
    estado_entrada?: string;
    estado_proceso?: string;
    fecha_entrada?: Date;
    fecha_proceso?: Date;
    asunto?: string;
    plazoDias?: number;
    participantes?: [];
    adjuntos?: Array<any>;
  }
