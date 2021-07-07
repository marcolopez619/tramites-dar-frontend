import { ImpresionFormularioCambioCarrera } from './cambio_carrera.model';

export interface TransferenciaInsert {
  idCarreraOrigen?: number;
  idCarreraDestino?: number;
  idMotivo?: number;
  idEstudiante?: number;
  idTramite?: number;
  idEstado?: number;
  idEntidad?: number;
  observaciones?: string;
}

export interface ImpresionFormularioTransferenciaCarrera extends ImpresionFormularioCambioCarrera {
  idTransferencia: number;
}
