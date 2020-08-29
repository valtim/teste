export class DataUtil {


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

      

}