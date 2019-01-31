import { Directive, HostListener, Input } from '@angular/core';
import {
  NG_VALUE_ACCESSOR, ControlValueAccessor
} from '@angular/forms';

@Directive({
  selector: '[appNumeroMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NumeroMaskDirective,
    multi: true
  }]
})
export class NumeroMaskDirective implements ControlValueAccessor {

  onTouched: any;
  onChange: any;

  @Input() numeroMask: string;

  writeValue(value: any): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    let valor = $event.target.value.replace(/\D/g, '');
    const pad = this.numeroMask.replace(/\D/g, '').replace(/9/g, '_');
    const valorMask = valor + pad.substring(0, pad.length - valor.length);

    // retorna caso pressionado backspace
    if ($event.keyCode === 8) {
      return;
    }

    let valorMaskPos = 0;
    valor = '';
    for (let i = 0; i < this.numeroMask.length; i++) {
      if (isNaN(parseInt(this.numeroMask.charAt(i), 10))) {
        valor += this.numeroMask.charAt(i);
      } else {
        valor += valorMask[valorMaskPos++];
      }
    }

    if (valor.indexOf('_') > -1) {
      valor = valor.substr(0, valor.indexOf('_'));
    }

    $event.target.value = valor;
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    if ($event.target.value.length === this.numeroMask.length) {
      return;
    }
    this.onChange('');
    $event.target.value = '';
  }
}
