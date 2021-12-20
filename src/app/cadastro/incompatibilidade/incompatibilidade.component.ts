import { Component, OnInit } from '@angular/core';

import { MenuItem, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/shared/api.service';
import { GuidUtil } from 'src/app/shared/GuidUtil';

@Component({
  selector: 'app-incompatibilidade',
  templateUrl: './incompatibilidade.component.html',
  styleUrls: ['./incompatibilidade.component.css'],
  providers: [MessageService]
})
export class IncompatibilidadeComponent implements OnInit {

  botoes: MenuItem[];

  dados: any[] = [];

  consulta_ok = false;
  tela_ok = false;

  valoresSelecionados = [];

  tripulantes: any;

  constructor(
    private api: ApiService,
    private messageService: MessageService) {

  }


  ngOnInit(): void {
    this.botoes =
      [
        {
          label: 'Novo',
          icon: 'pi pi-plus',
          command: () => { this.novoItem(); },
          disabled: false,
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
          disabled: false,
        },
      ];


    this.pesquisar();

  }


  pesquisar() {

    this.tela_ok = false;
    this.consulta_ok = false;

    this.api.getIncompatibilidadeCRUD().then(x => {
      this.tripulantes = x.Tripulantes;
      this.dados = x.Incompatibilidades;


      this.tela_ok = true;
      this.consulta_ok = true;
      this.verBotoes();
    })
  }


  excluir() {

    this.consulta_ok = false;
    this.api.deleteIncompatibilidadeCRUD(this.valoresSelecionados)
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Salvo com sucesso!' });
        this.pesquisar();
      })
      .catch(() => {
        this.consulta_ok = true;
        this.messageService.add({ severity: 'error', summary: 'SOL Sistemas', detail: 'Erro ao Salvar' });
      })
  }
  salvar() {

    if (this.dados.filter(x => x.Modificado && (!x.Tripulante1 || !x.Tripulante2)).length > 0) {
      this.messageService.add({ severity: 'warn', summary: 'SOL Sistemas', detail: 'Preencha os dois tripulantes' });
      return;
    }


    this.consulta_ok = false;
    this.api.postIncompatibilidadeCRUD(this.dados.filter(x => x.Modificado && x.Tripulante1 && x.Tripulante2))
      .then(() => {
        this.dados.forEach(x => { delete x.Modificado; });
        this.verBotoes();
        this.consulta_ok = true;
        this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Salvo com sucesso!' });
      })
      .catch(() => {
        this.consulta_ok = true;
        this.messageService.add({ severity: 'error', summary: 'SOL Sistemas', detail: 'Erro ao Salvar' });
      })
  }
  
  novoItem() {

    var novoItem = { Id: GuidUtil.NewGuid(), Tripulante1: null, Tripulante2: null };
    novoItem['Modificado'] = true;
    var lista = [novoItem];

    this.dados = lista.concat(this.dados);
    this.verBotoes();
  }

  verBotoes() {
    this.botoes[1].disabled = this.dados.filter(x => x.Modificado).length == 0;
    this.botoes[2].disabled = this.valoresSelecionados.length == 0;
  }

  mudeiAqui(e, dado) {
    dado['Modificado'] = true;
    this.verBotoes();
  }

}
