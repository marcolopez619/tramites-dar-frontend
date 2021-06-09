import { ImpresionFormularioCambioCarrera } from './cambio_carrera.model';

export interface TransferenciaInsert {
  idCarreraOrigen?: number;
  idCarreraDestino?: number;
  motivo?: string;
  idEstudiante?: number;
  idTramite?: number;
  idEstado?: number;
  idEntidad?: number;
  observaciones?: string;
}

export interface ImpresionFormularioTransferenciaCarrera extends ImpresionFormularioCambioCarrera {
}
