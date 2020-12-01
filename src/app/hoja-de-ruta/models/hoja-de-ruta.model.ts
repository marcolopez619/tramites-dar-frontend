export interface HojaDeRutaModel {
  idHojaRuta?: number;
  tipoRemitente?: number;
  listeRemitentes?: Array<string>;
  listeCC?: Array<string>;
  numeroCite?: string;
  numeroFojas?: number;
  referencia?: string;
  listeDestinatarios?: Array<string>;
  urgente?: boolean;
  conCopiaFisica?: boolean;
  plazo?: number;
  // TODO : AÑADIR EL ATRIBUTO QUE MAPEE A LA LISTA DE DOCUMENTOS ADJUNTO
}

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
export interface DestinatarioModel {
  idDestinatario?: number;
  descripcionDestinatario?: string;
}
