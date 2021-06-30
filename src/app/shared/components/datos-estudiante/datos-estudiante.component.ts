import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { fadeInAnim, slideInLeftAnim } from '../../animations/template.animation';
import { EstudianteModel } from '../../models/estudiante.model';
import { ContextoService } from '../../services/contexto.service';

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

  constructor(
    private domSanitizer: DomSanitizer
  ) {
    //..
  }

  ngOnInit(): void {
    // ...
  }

  imagenSanitizada(): SafeResourceUrl{
    return this.domSanitizer.bypassSecurityTrustResourceUrl( `data:image/png;base64,`.concat(`${this.datoEstudiante.fotografia}` ));
  }

}
