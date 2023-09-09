import { ApiService } from './../../shared/api.service';
import { Component, OnInit } from '@angular/core';

import { TreeNode, MessageService } from 'primeng/api';

@Component({
  selector: 'app-indisponibilidade',
  templateUrl: './indisponibilidade.component.html',
  styleUrls: ['./indisponibilidade.component.css'],
  providers: [MessageService]
})
export class IndisponibilidadeComponent implements OnInit {
  prefixos: any;
  clientes: any;
  carregando: boolean = true;
  prefixosSelecionados: any;
  clientesSelecionados: any;
  dataInicio: Date;
  dataFim: Date;
  dados: any[];
  cols: any;
  locale_pt: any;
  listas: any;

  linhas = [];
  contratos: any;
  basesDeOperacao: any;
  botoes: { label: string; icon: string; command: () => void; }[];
  motivosIndisponibilidade: any;

  item: any;

  fechar() {

  }

  constructor(private api: ApiService, private messageService: MessageService) { }

  ngOnInit(): void {

    this.locale_pt = this.api.getLocale('pt');

    this.botoes =
      [
        {
          label: 'Novo',
          icon: 'pi pi-plus',
          command: () => { this.novoItem(); }
        },
      ]

    const date = new Date();

    this.dataFim = new Date(date.getFullYear(), date.getMonth(), 25);
    this.dataFim = new Date(this.dataFim.setMonth(this.dataFim.getMonth() + 1));

    this.dataInicio = new Date(date.getFullYear(), date.getMonth() - 2, 26);




    this.api.getCombos().then(x => {
      this.listas = x;
      this.prefixos = x.soPrefixo;
      this.clientes = x.Cliente;
      this.contratos = x.Contrato;
      this.basesDeOperacao = x.BaseDeOperacao;
      this.motivosIndisponibilidade = x.MotivoIndisponibilidade;
      this.carregando = false;
      //this.rodarRelatorio();
    })

  }
  novoItem() {
    this.item = {
      Ativo: true,
      Contrato: null,
      DescricaoDoMotivo: null,
      Exibir: true,
      Fim: null,
      Id: null,
      Inicio: null,
      EhOcorrencia: false,
      Ocorrencias: [],
    }
  }

  files: TreeNode[];

  rodarRelatorio() {
    this.carregando = true;

    const dados = {
      prefixos: this.prefixosSelecionados,
      clientes: this.clientesSelecionados,
      dataInicio: this.dataInicio,
      dataFim: this.dataFim,
    }

    this.api.postCrudIndisponibilidadeFiltro(dados).then(x => {
      this.dados = x;
      this.carregando = false;
    })
  }

  mudeiAqui(e, dado) {
    dado['Modificado'] = true;
    //this.verBotoes();
  }

  onRowSelect(event, linha) {
    // alert(event);    
    //event.data.Exibir = true;
    this.item = Object.assign({}, linha);
  }

  onLinhaAlterada(event) {
    this.item = undefined;
    if (!event.Salvar && !event.excluir)
      return;

    this.dados = this.dados.filter(x => x.Id != event.Indisponibilidade.Id);
    if (event.Excluir){
      this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Indisponibilidade Excluída com sucesso!' });
      return;
    }

    //this.dados.push(event.Indisponibilidade);
    this.dados = [event.Indisponibilidade].concat(this.dados);
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Salvo com sucesso!' });
  }

}
