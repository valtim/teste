import { PeriodoDeCurso } from "./PeriodoDeCurso";

export class ContadorDePeriodos {  
  public Periodos: Array<PeriodoDeCurso> = [];
  
  /*
  diferenca(callback) {    
    if (this.Periodos != undefined && this.Periodos.length > 0) {      
      let soma = 0;
      this.Periodos.forEach( (value, index) => {
        value.diferenca(retorno => {
          soma = soma + retorno;
          if (index == (this.Periodos.length - 1)) {          
            callback(soma);
          }
        });        
      });
    }
    callback(0);    
  }
  */
}