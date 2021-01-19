export interface HojaRutaReportModel {
  idHojaRuta?: number;
  numeroHojaRuta?: string;
  tipoHojaRuta?: string;
  procedencia?: string;
  numeroCite?: string;
  remitenteInicial?: string;
  fechaHoraInicial?: Date;
  destinatario?: string;
  referencia?: string;
  tipoDocumento?: string;
  numeroFojas?: number;
  conCopiaFisica?: string;
  urgente?: string;
}
