import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[shAlfanumerico]'
})
export class AlfanumericoDirective {

  constructor(private el: ElementRef) { }

  private caracteresNoPermitidos: Array<string> = [ '°', '|', '"', '\'', '#', '$', '%', '&', '(', ')', '=' , '¿', '?', '!', '¡', '´', '~', '*', '[', ']', '{', '}', '^' , '`', ':', , '¬', '/', '+', '*', '%', '¨', '´', '`', '.' ];

  @HostListener('keydown', ['$event']) onKeyDown(event): void {
    const e = <KeyboardEvent> event;

    // Evitamos que no se hayan introducido caracteres especiales NO permitidos
    if (this.caracteresNoPermitidos.indexOf(e.key) > -1) {
      e.preventDefault();
    }

  }
}
