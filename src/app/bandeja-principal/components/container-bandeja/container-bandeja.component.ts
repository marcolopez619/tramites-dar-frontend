import { Component, OnInit } from '@angular/core';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';

@Component({
  selector: 'app-container-bandeja',
  templateUrl: './container-bandeja.html',
  styleUrls: ['./container-bandeja.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class ContainerBandejaComponent extends BaseComponent implements OnInit {

  opcionSelectedFromEmiter: string;

  constructor() { super(); }

  ngOnInit(): void {
    // ..
  }

  captureValueFromEmiter($event): void {
    // console.log( '*** Valor capturado : ' + $event );
    this.opcionSelectedFromEmiter = $event;
  }

}
