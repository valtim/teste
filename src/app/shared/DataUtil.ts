export class DataUtil {


  public static Hoje(){
    return new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate());
  }

  public static ParaData(ent: string ){    
    if ( typeof ent != 'string' ) return this.Hoje();


    let dia = +ent.split('/')[0];
    let mes = +ent.split('/')[1];
    let ano = +ent.split('/')[2];

    return new Date(ano, mes-1,dia +1);
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