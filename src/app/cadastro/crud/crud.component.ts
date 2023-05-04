import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
// import { v4 as uuidv4 } from 'uuid';
import { MenuItem, MessageService, SortEvent } from 'primeng/api';
import { GuidUtil } from 'src/app/shared/GuidUtil';
import { ApiGenericoService } from 'src/app/shared/api.generico.service';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  providers: [MessageService]
})
export class CrudComponent implements OnInit, AfterContentChecked  {


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

  tiposBasicos: string[] = ["Boolean", "DateTime", "String", "Double", "TimeSpan", "Prefixo","Tripulante", "Int32"];
  listas: any[];



  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result =  null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result);
    });

  }


  //fg: FormGroup;
  
  grupos: UntypedFormGroup[];

  constructor(
    private api: ApiService,
    private apiGenerico: ApiGenericoService,
    private fb: UntypedFormBuilder) {
      
     }
  ngAfterContentChecked(): void {
    this.verBotoes()
  }


  ngOnInit(): void {


    this.pesquisar();

  }

  createMemberGroup(member: any): UntypedFormGroup {
    return this.fb.group({
      ...member,
    });
  }

  pesquisar() {
    this.colunasExibidas = this.camposExibidos.split(',').map(x => x.trim());

    this.verBotoes();

    //this.tipo = this.route.snapshot.params['tipo'];




    this.api.getCombos().then(x => {
      this.listas = x;


      this.apiGenerico.getGenerico(this.tipo).then(x => {
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

    this.apiGenerico.deleteGenerico(this.tipo, this.valoresSelecionados).then(
      () => {
        this.pesquisar();
      }
    )

    //throw new Error("Method not implemented.");
  }
  salvar() {
    this.apiGenerico.postGenerico(this.tipo, this.dados.filter(x => x.Modificado)).then(
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
        novoItem[this.todasAsColunas[i].field] = GuidUtil.NewGuid();
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
          disabled: this.dados.filter(x=>x.Modificado).length == 0,
        },
        {
          label: 'Excluir',
          icon: 'pi pi-trash',
          command: () => { this.excluir() },
          disabled: this.valoresSelecionados.length == 0,
        },
      ];
  }

  mudeiAqui(e, dado) {
    dado['Modificado'] = true;
    this.verBotoes();
  }

  mudeiAquiData(e, dado, campo) {
    let pedacos = dado[campo].split("/");

    if ( pedacos.length != 3 )
      return;

    dado[campo] = new Date(pedacos[2], (+pedacos[1])-1, pedacos[0]);
    this.mudeiAqui(e, dado);
  }

}
