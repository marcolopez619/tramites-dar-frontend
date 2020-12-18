import { Injectable } from '@angular/core';
import { eTipoArchivo } from '../enums/tipo-archivo.enum';
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

    /**
     * Crea un documento de tipo 'pTipoArchivo' a partir de un blob o buffer.
     *
     * @param {Blob} pBlob
     * @param {string} [pTpoArchivo] Tipo de archivo, si no se especifica se asigna tipo WORD @see eTipoArchivo
     * @param {string} [pNnombreArchivo] Nombre del archivo, si no se especifica, se toma la hora del sistema
     * @memberof UtilService
     */
    createDocumentFromBlob( pBlob: Blob, pTpoArchivo?: string, pNnombreArchivo?: string): void {
      const tipoArchivo = pTpoArchivo ? pTpoArchivo : eTipoArchivo.Word;
      const nombreArchivo = pNnombreArchivo ? pNnombreArchivo : `archivo-${new Date().getTime()}`;

      const blob = new Blob([<any> pBlob], {type: `${tipoArchivo}`});
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.download = `${nombreArchivo}`;
      anchor.href = url;
      anchor.click();
    }
}
