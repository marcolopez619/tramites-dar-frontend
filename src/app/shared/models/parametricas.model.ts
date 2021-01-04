export interface TipoDocumentoModel {
  idUnidadOrg?: number;
  nombre?: string;
  sigla?: string;
  descripcionOrg?: string;
  idDocumentoTipo?: number;
  descripcionDoc?: string;
  abreviacion?: string;
  idDocumentoEmite?: number;
}

export interface TipoTramiteModel {
  idTipoTramite?: number;
  descripcionTramite?: string;
  codigoRespuesta?: number;
  mensaje?: string;
}
