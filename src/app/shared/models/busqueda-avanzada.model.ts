import { LoginComponent } from "../../base/login/login.component";

export interface BusquedaAvanzadaModel {
  NumeroHojaRuta?: string;
  NumeroCiteDocumento?: string;
  IdTipoDocumento?: number;
  Referencia?: string;
  IdDestinatario?: number;
  IdRemitente?: number;
  FechaRango?: Date;
  IdTipoBandeja?:number;
  IdTipoTramite?: number;
  fechaNacimiento?: Date;

  //comentario?: string;
}
/*
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
 */
