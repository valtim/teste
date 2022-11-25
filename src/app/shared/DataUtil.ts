import { getLocaleDateTimeFormat } from "@angular/common"

export class DataUtil {

  private static padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  public static formatDateBR(date) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  public static TimeSpanURL(timespan : string ):string {
    let hoje = new Date();
    let data = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDay(), parseInt(timespan.split(':')[0]), parseInt(timespan.split(':')[1]))
    return `{ "data" : "${data.toISOString()}"}`;
  }

  public static Hoje(){
    return new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate());
  }

  public static ParaData(ent: string ){    
    if (ent == null ) return null;
    if (ent == "" ) return null;


    if ( typeof ent != 'string' ) return this.Hoje();


    let partes = ent.split(" ");

    let dia = +partes[0].split('/')[0];
    let mes = +partes[0].split('/')[1];
    let ano = +partes[0].split('/')[2];



    if ( partes.length == 1)
      return new Date(ano, mes-1,dia);

      
    let hora = +partes[1].split(':')[0];
    let minuto = +partes[1].split(':')[1];

    return new Date(ano, mes-1,dia, hora-3, minuto);
    
  }

  public static ParaDataISO(ent: string ){    
    if (ent == null ) return null;
    if (ent == "" ) return null;
    if (ent == "__/__/____ __:__") return null;
    if (ent == "__/__/____") return null;


    if ( typeof ent != 'string' ) return this.Hoje().toISOString();


    let partes = ent.split(" ");

    let dia = +partes[0].split('/')[0];
    let mes = +partes[0].split('/')[1];
    let ano = +partes[0].split('/')[2];



    if ( partes.length == 1)
      return new Date(ano, mes-1,dia);

      
    let hora = +partes[1].split(':')[0];
    let minuto = +partes[1].split(':')[1];

    return new Date(ano, mes-1,dia, hora-3, minuto).toISOString();
    
  }

  public static diasPartindoDeHoje(ent:string) : number{
    var date1 = this.Hoje();
    var date2 = this.ParaData(ent)
    var timeDiff = date2.getTime() - date1.getTime();
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    return diffDays;
  }

  public static ehData(ent:string) : Boolean {

    if ( typeof ent != 'string' ) return false;

    let teste = ent.split('/');


    return teste.length == 3;
  }


    public static from_barra_to_traco(ent:string) : string{
        let dia = ent.split('/')[0];
        let mes = ent.split('/')[1];
        let ano = ent.split('/')[2];
    
        return ano + '-' + mes + '-' + dia;
      }

      public static from_date_to_traco(ent:Date) : string{
    
        return ent.toISOString().split("T")[0];
      }

 
      


     
        private static calcTime() {
          let city = 'America/Sao_Paulo';
          let offset = -6;    
          let d = new Date();
          let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
          let nd = new Date(utc + (3600000*offset));
          return nd;
      }
      
        public static Agora(){
          const dia = this.calcTime();
          return new Date(dia.getFullYear(), dia.getMonth(),dia.getDate(),dia.getHours(),dia.getMinutes(),dia.getSeconds());
        }
      

        public static somarHoras(originalHora: string, horas: number) : string {
          let hora, minutos;
          hora = Number(originalHora.split(':')[0]);
          minutos = Number(originalHora.split(':')[1]);
          
          if (this.isInt(horas)) {
            hora += horas;
            hora = Math.round(hora);
          } else {
            hora += Math.floor(horas);
            minutos += (horas % 1) * 60;
            minutos = Math.round(minutos);
          }
      
          let horaStr;
          let minutoStr;
      
          if (minutos % 60 === 0) {
            horaStr = hora >= 10 ? `${hora}` : `0${hora}`;
            minutoStr = minutos >= 10 ? `${minutos}` : `0${minutos}`;
          } else {
            hora += Math.floor(minutos / 60);
            horaStr = hora >= 10 ? `${hora}` : `0${hora}`;
            minutoStr = (minutos % 60) >= 10 ? `${minutos % 60}` : `0${minutos % 60}`;
          }
      
          return `${horaStr}:${minutoStr}`;
        }
      
        private static isInt(n: number) {
          return n % 1 === 0;
        }
      
        public static horaToMinuto(horaMinuto: string) {
          const hora = parseInt(horaMinuto.split(':')[0]);
          const minuto = parseInt(horaMinuto.split(':')[1]);
          return (hora * 60) + minuto;
        }
      
        public static dateStringToMinutos(date: string) {
          const data = new Date(date);
          const hora = data.getHours();
          const minuto = data.getMinutes();
          return (hora * 60) + minuto;
        }
      
        public static minutosToTimeStr(minutos: number) {
          const hora = parseInt((minutos / 60).toString());
          const minuto = minutos % 60;
          return `${this.formatHora(hora)}:${this.formatHora(minuto)}:00`;
        }
      
        public static formatHora(hora: number) {
          if (hora < 10) {
            return '0' + hora;
          }
          return hora;
        }
      


}