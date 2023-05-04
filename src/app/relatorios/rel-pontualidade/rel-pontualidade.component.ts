import { ApiService } from 'src/app/shared/api.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ApiGenericoService } from 'src/app/shared/api.generico.service';

@Component({
  selector: 'app-rel-pontualidade',
  templateUrl: './rel-pontualidade.component.html',
  styleUrls: ['./rel-pontualidade.component.css'],
  providers: [MessageService]
})
export class RelPontualidadeComponent implements OnInit {

  botoes: MenuItem[];

  carregandoMenu = true;
  carregandoRelatorio: boolean;
  prefixos: any;
  clientes: any;
  clientesSelecionados: any;
  prefixosSelecionados: any;
  baseDeOperacaoSelecionada: any;
  motivosDoAtrasoSelecionados: any;
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
  somenteAtraso : boolean;

  constructor(
    private api: ApiService,
    private apiGenerico: ApiGenericoService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.locale_pt = this.api.getLocale('pt');

    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    this.dataFim = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    //this.dataFim.setDate(this.dataFim.getDate() - 1);

    this.api.getCombos().then(x => {
      this.prefixos = x.Prefixo;
      this.clientes = x.Cliente;
      this.motivosDoAtraso = x.MotivoDoAtraso;
      this.carregandoMenu = false;

      this.rodarRelatorio();
    })


  }


  salvar() {
    this.apiGenerico.postGenerico("AtrasoDoVoo", this.dados.filter(x => x.Modificado)).then(x => {
      this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Status Salvos com sucesso!' });
      this.verBotoes();
      this.rodarRelatorio();
    })
  }
  rodarRelatorio() {
    this.carregandoRelatorio = true;

    const dados = {
      prefixos: this.prefixosSelecionados,
      clientes: this.clientesSelecionados,
      dataInicio: this.dataInicio,
      dataFim: this.dataFim,
      motivosDoAtraso : this.motivosDoAtrasoSelecionados,
      somenteAtrasos : this.somenteAtraso
      //base : this.baseDeOperacaoSelecionada,  
    }

    this.api.postPontualidade(dados).then(x => {
      this.carregandoRelatorio = false;
      this.dados = x.dados;
      this.cols = x.cols;
      this.dataIniciof = x.filtros.dataInicio;
      this.dataFimf = x.filtros.dataFim;
      this.motivosDoAtraso = x.MotivoDoAtraso;
      this.somenteAtraso = x.somenteAtrasos
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
