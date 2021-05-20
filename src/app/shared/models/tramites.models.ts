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

export interface HabilitacionTramiteModelUpdate extends HabilitacionTramiteModelInsert{
  idHabilitacionTramite?: number;
}

export interface EstadoTramiteUpdate{
  idTipoTramite?: number;
  idEstudianteTipoTramite?: number;
  estado?: number;
}
