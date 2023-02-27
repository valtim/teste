import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timespan',
  pure: true
})
export class TimespanPipe implements PipeTransform {

  transform(value: string, arg1: string): string {
    if (value == undefined) return '';
    if (value == null) return '';
    if (value == '') return '';

    if (value.indexOf(':') == -1) return '';

    let pedacos = value.split(':');

    if (pedacos[0].indexOf('.') > -1) {
      let ponto = pedacos[0].split('.');

      let dias: number = Number(ponto[0]) * 24;
      let horas: number = Number(ponto[1]);

      horas += dias;

      pedacos[0] = horas.toString();
    }

    if (arg1 == "HH:mm")
      return pedacos[0] + ':' + pedacos[1];

    return pedacos[0] + ':' + pedacos[1] + ':00';

  }

}
