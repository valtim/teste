import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formataData'
})
export class FormataDataPipe implements PipeTransform {

  transform(value: string): string {
    return this.formatData(value);
  }

  formatData(data: string) {
    var dataSemFormatar =  data.substr(0, 10).split('-');

    if (dataSemFormatar.length != 3)
    return data; 

    const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    const month = months[parseInt(dataSemFormatar[1])-1];
    return `${dataSemFormatar[2]} - ${month} - ${dataSemFormatar[0]}`;
  }

}
