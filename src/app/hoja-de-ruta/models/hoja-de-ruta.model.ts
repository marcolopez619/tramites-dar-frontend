export interface Bitacora {
  usuarioBitacora?: string;
}

export interface HojaDeRutaModel {
  idHojaRutaModel?: number;
  tipoRemitente?: string;
  nombreRemitente?: string;
  tipoDocumento?: string;
  numeroCite?: string;
  destinatarios?: Array<string>;
  referencia?: string;
  estado?: string;
  idTipoRemitente?: number;
  idRemitente?: number;
  idDestinatario?: number;
  idCopiaCc?: number;
  nombreTipoRemitente?: string;
  nombreDestinatario?: string;
  nombreCopiaCc?: string;
  numeroHojaRuta?: string;
}
export interface HojaRutaBandejaModel {
  idHojaRuta?: number;
  idDerivacion?: number;
  numero?: number;
  referencia?: string;
  gestion?: number;
  urgente?: number;
  plazoTotal?: number;
  tipoTramite?: number;
  tipoTramiteDes?: string;
  fechaBandeja?: Date;
  asunto?: string;
  fisico?: number;
  plazo?: number;
  idRemitente?: number;
  nombreRemitente?: string;
  idDestinatario?: number;
  nombreDestinatario?: string;
  descripcionDoc?: string;
  idCite?: number;
  cite?: string;
  estado?: string;
  numeroHojaRuta?: string;
  listaAdjuntos?: string;
  idDerivacionParticipante?: number;
  codigoRespuesta?: number;
  mensaje?: string;
  isRowMouseOver?: boolean;
}

export interface HojaRutaFinalizarPatch extends Bitacora {
  idHojaRuta?: number;
  motivo?: string;
}

export interface HojaRutaAceptar extends Bitacora {
  idHojaRuta?: number;
  esFisico?: number;
}
