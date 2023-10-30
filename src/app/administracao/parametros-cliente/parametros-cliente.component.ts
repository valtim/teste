import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-parametros-cliente',
  templateUrl: './parametros-cliente.component.html',
  styleUrls: ['./parametros-cliente.component.css']
})
export class ParametrosClienteComponent implements OnInit {

  carregando: boolean = true;

  // Filtros
  prefixoFiltro: any = {Id: '', Nome: ''};
  prefixosFiltro: any[] = [];
  prefixosParaEdicao: any[] = [];
  clienteFiltro: any = {Id: '', Nome: ''};
  clientesFiltro: any[] = [];
  clientesParaEdicao: any[] = [];
  configuracaoFiltro: any = {Id: '', Nome: '', NomeConfiguracao: '', TipoDeAeronave: {Nome: ''}};
  configuracoesFiltro: any[] = [];
  aeroportos: any[] = [];

  botaoExcluir: boolean = false;
  exibirDialogo: boolean = false;

  parametroSelecionado: any = null;
  exibirEdicao: boolean = false;

  parametros: any[] = [];
  cacheParametros: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.carregando = true;   
    this.rodarRelatorio();
  }

  obterDados(callback): void {    
    this.api.getParametrosCliente().then(retorno => {
      callback(retorno);
    });
  }

  rodarRelatorio(): void {
    this.carregando = true;

    this.obterDados((retorno) => {

      // Clone
      this.prefixosParaEdicao = JSON.parse(JSON.stringify(retorno.Prefixos));
      this.clientesParaEdicao =  JSON.parse(JSON.stringify(retorno.Clientes));

      retorno.Prefixos.unshift(this.prefixoFiltro);
      this.prefixosFiltro = retorno.Prefixos;      

      retorno.Clientes.unshift(this.clienteFiltro);
      this.clientesFiltro = retorno.Clientes;

      retorno.Configuracoes.unshift(this.configuracaoFiltro);
      this.configuracoesFiltro = retorno.Configuracoes;

      this.aeroportos = retorno.Aeroportos;

      this.parametros = retorno.ParametrosCliente.map(obj => ({
        ...obj,
        RelPrefixo: (obj.Prefixo != null) ? obj.Prefixo.PrefixoCompleto : "",
        RelTipoDeAeronave: ((obj.Configuracao != null) && (obj.Configuracao.TipoDeAeronave != null)) ? obj.Configuracao.TipoDeAeronave.Nome : "",
        RelConfiguracao: (obj.Configuracao != null) ? obj.Configuracao.Nome : "",
        RelCliente: (obj.Cliente != null) ? obj.Cliente.Nome : "",
        Marcado: false
      }));

      this.cacheParametros = JSON.parse(JSON.stringify(this.parametros));
      this.carregando = false;

      // Para testar
      // console.log(retorno);
    });
    
  }

  marcarCheckbox(): void {
    this.botaoExcluir = (this.parametros.filter(t => t.Marcado).length > 0);
  }

  exibirDialogoNovo(): void {
    let novo = {
      Id: uuidv4(),
      Ativo: true,
      Prefixo: null,
      Configuracao: null,
      Cliente: null,
      Distancia: 0.0,
      Aeroporto: '',
      PodeArredondar: false,
      Velocidade: 0.0,
      Consumo: 0.0,
      CorrecaoPartida: 0.0,
      ConsumoPartida: 0.0,
      CorrecaoEntre: 0.0,
      ConsumoEntre: 0.0,
      CorrecaoPouso: 0.0,
      ConsumoPouso: 0.0,
      CorrecaoTCUM: 0.0,
      ConsumoTCUM: 0.0,
      CorrecaoDeDescida: 0.0,
      ConsumoDeDescida: 0.0      
    };

    this.exibirDialogoEdicao(novo);
  }

  exibirDialogoEdicao(parametro: any): void {
    this.parametroSelecionado = parametro;
    this.exibirEdicao = true;
  }

  ocultarDialogoEdicao(): void {
    this.parametroSelecionado = null;
    this.exibirEdicao = false;
  }

  compare(a: any, b: any): number {
    if (a.Prefixo && b.Prefixo) {
      if ( a.Prefixo.PrefixoCompleto < b.Prefixo.PrefixoCompleto ){
        return -1;
      }
      if ( a.Prefixo.PrefixoCompleto > b.Prefixo.PrefixoCompleto ){
        return 1;
      }
      return 0;
    } else {
      return 0;
    }    
  }

  findWithAttr(array,attr,value,callback): void {
    let index = -1;
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
          index = i;
        }
    }
    callback(index);
  }

  retornoDialogoEdicao(parametro: any): void {
    // Para testar
    // console.log(parametro);

    this.exibirEdicao = false;
    this.carregando = true;

    parametro.RelPrefixo = (parametro.Prefixo != null) ? parametro.Prefixo.Nome : "";
    parametro.RelTipoDeAeronave = ((parametro.Configuracao != null) && (parametro.Configuracao.TipoDeAeronave != null)) ? parametro.Configuracao.TipoDeAeronave.Nome : "";
    parametro.RelConfiguracao = (parametro.Configuracao != null) ? parametro.Configuracao.Nome : "";
    parametro.RelCliente = (parametro.Cliente != null) ? parametro.Cliente.Nome : "";
    parametro.Marcado = false;

    let Id = this.parametroSelecionado.Id;
    this.findWithAttr(this.parametros,'Id',Id,(index)=>{

      if (index > -1) {
        // Alterado
        this.parametros[index] = parametro;
      } else {
        // Novo
        this.parametros.push(parametro);
      }        

      this.parametros.sort(this.compare);
      this.cacheParametros = JSON.parse(JSON.stringify(this.parametros));
      this.parametroSelecionado = null;    
      this.carregando = false;      
    });    
  }

  exibirDialogoExclusao(): void {
    this.exibirDialogo = true;
  }

  ocultarDialogoExclusao(): void {
    this.exibirDialogo = false;
  }

  excluirParametros(): void {
    this.exibirDialogo = false;
    this.carregando = true;
    let listaExcluir = this.parametros.filter(t => t.Marcado);
    let listaSemExcluidos = this.parametros.filter(t => t.Marcado == false);

    this.api.deleteParametrosCliente(listaExcluir).then(ok => {      
      this.parametros = listaSemExcluidos;
      this.cacheParametros = this.parametros;
      this.carregando = false;
    });
  }
  
  filtrarCurriculos(): void {
    if ((this.cacheParametros != undefined) && (this.cacheParametros != null)) {      

      // Organizar Filtros
      let of_prefixo = ((this.prefixoFiltro != null) && (this.prefixoFiltro.Id != null) && (this.prefixoFiltro.Id != ''));
      let of_cliente = ((this.clienteFiltro != null) && (this.clienteFiltro.Id != null) && (this.clienteFiltro.Id != ''));
      let of_configuracao = ((this.configuracaoFiltro != null) && (this.configuracaoFiltro.Id != null) && (this.configuracaoFiltro.Id != ''));

      if (!of_prefixo && !of_cliente && !of_configuracao) {
        this.parametros = this.cacheParametros;        
      } else {        
        this.parametros = this.cacheParametros.filter(
          t => (
              (of_prefixo && (t.RelPrefixo == this.prefixoFiltro.Nome)) || 
              (of_cliente && (t.RelCliente == this.clienteFiltro.Nome)) ||
              (
                (of_configuracao && (t.Configuracao != null) && (t.Configuracao.Nome == this.configuracaoFiltro.NomeConfiguracao)) &&
                (of_configuracao && (t.Configuracao != null) && (t.Configuracao.TipoDeAeronave != null) && (t.Configuracao.TipoDeAeronave.Nome == this.configuracaoFiltro.TipoDeAeronave.Nome))
              )
            )
        );
      }                  
    }
  }

}