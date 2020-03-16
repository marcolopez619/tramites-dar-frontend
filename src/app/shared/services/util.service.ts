import { Injectable } from "@angular/core";
/**
 * Servicio que provee metodos utilitarios.
 *
 * @export
 * @class UtilService
 */
@Injectable()
export class UtilService {

    /**
     * Método que obtiene la fecha actual.
     *
     * @memberof UtilService
     */
    getFechaActual(): Date {
        return new Date();
    }
}
