import { Injectable } from '@angular/core';
import { baseLang } from '../../base/base.lang';
import { eModulo } from '../../shared/enums/modulo.enum';
import { ContextoService } from './contexto.service';
import { citesLang } from '../../cites/cites.langs';
import { hojaDeRutaLang } from '../../hoja-de-ruta/hoja-de-ruta.langs';
import { estudianteLang } from '../../estudiante/estudiante.langs';
import { tramiteLang } from '../../tramites/tramites.langs';
import { darLang } from '../../dar/dar.langs';
import { usuarioLang } from '../../usuarios/usuario.langs';
import { directorLang } from '../../director/director.langs';
import { reporteLang } from '../../reportes/reportes.langs';

/**
 * Servicio para manejar langs de forma global en el sistema.
 *
 * @export
 * @class LangService
 */
@Injectable()
export class LangService {

  // Langs de todos los modulos.
  private langs: Array<{ id: eModulo, contenido: any }> = [];

  /**
   * Ctor del servicio, carga los langs de todos los módulos.
   * @memberof LangService
   */
  constructor(private contextoService: ContextoService) {
    this.langs.push(
      {
        id: eModulo.Base,
        contenido: baseLang
      },
      {
        id: eModulo.Cites,
        contenido: citesLang
      },
      {
        id: eModulo.HojaDeRuta,
        contenido: hojaDeRutaLang
      },
      {
        id: eModulo.Estudiante,
        contenido : estudianteLang
      },
      {
        id: eModulo.Tramite,
        contenido : tramiteLang
      },
      {
        id: eModulo.Dar,
        contenido : darLang
      },
      {
        id: eModulo.Usuario,
        contenido : usuarioLang
      },
      {
        id: eModulo.Director,
        contenido : directorLang
      },
      {
        id: eModulo.Reporte,
        contenido : reporteLang
      }
      );
  }

  /**
   * Método para obtener un lang del objeto de langs cargados.
   *
   * @param {string} pModulo Identificador del modulo.
   * @param {string} pIdMensaje Identificador del mensaje.
   * @returns {string} Valor del lang.
   * @memberof ContextoService
   */
  getLang(pModulo: eModulo, pIdMensaje: string): string {

    // Obtiene idioma actual.
    const idioma = this.contextoService.idiomaSeleccionado;
    // Valida params de entrada.
    if (pModulo !== undefined && pIdMensaje !== undefined) {
      const lang = this.langs[pModulo].contenido[idioma][pIdMensaje];
      if (lang) {
        return lang;
      } else {
        return baseLang[idioma]['lang-error'];
      }
    } else {
      return baseLang[idioma]['lang-param-error'];
    }
  }
}
