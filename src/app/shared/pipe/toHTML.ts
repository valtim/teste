import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toHTML',
    pure: true
})
export class HTMLPipe implements PipeTransform {

    transform(value: string): string {
        if (value == undefined) return '';
        if (value == null) return '';
        if (value == '') return '';

        let retorno = value;

        while (retorno.indexOf('\r\n') > -1)
            retorno = retorno.replace('\r\n', '<BR>');

        return retorno;

    }

}
