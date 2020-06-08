import { ApiService } from 'src/app/shared/api.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-rel-atraso',
  templateUrl: './rel-atraso.component.html',
  styleUrls: ['./rel-atraso.component.css'],
  providers: [MessageService]
})
export class RelAtrasoComponent implements OnInit {

  botoes: MenuItem[];

  carregandoMenu = true;
  carregandoRelatorio: boolean;
  prefixos: any;
  clientes: any;
  clientesSelecionados;
  prefixosSelecionados;
  baseDeOperacaoSelecionada;
  dataInicio: Date;
  dataFim: Date;
  locale_pt;
  dados: any;
  cols: any;
  // filtroBase: any;  
  dataIniciof: any;
  dataFimf: any;
  voos: any;
  motivosDoAtraso: any;

  constructor(    
    private api: ApiService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {


    this.botoes =
    [
      {
        label: 'Salvar',
        icon: 'pi pi-save',
        command: () => { this.salvar() },
        disabled: false,
      },
    ];


    this.locale_pt = this.api.getLocale('pt');

    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth()-1, 26);
    this.dataFim = new Date(date.getFullYear(), date.getMonth(), 25);

    this.api.getCombos().then(x => {
      this.prefixos = x.Prefixo;
      this.clientes = x.Cliente;
      //this.filtroBase = x.BaseDeOperacao;
      this.carregandoMenu = false;
      //this.baseDeOperacaoSelecionada  = this.filtroBase[0].value;

      this.rodarRelatorio();
    })


  }


  salvar() {
    this.api.postGenerico("AtrasoDoVoo", this.dados.filter(x=>x.Modificado)).then(x => {
      this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Status Salvos com sucesso!' });
      this.verBotoes();
      this.rodarRelatorio();
    })
  }
  rodarRelatorio() {
    this.carregandoRelatorio = true;

    const dados = {
      prefixos : this.prefixosSelecionados,
      clientes : this.clientesSelecionados,
      dataInicio : this.dataInicio,
      dataFim : this.dataFim,
      //base : this.baseDeOperacaoSelecionada,  
    }

    this.api.postAtraso(dados).then(x => {
      this.dados = x.dados;
      this.cols = x.cols;
      this.carregandoRelatorio = false;
      this.dataIniciof = x.filtros.dataInicio;
      this.dataFimf = x.filtros.dataFim;
      this.motivosDoAtraso = x.MotivoDoAtraso;
    })
  }

  mudeiAqui(e, valor: any) {
    
    valor.Modificado = true;
    this.verBotoes();
  }

  verBotoes() {
    this.botoes[1].disabled = false;//this.dados.filter(x => x.Novo || x.Modificado).length == 0;
    //this.botoes[2].disabled = this.valoresSelecionados.length == 0;

  }

}
