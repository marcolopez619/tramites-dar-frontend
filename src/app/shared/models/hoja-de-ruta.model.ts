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
  ConCopiaFisica?: number;
  UsuarioBitacora?: string;
  RegistroBitacora?: string;
}


export interface HojaDeRutaRespInsert{
  codigoRespuesta?:number;
  gestion?:number;
  hojaRuta?:string;
  idHojaRuta?:number;
  mensaje?:string;
  numero?:number;
  plazoDias?:number;
  referencia?:string;
  urgente?:number;
}
