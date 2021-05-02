import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoToLiteral'
})
export class EstadoToLiteralPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    switch (+value) {
      case 0: return 'DESACTIVADO';
      case 1: return 'ACTIVADO';
      default:
        return 'NO SE ESPECIFICO ESTADO';
    }
  }

}
