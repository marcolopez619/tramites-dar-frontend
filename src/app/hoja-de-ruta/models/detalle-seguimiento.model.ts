export interface DetalleSeguimientoModel {
    remitente?: string;
    estadoInicio?: string;
    estadoFin?: string;
    fechaInicio?: Date;
    fechaFin?: Date;
    adjunto?: File;
    proveido?: string;
  }