import { Component, OnInit, ViewChildren } from '@angular/core';
import { from } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';
import { EscalaService } from 'src/app/shared/escala.service';

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
  colunasBalance: any;
  contratos: any;

  constructor(private apiEscala: EscalaService) {
    // this.locale_pt = this.api.getLocale('pt');
    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth(), 1);
    this.dataFim = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  }

  @ViewChildren("tabela") tb_principal: any;

  dataInicio;
  dataFim;
  tudoPronto = true;

  ngOnInit(): void {
    this.rodarRelatorio()
  }

  editarDia(e, dia) {
    this.escalaDoDiaSelecionada = this.Tripulacoes.find(x => x.Data == dia + "T00:00:00");
    this.escalaDoDiaSelecionada.Display = true;
    this.ExibirDialogo = true;
  }

  rodarRelatorio() {


    this.tudoPronto = false;
    this.apiEscala.getEscalaMensal(this.dataInicio, this.dataFim).then(x => {
      this.dados = x;

      this.colunas = x.Colunas;
      this.colunasBalance = x.ColunasBalance;
      this.dados = x.Dados;
      this.previsoes = x.previsoes;
      this.TipoDeOcorrencias = x.TipoDeOcorrencias;
      this.Tripulacoes = x.Tripulacoes;
      this.Tripulantes = x.Tripulantes;
      this.Clientes = x.clientes;
      this.Bases = x.bases;
      this.Balanco = x.balanco;
      this.contratos = x.Contratos;

      this.previsoes.forEach(x => {
        x.Display = false
      });

      this.Tripulacoes.forEach(x => {
        x.Display = false
      });

      this.vencimentos = x.Vencimentos;

      this.fazerBalanco();

      if (this.vencimentos.length > 0)
        alert("Existem vencimentos de Cursos/Carteiras no período selecionado.\nVerifique a lista detalhada abaixo da Escala.");

      this.tudoPronto = true;
    });





  }


  destacarLinha(evento, numeroDaLinha) {

    var linhaMarcarda = -1;

    for (let linha = 1; linha < this.tb_principal.first.nativeElement.rows.length; linha++) {
      if (this.tb_principal.first.nativeElement.rows[linha].cells[5].bgColor != "gray")
        continue;

      linhaMarcarda = linha;
      for (let celula = 1; celula < this.tb_principal.first.nativeElement.rows[numeroDaLinha].cells.length; celula++) {
        this.tb_principal.first.nativeElement.rows[linha].cells[celula].bgColor = "";
      }
    }


    if (linhaMarcarda == numeroDaLinha)
      return;

    for (let i = 1; i < this.tb_principal.first.nativeElement.rows[numeroDaLinha].cells.length; i++) {
      this.tb_principal.first.nativeElement.rows[numeroDaLinha].cells[i].bgColor = "gray";
    }

  }

  salvar() {

  }

  modificarRegistro(evento, id) {

    if (evento.target.cellIndex == 0) {
      this.destacarLinha(evento, evento.target.parentElement.rowIndex);
      return;
    }

    this.registroSelecionado = this.previsoes.find(x => x.Id == id);
    this.registroSelecionado.Display = true;
    this.ExibirDialogo = true;

  }

  retornoEvento(e) {


    this.ExibirDialogo = false;
    this.ocultar();

    this.registroSelecionado = e;

    let registro = this.previsoes.find(x => x.Id == e.Id);

    registro = e;

    let data = new Date(e.Data);

    var linhas = this.dados.find(x => x.Name.Texto == e.Tripulante.Trato);

    var indice = data.getDate().toString()

    if (indice.length == 1) indice = "0" + indice;

    var linha = linhas[indice];

    if (e.Siglas.indexOf('EV') == -1) {
      linha.Texto = "";
      linha.Base = "";
    }

    linha.Texto = e.Detalhes.map(x => x.TipoDeOcorrencia.Sigla).join(",");

    this.fazerBalanco();
  }

  fazerBalanco() {

    for (let col = 0; col < this.colunasBalance.length; col++) {
      let coluna = this.colunasBalance[col];

      const items = this.dados.filter(x => x.PIC.Texto).map(x => x[coluna.Header]).filter(x => x.Texto.includes("EV")).length + "/" + this.dados.map(x => x[coluna.Header]).filter(x => x.Texto && x.Texto.includes("EV")).length;

      this.Balanco[coluna.Header] = { "Texto": items };
    }
  }


  ocultar() {
    if (this.registroSelecionado)
      this.registroSelecionado.Display = false;
    if (this.escalaDoDiaSelecionada)
      this.escalaDoDiaSelecionada.Display = false;
  }

}
