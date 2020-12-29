import { BaseComponent } from './../../../shared/base.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { OpcionBandeja } from '../../models/bandeja-principal.model';

@Component({
  selector: 'app-opciones-bandeja',
  templateUrl: './opciones-bandeja.component.html',
  styleUrls: ['./opciones-bandeja.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class OpcionesBandejaComponent extends BaseComponent implements OnInit {

  listaOpcionesBandeja : Array<OpcionBandeja> = [{
    id : 1,
    displayName: 'PRINCIPAL',
    icono: 'home',
    children: undefined
   },{
     id : 2,
     displayName : 'CITES',
     icono : 'folder_open',
     children : [{
        id : 3,
        displayName : 'Creadas',
        icono : 'folder',
        children: undefined
      }
     ]
   },
   {
     id : 4,
     displayName : 'HOJAS DE RUTA',
     icono : 'description',
     children: [
      {
        id : 5,
        displayName : 'Recibidos',
        icono : 'how_to_reg',
        children : undefined
      },{
        id : 6,
        displayName : 'Enviados',
        icono : 'search',
        children : undefined
      },{
        id : 7,
        displayName : 'Pendientes',
        icono : 'waves',
        children : undefined
      },{
        id : 8,
        displayName : 'En Proceso',
        icono : 'edit',
        children : undefined
      },{
        id : 9,
        displayName : 'Finalizados',
        icono : 'ballot',
        children : undefined
      }
     ]
   }
  ];

  @Output()
  onOpcionClick = new EventEmitter();

  constructor() { super(); }

  ngOnInit(): void {
    // ..
  }

  onSelectedButton(pParam: any): void {
    this.onOpcionClick.next( pParam.displayName );
    // console.log( 'Opcione seleccionada : ' + pParam );
  }
}
