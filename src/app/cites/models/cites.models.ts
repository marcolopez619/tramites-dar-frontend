import { UsuarioModel } from '../../shared/models/Usuario.model';
export interface CiteModel {
  idCiteModel?: number;
  tipoDocumento?: string;
  numeroCite?: string;
  vias?: Array<string>;
  destinatarios?: Array<string>;
  referencia?: string;
  fechaCreacion?: Date;
}

export interface CiteTemplateJsReport {
  DescripcionTramite?: string;
  ListaRemitente?: Array<UsuarioModel>;
  ListaVias?: Array<UsuarioModel>;
  ListaDestinatarios?: Array<UsuarioModel>;
  Referencia?: string;
  FechaCreacionLiteral?: string;
}
