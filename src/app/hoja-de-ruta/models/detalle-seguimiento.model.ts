export interface SeguimientoModel {
    idHojaruta?: number;
    numeroHojaRuta?: string;
    referencia?: string;
    seguimiento?: Array<DetalleSeguimientoModel>;
  }

export interface DetalleSeguimientoModel {
    idHojaruta?: number;
    idPersonaGr?: number;
    remitente?: string;
    cargo?: string;
    idEstado?: number;
    estadoEntrada?: string;
    estadoProceso?: string;
    fechaEntrada?: Date;
    fechaProceso?: Date;
    asunto?: string;
    plazoDias?: number;
    participantes?: Array<Participante>;
    adjuntos?: Array<any>;
  }

export interface Participante {
  estado?: string;
  participante?: string;
  cargo?: string;
  mensaje?: string;
  fechaDerivacion?: Date;
  fechaResuelto?: Date;
  mensajeResuelto?: string;
  concluido?: string;
}
