
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
  codigoRespuesta?: number;
  mensaje?: string;
  idHojaRuta?: number;
  idDerivacion?: number;
  numero?: number;
  referencia?:string;
  gestion?: number;
  urgente?: number;
  plazoTotal?: number;
  tipoTramite?: number;
  tipoTramiteDes?:string;
  fechaDeriva?: Date;
  fechaAcepta?: Date;
  asunto?:string;
  fisico?: number;
  plazo?: number;
}

