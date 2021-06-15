export interface TramiteModel {
  idTramite?: number;
  descripcionTramite?: string;
}

export interface TipoCarrera{
  idTipoCarrera: number;
  tipoCarrera: string;
}


/** MODELO DE INSERCION DE DATOS **/
export interface HabilitacionTramiteModelInsert{
  fechaInicial?: Date;
  fechaFinal?: Date;
  estado?: number;
  idPeriodoGestion?: number;
  idTramite?: number;
  idTipoCarrera: number;
}

export interface HabilitacionTramiteModelUpdate extends HabilitacionTramiteModelInsert{
  idHabilitacionTramite?: number;
}

export interface EstadoTramiteUpdate{
  idTipoTramite?: number;
  idEstudianteTipoTramite?: number;
  estado?: number;
}


export interface TablaIntermediaInsert{
  idTipoTramite?: number;
  idEstudianteTipoTramite?: number;
  idEstado?: number;
  idEntidad?: number;
  observaciones?: string;
}
