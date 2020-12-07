import { BaseComponent } from './../../../shared/base.component';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';

@Component({
  selector: 'app-opciones-bandeja',
  templateUrl: './opciones-bandeja.component.html',
  styleUrls: ['./opciones-bandeja.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class OpcionesBandejaComponent extends BaseComponent implements OnInit {

  listaOpcionesBandeja = [
    'PRINCIPAL',
    'PENDIENTES',
    'EN PROCESO',
    'FINALIZADOS'
  ];

  @Output()
  onOpcionClick = new EventEmitter();

  constructor() { super(); }

  ngOnInit(): void {
    // ..
  }

  onSelectedButton(pParam: any): void {
    this.onOpcionClick.next( pParam );
    // console.log( 'Opcione seleccionada : ' + pParam );
  }
}
