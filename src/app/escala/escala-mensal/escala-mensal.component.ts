import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-escala-mensal',
  templateUrl: './escala-mensal.component.html',
  styleUrls: ['./escala-mensal.component.css']
})
export class EscalaMensalComponent implements OnInit {
  locale_pt: any;
  colunas: any;
  dados: any;
  previsoes: any;
  vencimentos: any;

  escalaDoDiaSelecionada;
  registroSelecionado;
  TipoDeOcorrencias: any;
  ExibirDialogo: boolean;
  Tripulacoes: any;
  Tripulantes: any;
  Clientes: any;
  Bases: any;
  Balanco: any;

  constructor(private api: ApiService) {
    this.locale_pt = this.api.getLocale('pt');
    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth(), 1);
    this.dataFim = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  }

  dataInicio;
  dataFim;
  tudoPronto = true;

  ngOnInit(): void {
    this.rodarRelatorio()
  }


  editarDia(e, dia){
    this.escalaDoDiaSelecionada = this.Tripulacoes.find(x=>x.Data == dia+"T00:00:00");
    this.escalaDoDiaSelecionada.Display = true;
    this.ExibirDialogo = true;
  }

  rodarRelatorio() {


    this.tudoPronto = false;
    this.api.getEscalaMensal(this.dataInicio, this.dataFim).then(x=> {
      this.dados = x;

      this.colunas = x.Colunas;
      this.dados = x.Dados;
      this.previsoes = x.previsoes;
      this.TipoDeOcorrencias = x.TipoDeOcorrencias;
      this.Tripulacoes = x.Tripulacoes;
      this.Tripulantes = x.Tripulantes;
      this.Clientes = x.clientes;
      this.Bases = x.bases;
      this.Balanco = x.balanco;

      this.previsoes.forEach(x => {
        x.Display = false
      });

      this.Tripulacoes.forEach(x => {
        x.Display = false
      });

      this.vencimentos = x.Vencimentos;
  
      for(let i = 3; i< this.colunas.length;i++){
        this.fazerBalanco(this.colunas[i]);
      }

      if ( this.vencimentos.length > 0)
        alert("Existem vencimentos de Cursos/Carteiras no período selecionado.\nVerifique a lista detalhada abaixo da Escala.");

      this.tudoPronto = true;
    });





  }


  modificarRegistro(evento, id){
    //let retorno = this.previsoes.find(x=>x.Id == valor).Detalhes.map(x=>x.Descricao).join(', ');
    //alert(retorno);

    this.registroSelecionado = this.previsoes.find(x=>x.Id == id);
    this.registroSelecionado.Display = true;
    this.ExibirDialogo = true;

  }


  fazerBalanco(coluna){
    const items = this.dados.filter(x=>x.PIC.Texto).map(x=>x[coluna.Header]).filter(x=>x.Texto.includes("EV")).length + "/" + this.dados.map(x=>x[coluna.Header]).filter(x=> x.Texto && x.Texto.includes("EV")).length ;

    //let balanco = this.dados.find(x=>x.Name.Texto == "BALANCE");
    this.Balanco[coluna.Header] = { "Texto": items };
  }

  retornoEvento(e){
    this.ExibirDialogo = false;
    this.ocultar();
  }

  ocultar(){
    if (this.registroSelecionado)
      this.registroSelecionado.Display = false;
    if ( this.escalaDoDiaSelecionada )
      this.escalaDoDiaSelecionada.Display = false;
  }

}
