export interface DataTableHRMouseModel {
  descBandeja?: string;
  estados?: Array<Estado>;
}

export interface Estado {
  descEstado?: string;
  acciones?: Array<Accion>;
}

export interface Accion {
  descAccion?: string;
  tooltipText?: string;
  icono?: string;
}
