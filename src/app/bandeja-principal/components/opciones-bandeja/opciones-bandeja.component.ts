import { BaseComponent } from './../../../shared/base.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { OpcionBandeja } from '../../models/bandeja-principal.model';
import { OpcionesBandejaDefault } from '../../../shared/models/opciones-bandeja.model';
import { ppid } from 'process';

@Component({
  selector: 'app-opciones-bandeja',
  templateUrl: './opciones-bandeja.component.html',
  styleUrls: ['./opciones-bandeja.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class OpcionesBandejaComponent extends BaseComponent implements OnInit {

  listaOpcionesBandeja: Array<OpcionBandeja> = OpcionesBandejaDefault.LISTA_OPCIONES_BANDEJA;

  isOpenSidenav = false;

  @Output()
  onOpcionClick = new EventEmitter();

  constructor() { super(); }

  ngOnInit(): void {
    // ..
  }

  onSelectedButton(pParam: OpcionBandeja): void {

    this.listaOpcionesBandeja.forEach(element => {
      element.children.forEach(otro => {
        otro.isMouseEnter = false;
      });
    });

    if (pParam.displayName === 'Creadas' ) {
      this.listaOpcionesBandeja[ 0 ].children[ 0 ].isMouseEnter = true;
    } else if ( pParam.displayName === 'Busqueda' ) {
      this.listaOpcionesBandeja[ 2 ].children[ 0 ].isMouseEnter = true;
    } else {
      this.listaOpcionesBandeja[ 1 ].children.find( x => x.id === pParam.id ).isMouseEnter = true;
    }

    this.onOpcionClick.next( pParam.displayName );
    // console.log( 'Opcione seleccionada : ' + pParam );
  }

}
