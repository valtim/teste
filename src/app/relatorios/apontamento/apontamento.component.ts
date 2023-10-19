import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../shared/api.service";
import { MessageService } from "primeng/api";
import { v4 as uuid } from 'uuid';
import * as FileSaver from 'file-saver';
import { Apontamento } from 'src/app/models/Apontamento';

@Component({
  selector: 'app-apontamento',
  templateUrl: './apontamento.component.html',
  styleUrls: ['./apontamento.component.css'],
  providers: [MessageService]
})
export class ApontamentoComponent implements OnInit {

  tudoPronto: boolean = false;
  dataSelecionada: Date;
  apontamentos: Apontamento[];
  apontamentosMarcados: String[] = [];
  botoes: boolean;
  exibirDialogo: boolean;
  codigos: any[];
  baseDeOperacao: any;
  baseDeOperacaoSelecionada: any;

  constructor(private api: ApiService, private messageService: MessageService) { }

  ngOnInit(): void {
    var date = new Date();
    this.dataSelecionada = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    //this.dataSelecionada = new Date(2023, 4, 10);
    //this.rodarRelatorio();

    this.api.getCombosRestrito('BaseDeOperacao, CodigosDeApontamento').then(x => {

      this.baseDeOperacao = x.BaseDeOperacao;
      this.baseDeOperacaoSelecionada = this.baseDeOperacao[0].Id;
      this.codigos = x.CodigosDeApontamento;
      this.tudoPronto = true;
    })

  }

  definirApontamentos(apontamentos: any[]) {
    this.apontamentos = apontamentos.map(obj => ({
      ...obj,
      HoraInicialString: obj.HoraInicial ? obj.HoraInicial.split("T")[1].substring(0, 5) : '',
      HoraFinalString: obj.HoraFinal ? obj.HoraFinal.split("T")[1].substring(0, 5) : '',
      HorasVoadasString: obj.HorasVoadas ? obj.HorasVoadas.split("T")[1].substring(0, 5) : '',
      HorasGlosadasString: obj.HorasGlosadas ? obj.HorasGlosadas.split("T")[1].substring(0, 5) : ''
    }));
  }

  rodarRelatorio() {
    this.tudoPronto = false;

    this.api.getApontamentos(this.dataSelecionada, this.baseDeOperacaoSelecionada.Id).then(x => {
      //this.definirApontamentos(x);
      this.apontamentos = x;
      this.apontamentosMarcados = [];
      this.botoes = false;
      this.exibirDialogo = false;
      this.tudoPronto = true;
    });
  }

  mensagemAviso(): void {
    this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'As colunas "Grupo de Códigos" e "Código da Operação" são alteradas automaticamente a partir da coluna "Descrição da Operação".' });
  }

  // marcarCheckboxApontamento(evento, apontamento): void {
  //   let marcado = evento.target.checked;
  //   if (marcado) {
  //     this.apontamentosMarcados.push(apontamento);
  //   } else {
  //     let index = this.apontamentosMarcados.findIndex(x => x["Id"] === apontamento["Id"]);
  //     if (index > -1) {
  //       this.apontamentosMarcados.splice(index, 1);
  //     }
  //   }

  //   this.botoes = (this.apontamentosMarcados.length > 0);
  // }

  ocultarDialogoExclusao(): void {
    this.exibirDialogo = false;
  }

  exibirDialogoExclusao(): void {
    this.exibirDialogo = true;
  }

  apagarApontamentos(): void {
    this.ocultarDialogoExclusao();
    this.tudoPronto = false;
    this.botoes = false;


    this.api.apagarApontamentos(this.apontamentosMarcados).then(x => {

      // this.apontamentos
      //   .filter(x => this.apontamentosMarcados.indexOf(x.Id) > -1)
      //   .forEach(x => x.Ativo = false);

      // this.apontamentos = this.apontamentos.filter(x => x.Ativo);
      // let i = 0;
      // this.apontamentos.forEach(x => {
      //   x.Item = ++i;
      // });

      this.apontamentosMarcados = [];
      this.api.getApontamentos(this.dataSelecionada, this.baseDeOperacaoSelecionada.Id).then(x => {

        this.apontamentos = x;

        this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Excluídos com sucesso!' });
        this.tudoPronto = true;
      });
    })
  }

  alterar(apontamento) {
    this.tudoPronto = false;
    this.api.postApontamento(apontamento).then(x => {
      this.tudoPronto = true;
    }).catch((x) => {
      console.error(x);
      this.messageService.add({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao atualizar o Apontamento!",
      });
    });
  }

  alterarHora(apontamento, campo, valor) {

    let horaValida = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(valor);
    if (horaValida) {
      let partes = valor.split(':');
      let data = this.dataSelecionada = new Date(
        this.dataSelecionada.getFullYear(),
        this.dataSelecionada.getMonth(),
        this.dataSelecionada.getDate(),
        parseInt(partes[0]),
        parseInt(partes[1]),
        0
      );

      apontamento[campo] = data.toLocaleString();
    } else {
      apontamento[campo + 'String'] = '';
      apontamento[campo] = null;
    }

    this.alterar(apontamento);
  }

  obterApontamentoVazio(selecionado: any): any {
    let novo = {
      Id: uuid(),
      Item: 0,
      Equipamento: selecionado.Equipamento,
      Atendimento: selecionado.Atendimento,
      Escala: selecionado.Escala,
      Codigo: selecionado.Codigo,
      DataInicial: selecionado.DataInicial,
      HoraInicial: null,
      HoraFinal: null,
      HorasVoadas: null,
      HorasGlosadas: null,
      QuantidadeItemAvulso: '',
      Observacoes: '',
      DataConsulta: selecionado.DataConsulta,
      Sincronizacao: null,
      AtualizadoPor: null,
      Atualizacao: null,
      Ativo: true
    };

    return novo;
  }

  selecionarTudo(event) {
    if (event.checked == false) {
      this.apontamentosMarcados = [];
      return;
    }
    this.apontamentosMarcados = this.apontamentos.map(x => x.Id)

  }


  inserir(): void {
    let apontamentoSelecionado = this.apontamentos.find(x => x.Id == this.apontamentosMarcados[0]);
    this.apontamentos = [
      ...this.apontamentos.slice(0, apontamentoSelecionado.Item),
      this.obterApontamentoVazio(apontamentoSelecionado),
      ...this.apontamentos.slice(apontamentoSelecionado.Item),
    ];

    var i = 0;
    this.apontamentos.forEach(x => x.Item = ++i);
    this.apontamentos = this.apontamentos.sort(x => x.Item);
  }

  gerarXML() {
    this.api.postApontamentoXML(this.apontamentos, this.baseDeOperacaoSelecionada).subscribe((blob: any) => {
      //this.api.getBI(this.dataInicio, this.dataFim).subscribe((blob : any) => {
      let date = new Date();
      let filename = `apontamento_${this.baseDeOperacaoSelecionada.ICAO}_${this.dataSelecionada.toISOString().split("T")[0]}.xml`
      FileSaver.saveAs(blob, filename)
      //this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      this.messageService.add({ severity: 'success', summary: 'Arquivo Baixado', detail: 'Arquivo Baixado, procure na pasta "downloads"' });
      this.tudoPronto = true;
    });
  }





}
