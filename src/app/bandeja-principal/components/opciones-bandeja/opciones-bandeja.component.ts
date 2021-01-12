import { BaseComponent } from './../../../shared/base.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { OpcionBandeja } from '../../models/bandeja-principal.model';
import { OpcionesBandejaDefault } from '../../../shared/models/opciones-bandeja.model';

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

  onSelectedButton(pParam: any): void {
    this.onOpcionClick.next( pParam.displayName );
    // console.log( 'Opcione seleccionada : ' + pParam );
  }
}
