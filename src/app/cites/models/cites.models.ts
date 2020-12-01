export interface CiteModel {
  idCiteModel?: number;
  tipoDocumento?: string;
  numeroCite?: string;
  vias?: Array<string>;
  destinatarios?: Array<string>;
  referencia?: string;
  fechaCreacion?: Date;
}
