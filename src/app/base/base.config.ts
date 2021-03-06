import { VERSION } from '../../environments/version';

// Objeto que contiene datos de la aplicacion.
export const baseConfig = {
    version: VERSION,
    nombreSistema: 'Sistema de Trámites Académicos - D.A.R.',
    paginatorSize: 10,
    paginatorOptions: [5, 10, 15],
    versionBase: '1.0.2',
    headerNotificador: 'X-Notificador',
    headerProgressbar: 'X-Progressbar'
};
