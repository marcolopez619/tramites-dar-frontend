import { OpcionBandeja } from '../../bandeja-principal/models/bandeja-principal.model';

export class OpcionesBandejaDefault{

  static readonly LISTA_OPCIONES_BANDEJA: Array<OpcionBandeja> = [
    /* {
    id : 1,
    displayName: 'PRINCIPAL',
    icono: 'home',
    children: undefined
   }, */
   {
     id : 2,
     displayName : 'CITES',
     icono : 'folder_open',
     children : [{
        id : 3,
        displayName : 'Creadas',
        icono : 'folder',
        children: undefined
     }]
   },
   {
     id : 4,
     displayName : 'HOJAS DE RUTA',
     icono : 'description',
     children: [
      {
        id : 6,
        displayName : 'Principal',
        icono : 'home',
        children : undefined
      },
      {
        id : 7,
        displayName : 'Recibido',
        icono : 'how_to_reg',
        children : undefined
      }, {
        id : 8,
        displayName : 'Enviado',
        icono : 'search',
        children : undefined
      }, {
        id : 9,
        displayName : 'Rechazado',
        icono : 'swap_horiz',
        children : undefined
      }, {
        id : 10,
        displayName : 'Pendiente',
        icono : 'waves',
        children : undefined
      }, {
        id : 11,
        displayName : 'Proceso',
        icono : 'edit',
        children : undefined
      }, {
        id : 12,
        displayName : 'Finalizado',
        icono : 'ballot',
        children : undefined
      }
     ]
   },
   {
     id : 13,
     displayName : 'OPCIONES',
     icono : 'filter_list',
     children : [{
      id : 14,
      displayName : 'Busqueda',
      icono : 'search',
      children: undefined
   }]
   }
  ];


}// fin clase

