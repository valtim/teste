import { HoraTurma } from "./HoraTurma";

export class PeriodoDeCurso {

constructor(){
  this.Horas = [];
}

  public Data: Date;
  public Horas: Array<HoraTurma>;

  /*
  diferenca(callback) {  
    if (this.Horas != undefined && this.Horas.length > 0) {      
      let soma = 0;
      this.Horas.forEach( (value, index) => {
        soma = soma + value.diferenca;
        if (index == (this.Horas.length - 1)) {
          callback(soma);
        }
      });
    }
    callback(0);    
  }
  */
}