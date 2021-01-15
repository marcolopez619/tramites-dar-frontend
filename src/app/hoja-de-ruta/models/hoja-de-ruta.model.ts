export interface Bitacora{
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
  idDestinatario?:number;
  idCopiaCc?:number;
  nombreTipoRemitente?: string;
  //nombreRemitente?: string;
  nombreDestinatario?: string;
  nombreCopiaCc?: string;
  numeroHojaRuta?: string;
  // TODO : AÑADIR EL ATRIBUTO QUE MAPEE A LA LISTA DE DOCUMENTOS ADJUNTO
}
export interface HojaRutaBandejaModel{
  idHojaRuta?: number;
  idDerivacion?: number;
  numero?: number;
  referencia?: string;
  gestion?: number;
  urgente?: number;
  plazoTotal?: number;
  tipoTramite?: number;
  tipoTramiteDes?: string;
  fechaDeriva?: Date;
  fechaAcepta?: Date;
  asunto?: string;
  fisico?: number;
  plazo?: number;
  idRemitente?:number;
  nombreRemitente?: string;
  nombreDestinatario?: string;
  idDestinatario?: number;
  descripcionDoc?: string;
  cite?: string;
  estado?: string;
  codigoRespuesta?: number;
  mensaje?: string;
  isRowMouseOver?: boolean;
}


export interface HojaRutaFinalizarPatch extends Bitacora{
  idHojaRuta?: number;
  motivo?: string;
}

export interface HojaRutaAceptar extends Bitacora{
  idHojaRuta?: number;
  esFisico?: number;
}
