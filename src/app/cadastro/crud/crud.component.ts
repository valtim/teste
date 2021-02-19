import { Component, OnInit, Input } from '@angular/core';

import { ApiService } from 'src/app/shared/api.service';
import { MenuItem, MessageService } from 'primeng-lts/api';
// import { v4 as uuidv4 } from 'uuid';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  providers: [MessageService]
})
export class CrudComponent implements OnInit {


  @Input() tipo: any;

  @Input() titulo: any;

  @Input() camposExibidos: string;

  @Input() camposAutomaticos: [];

  @Input() combos: [];


  @Input() Ordem;/// : any = function (a, b) { return a - b;}

  botoes: MenuItem[];

  locale_pt;

  dados: any[] = [];
  colunas: any[] = [];

  consulta_ok = false;
  tela_ok = false;

  valoresSelecionados = [];
  colunasExibidas: string[];
  todasAsColunas: any;

  tiposBasicos: string[] = ["Boolean", "DateTime", "String", "Double", "TimeSpan", "Prefixo", "Int32"];
  listas: any[];


  //fg: FormGroup;
  
  grupos: FormGroup[];

  constructor(private api: ApiService,
    private fb: FormBuilder) { }


  ngOnInit(): void {


    this.pesquisar();

  }

  createMemberGroup(member: any): FormGroup {
    return this.fb.group({
      ...member,
    });
  }

  pesquisar() {
    this.colunasExibidas = this.camposExibidos.split(',').map(x => x.trim());

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
          disabled: true,
        },
        {
          label: 'Excluir',
          icon: 'pi pi-trash',
          command: () => { this.excluir() },
          disabled: true,
        },
      ];

    //this.tipo = this.route.snapshot.params['tipo'];




    this.api.getCombos().then(x => {
      this.listas = x;


      this.api.getGenerico(this.tipo).then(x => {
        this.dados = x.lista;
        if ( this.Ordem != undefined )
          this.dados = x.lista.sort(this.Ordem);
        this.colunas = x.propriedades.filter(x => (this.colunasExibidas.indexOf(x.field) > -1));
        this.todasAsColunas = x.propriedades;
        this.tela_ok = true;
        this.consulta_ok = true;
      })

    })


  }

  excluir() {

    this.api.deleteGenerico(this.tipo, this.valoresSelecionados).then(
      () => {
        this.pesquisar();
      }
    )

    //throw new Error("Method not implemented.");
  }
  salvar() {
    this.api.postGenerico(this.tipo, this.dados.filter(x => x.Modificado)).then(
      () => {
        this.dados.forEach(x => {
          delete x.Modificado;
        });
        this.verBotoes();
      }

    )
  }
  novoItem() {

    var novoItem = {};

    for (let i = 0; i < this.todasAsColunas.length; i++) {

      if (this.todasAsColunas[i].field == "Id") {
        novoItem[this.todasAsColunas[i].field] = this.api.newGuid();
        continue;
      }

      if (this.todasAsColunas[i].field == "Atualizacao") {
        novoItem[this.todasAsColunas[i].field] = new Date();
        continue;
      }

      if (this.todasAsColunas[i].field == "Sincronizacao") {
        novoItem[this.todasAsColunas[i].field] = new Date();
        continue;
      }
      if (this.todasAsColunas[i].field == "Ativo") {
        novoItem[this.todasAsColunas[i].field] = true;
        continue;
      }

      if (this.todasAsColunas[i].type == "Boolean") {
        novoItem[this.todasAsColunas[i].field] = false;
        continue;
      }

      if (this.todasAsColunas[i].type == "String") {
        novoItem[this.todasAsColunas[i].field] = '';
        continue;
      }

      if (this.todasAsColunas[i].type == "TimeSpan") {
        novoItem[this.todasAsColunas[i].field] = '';
        continue;
      }

      if (this.todasAsColunas[i].type == "DateTime") {
        novoItem[this.todasAsColunas[i].field] = '';
        continue;
      }      

      if (this.todasAsColunas[i].type == "Int32") {
        novoItem[this.todasAsColunas[i].field] = 0;
        continue;
      }

      novoItem[this.todasAsColunas[i].field] = { Id: null, Nome: '' };

    }




    if (this.camposAutomaticos != null)
      this.camposAutomaticos.forEach(x => {
        Object.assign(novoItem, x);
      });

    novoItem['Modificado'] = true;

    var lista = [novoItem];

    this.dados = lista.concat(this.dados);

    //throw new Error("Method not implemented.");
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
