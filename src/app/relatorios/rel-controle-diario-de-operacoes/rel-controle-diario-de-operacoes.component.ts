import { ApiService } from './../../shared/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rel-controle-diario-de-operacoes',
  templateUrl: './rel-controle-diario-de-operacoes.component.html',
  styleUrls: ['./rel-controle-diario-de-operacoes.component.css']
})
export class RelControleDiarioDeOperacoesComponent implements OnInit {

  tela_ok = false;
  consulta_ok = false;

  data = new Date();
  locale_pt;



  constructor(private api: ApiService) {
    this.locale_pt = this.api.getLocale('pt');
  }

  ngOnInit(): void {
  }


  rodarRelatorio() {

  }

}
