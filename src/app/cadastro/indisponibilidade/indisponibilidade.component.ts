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
  carregandoMenu: boolean = true;
  carregandoRelatorio: boolean = true;
  prefixosSelecionados: any;
  clientesSelecionados: any;
  dataInicio: any;
  dataFim: any;
  dados = [];
  cols: any;
  locale_pt: any;
  listas: any;

  linhas = [];
  contratos: any;
  basesDeOperacao: any;
  botoes: { label: string; icon: string; command: () => void; }[];



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
    this.dataInicio = new Date(date.getFullYear(), date.getMonth() - 2, 26);
    this.dataFim = new Date(date.getFullYear(), date.getMonth(), 25);



    this.api.getCombos().then(x => {
      this.listas = x;
      this.prefixos = x.soPrefixo;
      this.clientes = x.Cliente;
      this.contratos = x.Contrato;
      this.basesDeOperacao = x.BaseDeOperacao;
      this.carregandoMenu = false;
      this.rodarRelatorio();
    })

  }
  novoItem() {
    let novoItem = {
      Ativo: true,
      Contrato: null,
      DescricaoDoMotivo: null,
      Exibir: true,
      Fim: null,
      Id: null,
      Inicio: null,
      Ocorrencias: [],
    }

    this.dados = this.dados.concat(novoItem, this.dados);
  }

  files: TreeNode[];

  rodarRelatorio() {
    this.carregandoRelatorio = true;

    const dados = {
      prefixos: this.prefixosSelecionados,
      clientes: this.clientesSelecionados,
      dataInicio: this.dataInicio,
      dataFim: this.dataFim,
    }

    this.api.postCrudIndisponibilidadeFiltro(dados).then(x => {
      this.dados = x;
      this.carregandoRelatorio = false;
    })
  }

  mudeiAqui(e, dado) {
    dado['Modificado'] = true;
    //this.verBotoes();
  }

  onRowSelect(event) {
    // alert(event);    
    event.data.Exibir = true;
  }

  onLinhaAlterada(event) {
    //this.rodarRelatorio();
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Salvo com sucesso!' });
  }

}
