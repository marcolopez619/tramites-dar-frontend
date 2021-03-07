import { BaseComponent } from './../../../shared/base.component';
import { Component, Input, OnInit } from '@angular/core';
import { LangService } from '../../../shared/services/lang.service';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';

@Component({
  selector: 'app-detalle-bandeja',
  templateUrl: './detalle-bandeja.component.html',
  styleUrls: ['./detalle-bandeja.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class DetalleBandejaComponent extends BaseComponent implements OnInit {

  @Input()
  valorCapturado: string;

  constructor(
    public langService: LangService
  ) {super();  }

  ngOnInit(): void {
    // Valor por default cuando se carga el detalle del menu principal
    this.valorCapturado = 'Cambio de carrera';
  }

}
