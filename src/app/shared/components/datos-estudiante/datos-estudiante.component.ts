import { Component, Input, OnInit } from '@angular/core';
import { fadeInAnim, slideInLeftAnim } from '../../animations/template.animation';
import { EstudianteModel } from '../../models/estudiante.model';

@Component({
  selector: 'sh-datos-estudiante',
  templateUrl: './datos-estudiante.component.html',
  styleUrls: ['./datos-estudiante.component.css'],
  animations: [fadeInAnim, slideInLeftAnim],
  host: { class: 'container-fluid', '[@fadeInAnim]': 'true' }
})
export class DatosEstudianteComponent implements OnInit {

  @Input()
  datoEstudiante: EstudianteModel;

  constructor() { }

  ngOnInit(): void {
  }

}
