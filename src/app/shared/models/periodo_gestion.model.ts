export interface PeriodoGestion {
  idPeriodoGestion?: number;
  periodo?: number;
  gestion?: number;
  estado?: Number;
  fechaModificacion?: Date;
}

export interface CalculoGestion{
  cantidadPeriodos: number;
  cantidadGestiones: number;
  gestionInicial: string;
  gestionFinal: string;
}
