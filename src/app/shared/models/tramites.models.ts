export interface TramiteModel {
  idTramite?: number;
  descripcionTramite?: string;
}


/** MODELO DE INSERCION DE DATOS **/
export interface HabilitacionTramiteModelInsert{
  fechaInicial?: Date;
  fechaFinal?: Date;
  estado?: number;
  gestion?: number;
  idTramite?: number;
}
