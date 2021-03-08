import { BandejaAbstract } from "../../shared/models/abstract.models";

export interface BandejaAnulacion extends BandejaAbstract {
  idCarrera?: number;
  carrera?: string;
  fechaSolicitud?: Date;
  motivo?: string;
}
