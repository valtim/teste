import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  // tratarData(valor) {
  //   if (valor.PodeExibir )
  //     return valor.Data;
  //   else

  // }

  ngOnInit() {
    if ( typeof(this.Ocorrencias) != "object" ){
      this.valorImpresso = this.Ocorrencias;
      return;
    }
      this.valorImpresso = this.Ocorrencias.Vencimento;
      this.temPopup = true;
  }

}
