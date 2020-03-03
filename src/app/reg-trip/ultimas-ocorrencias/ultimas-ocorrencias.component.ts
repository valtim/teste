import { Component, OnInit, Input } from '@angular/core';
import { DataUtil } from 'src/app/shared/DataUtil';

@Component({
  selector: 'app-ultimas-ocorrencias',
  templateUrl: './ultimas-ocorrencias.component.html',
  styleUrls: ['./ultimas-ocorrencias.component.css']
})
export class UltimasOcorrenciasComponent implements OnInit {


  @Input() Ocorrencias;

  valorImpresso;

  exibir = false;
  temPopup = false;
  classe = 'popup ';

  constructor() { }

  // tratarData(valor) {
  //   if (valor.PodeExibir )
  //     return valor.Data;
  //   else

  // }

  ngOnInit() {
    if ( typeof(this.Ocorrencias) != "object" ){
      this.valorImpresso = this.Ocorrencias;

if ( DataUtil.ehData(this.Ocorrencias)){
  let diferenca = DataUtil.diasPartindoDeHoje(this.Ocorrencias);

  if (  diferenca > 60 )
    return;


    //console.log(this.Ocorrencias + ' - ' + diferenca + ' - ' + this.classe);
    if (diferenca <= 0) 
    {
      this.classe += 'vencido';
      return;
    }

    if (diferenca < 15) 
    {
      this.classe += 'em15dias';
      return;
    }

    if (diferenca < 30) 
    {
      this.classe += 'em30dias';
      return;
    }

    if (diferenca < 60) 
    {
      this.classe += 'em60dias';
      return;
    }
  //alert(DataUtil.diasPartindoDeHoje(this.Ocorrencias));
}


      return;
    }
      this.valorImpresso = this.Ocorrencias.Vencimento;
      this.temPopup = true;
  }

}
