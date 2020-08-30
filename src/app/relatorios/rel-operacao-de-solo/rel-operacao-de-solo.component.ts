import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { MenuItem, MessageService } from 'primeng-lts/api';

//import { v4 as uuidv4 } from './../../../../node_modules/uuid';

@Component({
  selector: 'app-rel-operacao-de-solo',
  templateUrl: './rel-operacao-de-solo.component.html',
  styleUrls: ['./rel-operacao-de-solo.component.css'],
  providers: [MessageService]
})
export class RelOperacaoDeSoloComponent implements OnInit {

  botoes: MenuItem[];

  locale_pt;
  baseDeOperacao;
  baseDeOperacaoSelecionada;
  clienteSelecionado;
  data: Date;

  dados;

  consulta_ok = false;
  tela_ok = false;
  filtroBase: any;
  filtroCliente: any;
  valoresSelecionados: any;
  nomeCliente: any;
  nomeBase: any;

  constructor(
    private api: ApiService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.botoes =
      [
        // {
        //   label: 'Novo',
        //   icon: 'pi pi-plus',
        //   command: () => { this.novoItem(); }
        // },
        {
          label: 'Salvar',
          icon: 'pi pi-save',
          command: () => { this.salvar() },
          disabled: false,
        },
        {
          label: 'Excluir',
          icon: 'pi pi-trash',
          command: () => { this.excluir() },
          disabled: true,
        },
      ];

    var date = new Date();
    date.setDate(date.getDate() - 1);

    this.data = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.locale_pt = this.api.getLocale('pt');

    let nova = [{ value: undefined, label: '' }];

    this.api.getCombos().then(x => {

      let nova = [{ value: undefined, label: '' }];
      this.filtroBase = x.BaseDeOperacao;
      this.filtroCliente = x.Cliente;

      this.baseDeOperacaoSelecionada = this.filtroBase[0];
      this.clienteSelecionado = this.filtroCliente.filter(x => x.Nome == 'EQUINOR')[0];

      this.tela_ok = true;

      this.rodarRelatorio();

    });

  }


  excluir() {
    this.api.deleteOperacaoDeSolo(this.valoresSelecionados).then(() => {
      this.rodarRelatorio();
    });
  }
  salvar() {

    var modificados = this.dados.filter(x => x.Modificado);

    modificados.forEach(x => {
      x.Ativo = true;
    });


    this.api.postOperacaoDeSolo(modificados).then(x => {
      this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Status Salvos com sucesso!' });
      this.verBotoes();
      this.rodarRelatorio();
    })
  }

  rodarRelatorio() {
    this.consulta_ok = false;
    this.api.getOperacaoDeSolo(this.data, this.baseDeOperacaoSelecionada.Id, this.clienteSelecionado.Id).then(x => {
      this.dados = x.retorno;
      this.nomeCliente = x.Cliente;
      this.nomeBase = x.Base;
      this.consulta_ok = true;
    })
  }

  mudeiAqui(e, valor: any) {
    if (valor.Novo)
      return;

    valor.Modificado = true;
    this.verBotoes();
  }

  verBotoes() {
    this.botoes[1].disabled = false;//this.dados.filter(x => x.Novo || x.Modificado).length == 0;
    this.botoes[2].disabled = this.valoresSelecionados.length == 0;

  }


}
