import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { MenuItem, MessageService } from 'primeng/api';


import { v4 as uuidv4 } from './../../../../node_modules/uuid';

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
  filtroBase: any;

  constructor(
    private api: ApiService,
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

    //var date = new Date();
    //date = date.setDate(date.getDate() + 1);
    this.data = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.locale_pt = this.api.getLocale('pt');

    let nova = [{ value: undefined, label: '' }];

    this.api.getCombos().then(x => {

      let nova = [{ value: undefined, label: '' }];
      this.filtroBase = x.BaseDeOperacao;

    });

    this.api.getCombosEdit().then(x => {

      this.disponibilidade = nova.concat(x.Disponibilidade);
      this.prefixos = nova.concat(x.Prefixos);
      this.tiposDeOperacao = nova.concat(x.TipoDeOperacao);
      this.baseDeOperacao = nova.concat(x.BaseDeOperacao);
      this.baseDeOperacaoSelecionada = this.filtroBase[0].value;
      this.tela_ok = true;
      this.rodarRelatorio();

    });
  }
  excluir() {
    throw new Error("Method not implemented.");
  }
  salvar() {
    // var novos = this.dados.filter(x => x.Novo);
    //     var modificados = this.dados.filter(x => x.Modificado);

    //     modificados.forEach(x => {
    //         x.Ativo = true;
    //         delete x.Modificado;
    //     });

        
            this.api.postRelStatusDaFrota(this.dados).then(x => {
                this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Status Salvos com sucesso!' });
                this.verBotoes();
            })
  }
  novoItem() {
    
      
      let nova = 
        {          
          "Id" : uuidv4(), 
          "Prefixo": {
            "label": "",
            "value": { label : "", value : '00000000-0000-0000-0000-000000000000' }   
          },
          "HorarioDisponibilidade": "",
          "Disponibilidade": {
            "label": "",
            "value": ""
          },
          "TipoDeOperacao": {
            "label": "",
            "value": ""
          },
          "Backup": {
            "value": { label : "", value : '00000000-0000-0000-0000-000000000000' }                                            
          },
          "Substituto": {
            "value": { label : "", value : '00000000-0000-0000-0000-000000000000' }                                            
          },
          "Posicao": "HANGAR",
          "Observacoes": "",
          "Modificado" : true,
          "Data" : this.data,
        };
      this.dados.push(nova);
        
  }

  rodarRelatorio() {
    this.consulta_ok = false;
    this.api.getRelStatusDaFrota(this.data, this.baseDeOperacaoSelecionada, [ '31965f5a-e078-11e7-a923-0026b94bb39e','cfd3aa3b-5c1d-4796-abec-1de79cb7a998']).then(x => {
      this.dados = x;
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
