import { Component, OnInit } from '@angular/core';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';
import { BaseComponent } from '../../../shared/base.component';

@Component({
  selector: 'app-anulacion',
  templateUrl: './anulacion.component.html',
  styleUrls: ['./anulacion.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class AnulacionComponent extends BaseComponent  implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
