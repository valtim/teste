import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { MenuItem, MessageService } from 'primeng/api';
import { ApiGenericoService } from 'src/app/shared/api.generico.service';


//import { v4 as uuidv4 } from './../../../../node_modules/uuid';

@Component({
  selector: 'app-rel-status-da-frota',
  templateUrl: './rel-status-da-frota.component.html',
  styleUrls: ['./rel-status-da-frota.component.css'],
  providers: [MessageService]
})
export class RelStatusDaFrotaComponent implements OnInit {


  botoes: MenuItem[];

  locale_pt;
  baseDeOperacao;
  baseDeOperacaoSelecionada;
  data: Date;

  dados;

  consulta_ok = false;
  tela_ok = false;
  prefixos: any;
  tiposDeOperacao: any;
  disponibilidade: { value: any; label: string; }[];
  valoresSelecionados = [];

  constructor(
    private api: ApiService,
    private apiGenerico: ApiGenericoService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {


    this.botoes =
      [
        {
          label: 'Novo',
          icon: 'pi pi-plus',
          command: () => { this.novoItem(); }
        },
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
    date.setDate(date.getDate() + 1);

    this.data = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.locale_pt = this.api.getLocale('pt');

    this.api.getCombos().then(x => {

      this.disponibilidade = x.Disponibilidade;
      this.prefixos = x.Prefixo;
      this.tiposDeOperacao = x.TipoDeOperacao;
      this.baseDeOperacao = x.BaseDeOperacao;
      this.baseDeOperacaoSelecionada = x.BaseDeOperacao[0];
      this.tela_ok = true;
      this.rodarRelatorio();

    });
  }
  excluir() {
    this.apiGenerico.deleteGenerico('StatusDaFrota', this.valoresSelecionados)
    .then(() => {
      
      this.rodarRelatorio();
    });
  }
  
  novoItem() {
    let nova =
    {
      //"Id": uuidv4(),
      "Prefixo": {
        "Nome": "",
        "Id": { Nome: "", Id: '00000000-0000-0000-0000-000000000000' }
      },
      "HorarioDisponibilidade": "",
      "Disponibilidade": this.disponibilidade[0],
      "TipoDeOperacao": this.tiposDeOperacao[0],
      "Backup": null,
      "Substituto": null,
      "Posicao": "HANGAR",
      "Observacoes": "",
      "Modificado": true,
      "Data": this.data,
    };
    this.dados.push(nova);

  }
  salvar() {
    this.api.postRelStatusDaFrota(this.dados).then(x => {
      this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Status Salvos com sucesso!' });
      this.verBotoes();
    })
  }
  rodarRelatorio() {
    this.consulta_ok = false;
    this.api.getRelStatusDaFrota(this.data, this.baseDeOperacaoSelecionada.Id, ['31965f5a-e078-11e7-a923-0026b94bb39e', 'cfd3aa3b-5c1d-4796-abec-1de79cb7a998']).then(x => {
      this.consulta_ok = true;
      this.dados = x;
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
