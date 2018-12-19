import { Directive, HostListener, ElementRef, Renderer, Input } from '@angular/core';

const keys = {
  'BACKSPACE': 8,
  'DEL': 46
};

@Directive({
  selector: '[appMaskLatitudeLongitude]'
})

export class MaskLatitudeLongitudeDirective {

  @Input('formatoLocalidade') formatoLocalidade: string;

  constructor(private el: ElementRef, private render: Renderer) {
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    const valor = this.el.nativeElement.value;
    if (($event.keyCode !== keys.BACKSPACE && $event.keyCode !== keys.DEL) && valor.length !== 10) {
      if (this.formatoLocalidade === 'DM') {
        this.el.nativeElement.value = this.aplicarDecimalMinuto(valor);
      }
      if (this.formatoLocalidade === 'GMS') {
        this.el.nativeElement.value = this.aplicarMascaraGruaMinutoSegundo(valor);
      }
      if (this.formatoLocalidade === 'DG') {
        this.el.nativeElement.value = this.aplicarDecimalGraus(valor);
      }
    }
  }

  // 055°05'54"
  private aplicarMascaraGruaMinutoSegundo(value: string) {
    let newValue = value.replace(/\D/g, '');
    const valueLength = newValue.length;
    const formato = '000°00\'00"';
    let i = 0;
    newValue = formato.replace(/\d/g, () => {
      let novovalor: string;
      if (newValue[i]) {
        novovalor = newValue[i];
        i++;
      } else {
        return '';
      }
      return novovalor;
    }).replace(/\D/g, (char) => {
      if (valueLength < 3 && char === '°') {
        return '';
      }

      if (valueLength < 5 && char === '\'') {
        return '';
      }

      if (valueLength < 7 && char === '"') {
        return '';
      }
      return char;
    });
    return newValue;
  }

  // 043,2503°
  private aplicarDecimalGraus(value: string) {
    let newValue = value.replace(/\D/g, '');
    const valueLength = newValue.length;
    const formato = '000,0000°';
    let i = 0;
    newValue = formato.replace(/\d/g, () => {
      let novovalor: string;
      if (newValue[i]) {
        novovalor = newValue[i];
        i++;
      } else {
        return '';
      }
      return novovalor;
    }).replace(/\D/g, (char) => {
      if (valueLength < 3 && char === ',') {
        return '';
      }
      if (valueLength < 7 && char === '°') {
        return '';
      }
      return char;
    });
    return newValue;
  }

  // 022°48,36'
  private aplicarDecimalMinuto(value: string) {
    let newValue = value.replace(/\D/g, '');
    const valueLength = newValue.length;
    const formato = '000°00,00\'';
    let i = 0;
    newValue = formato.replace(/\d/g, () => {
      let novovalor: string;
      if (newValue[i]) {
        novovalor = newValue[i];
        i++;
      } else {
        return '';
      }
      return novovalor;
    }).replace(/\D/g, (char) => {
      if (valueLength < 3 && char === '°') {
        return '';
      }

      if (valueLength < 5 && char === ',') {
        return '';
      }

      if (valueLength < 7 && char === '\'') {
        return '';
      }
      return char;
    });
    return newValue;
  }

}
