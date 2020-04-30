import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-rel-boca',
  templateUrl: './rel-boca.component.html',
  styleUrls: ['./rel-boca.component.css']
})
export class RelBocaComponent implements OnInit {

  locale_pt;
  tudoPronto = false;
  dados;
  cols;

  filtroRetorno;

  data: Date;

  TotalDeVoos;
  AeronavesUtilizadas;

  baseDeOperacao;
  baseDeOperacaoSelecionada;
  BaseDeOperacoes: any;

  constructor(private api : ApiService) { }

  ngOnInit(): void {
    
    const date = new Date();
    this.data = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.locale_pt = this.api.getLocale('pt');

    this.api.getCombos().then(x=>{
      this.baseDeOperacao = x.BaseDeOperacao.map(x => { return { label: x.Nome, value: x.ICAO + '$' + x.Nome } });
      this.baseDeOperacaoSelecionada = this.baseDeOperacao[0].value;



      this.rodarRelatorio();

    })
  

  }

  rodarRelatorio() {
    this.tudoPronto = false;
    this.api.postRelBoca (
      {
        data: this.data,
        clientes : ['31965f5a-e078-11e7-a923-0026b94bb39e',
'cfd3aa3b-5c1d-4796-abec-1de79cb7a998'],
        base : this.baseDeOperacaoSelecionada
      }).then(x => {

        //colunas = colunas, filtro = filtro, listas = listas
        this.cols = x.colunas;
        this.dados = x.valores;
        this.filtroRetorno = x.filtroRetorno;
        this.TotalDeVoos = x.TotalDeVoos;
        this.AeronavesUtilizadas = x.AeronavesUtilizadas;
        this.BaseDeOperacoes = x.BaseDeOperacoes;
        this.tudoPronto = true;
      })
      .catch(x=>{
        
      })
  }

}
