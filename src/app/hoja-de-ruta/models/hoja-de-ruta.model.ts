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
/*
export interface TipoTramiteModel {
  idTipoTramite?: number;
  descripcionTipoTramite?: string;
}
export interface RemitenteModel {
  idRemitente?: number;
  descripcionRemitente?: string;
}
export interface CCModel {
  idCC?: number;
  descripcionCC?: string;
}
*/
/* export interface DestinatarioModel {
  idDestinatario?: number;
  descripcionDestinatario?: string;
} */
