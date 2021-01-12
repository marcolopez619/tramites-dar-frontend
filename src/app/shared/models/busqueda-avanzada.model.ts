export interface BusquedaAvanzadaModel {
  idPersonaLogin?: number;
  hojaRuta?: string;
  numeroCite?: string;
  idDocumentoTipo?: number;
  referencia?: string;
  idDestinatario?: number;
  idRemitente?: number;
  fechaInicio?: Date;
  fechaFinal?: Date;
  idBandeja?: number;
}

export interface BusquedaAvanzadaResult {
  idHojaRuta?: number;
  HojaRuta?: string;
  TipoRemitente?: string;
  Remitente?: string;
  TipoDocumento?: string;
  NumeroCite?: string;
  Destinatario?: string;
  Referencia?: string;
  Fecha?: Date;
  Estado?: string;
}
