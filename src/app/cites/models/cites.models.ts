import { UsuarioModel, DestinatarioModel } from '../../shared/models/Usuario.model';
export interface CiteModel {
  IidPersonaGd?: number;
  IidDocumentoEmite?: number;
  IidPersonaGdSol?: number;
  Ireferencia?: string;
  IDestPara?: string;
  IDestVia?: string;
  IDestCopia?: string;
  IUsuarioBitacora?: string;
}

export interface CiteModelByUsuario{
  idCite?: number;
  tipoTramite?: string;
  tipoDocumento?: string;
  numeroCite?: string;
  destinatario?: Array<DestinatarioModel>;
  referencia?: string;
  fechaCreacion?: Date;
  estado?: string;
  poseeDocAdjunto?: boolean;
  pathArchivo?: string;
  isRowMouseOver?: boolean;
}

export interface ResultCiteInst {
  codigoRespuesta?: number;
  mensaje?: string;
  idDocumentoSolicitado?: number;
  cite?: string;
  referencia?: string;
  gestion?: number;
}

export interface CiteTemplateJsReport {
  Cite?: string;
  DescripcionTipoDocumento?: string;
  ListaRemitente?: Array<UsuarioModel>;
  ListaVias?: Array<UsuarioModel>;
  ListaDestinatarios?: Array<UsuarioModel>;
  Referencia?: string;
  FechaCreacionLiteral?: string;
}
