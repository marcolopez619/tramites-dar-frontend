export interface OpcionBandeja {
  id?: number;
  displayName?: string;
  icono?: string;
  children?: Array<OpcionBandeja>;
  isMouseEnter?: boolean;
}
