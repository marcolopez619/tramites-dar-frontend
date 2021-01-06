export interface HojaDeRutaInsertModel {
  IdTipoTramite?: number;
  Gestion?: number;
  IdPersonaRemite?: number;
  IdPersonaDestinatario?: number;
  IdPersonaSolicita?: number;
  ListDestCopia?: string;
  ListCite?: string;
  ListCiteExt?: string;
  ListAdjunto?: string;
  Referencia?: string;
  PlazoDias?: number;
  Urgente?: number;
  UsuarioBitacora?: string;
  RegistroBitacora?: string;
}
