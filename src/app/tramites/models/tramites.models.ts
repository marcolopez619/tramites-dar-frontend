import { BandejaAbstract } from "../../shared/models/abstract.models";

export interface BandejaTramite extends BandejaAbstract {
  idTramite?: number;
  tramite?: string;
  gestion?: number;
  fechaInicio?: Date;
  fechaFinal?: Date;
}
