import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'sh-datos-formato-tabla',
  templateUrl: './datos-formato-tabla.component.html',
  styleUrls: ['./datos-formato-tabla.component.css']
})
export class DatosFormatoTablaComponent extends BaseComponent implements OnInit {

  @Input()
  listaLabelColumnas: Array<string> = [];
  @Input()
  listaValoresColumnas: Array<any> = [];

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
