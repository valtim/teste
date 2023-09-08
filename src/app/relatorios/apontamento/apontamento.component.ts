import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../shared/api.service";
import { MessageService } from "primeng/api";
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-apontamento',
  templateUrl: './apontamento.component.html',
  styleUrls: ['./apontamento.component.css'],
  providers: [MessageService]
})
export class ApontamentoComponent implements OnInit {

  tudoPronto: boolean;
  dataSelecionada: Date;
  apontamentos: any[];
  apontamentosMarcados: any[];
  botoes: boolean;
  exibirDialogo: boolean;
  codigos: any[];

  constructor(private api: ApiService, private messageService: MessageService) {}

  ngOnInit(): void {
    var date = new Date();
    this.dataSelecionada = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    //this.dataSelecionada = new Date(2023, 4, 10);
    this.rodarRelatorio();
  }

  definirApontamentos(apontamentos: any[]){    
    this.apontamentos = apontamentos.map(obj => ({ ...obj, 
      HoraInicialString: obj.HoraInicial ? obj.HoraInicial.split("T")[1].substring(0, 5) : '',
      HoraFinalString: obj.HoraFinal ? obj.HoraFinal.split("T")[1].substring(0, 5) : '',
      HorasVoadasString: obj.HorasVoadas ? obj.HorasVoadas.split("T")[1].substring(0, 5) : '',
      HorasGlosadasString: obj.HorasGlosadas ? obj.HorasGlosadas.split("T")[1].substring(0, 5) : ''
    }));    
  }

  rodarRelatorio(){
    this.tudoPronto = false;

    this.api.getApontamentos(this.dataSelecionada).then(x => {      
      this.codigos = x.Codigos;      
      this.definirApontamentos(x.apontamentos);               
      this.apontamentosMarcados = []; 
      this.botoes = false;    
      this.exibirDialogo = false;
      this.tudoPronto = true;
    });        
  }

  mensagemAviso(): void {    
    this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'As colunas "Grupo de Códigos" e "Código da Operação" são alteradas automaticamente a partir da coluna "Descrição da Operação".' });
  }

  marcarCheckboxApontamento(evento,apontamento): void {
    let marcado = evento.target.checked;
    if (marcado) {
      this.apontamentosMarcados.push(apontamento);
    } else {
      let index = this.apontamentosMarcados.findIndex(x => x["Id"] === apontamento["Id"]);
      if (index > -1) {
        this.apontamentosMarcados.splice(index, 1);
      }
    }
    
    this.botoes = (this.apontamentosMarcados.length > 0);
  }

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

    this.apontamentosMarcados.forEach((apontamento,index_apontamento)=>{      
      apontamento.Ativo = false;

      if (index_apontamento == (this.apontamentosMarcados.length - 1)) {
                
        this.api.apagarApontamentos(this.apontamentosMarcados).then(x => {      
      
          this.apontamentosMarcados = [];          
          this.api.getApontamentos(this.dataSelecionada).then(x => {            
            this.definirApontamentos(x.apontamentos);
            
            this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Excluídos com sucesso!' });                  
            this.tudoPronto = true;
          });    
                
        }).catch((x) => {
          console.error(x);
          this.messageService.add({
            severity: "error",
            summary: "Erro",
            detail: "Erro ao excluir os Apontamentos!",
          });
        });
      }
    });
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

  alterarHora(apontamento,campo,valor) {    

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

  obterApontamentoVazio(selecionado: any, Item: number): any {
    let novo = {
      Id: uuid(),
      Item: Item,
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

  inserir(abaixo: boolean): void {    
    this.tudoPronto = false;
    this.botoes = false;

    if (this.apontamentosMarcados.length > 0) {
      let apontamentoSelecionado = this.apontamentosMarcados[0];
      let Item = apontamentoSelecionado.Item;
      if (abaixo) {        
        Item++;
      }
      let novo = this.obterApontamentoVazio(apontamentoSelecionado,Item);      

      this.api.postNovoApontamento(novo).then(x => {            
        this.apontamentosMarcados = [];        
        this.api.getApontamentos(this.dataSelecionada).then(x => {            
          this.definirApontamentos(x.apontamentos);                            
          this.tudoPronto = true;
        });    
              
      }).catch((x) => {
        console.error(x);
        this.messageService.add({
          severity: "error",
          summary: "Erro",
          detail: "Erro ao incluir o Apontamento!",
        });
      });
    }    
  }

}
