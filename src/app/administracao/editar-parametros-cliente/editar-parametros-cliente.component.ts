import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-editar-parametros-cliente',
  templateUrl: './editar-parametros-cliente.component.html',
  styleUrls: ['./editar-parametros-cliente.component.css'],
  providers: [MessageService]
})
export class EditarParametrosClienteComponent implements OnInit {

  @Input() parametroSelecionado: any;
  @Input() prefixos: any[];
  @Input() clientes: any[];
  @Input() aeroportos: any[];
  @Output() retorno = new EventEmitter();

  mostrarLoading = false;
  liberarBotaoSalvar = true;

  prefixoSelecionado: any = null;
  configuracaoSelecionada: any = null;
  configuracaoDisabled = true;
  aeroportoSelecionado: any = null;

  constructor(private api: ApiService, private messageService: MessageService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.configurarDropdowns();
    this.mostrarLoading = false;        
  }
  
  obterPesoBaseDoPrefixoVazio(): any {
    let PesoBaseDoPrefixo = {
      Id: '',
        PesoBasico: 0.0,
        EstacaoBaseLongitudinal: 0.0,
        EstacaoBaseLateral: 0.0,
        UltimaUtilizada: false
    };
    return PesoBaseDoPrefixo;
  }

  obterConfiguracaoVazia(): any {
    let Configuracao = {
      Id: '',
      Nome: '',
      PesoBaseDoPrefixo: this.obterPesoBaseDoPrefixoVazio(),
      TipoDeAeronave: {Nome: ''}
    };
    return Configuracao;
  }

  configurarDropdowns(): void {

    let temPrefixo = this.parametroSelecionado.Prefixo != null;
    let temConfiguracao = this.parametroSelecionado.Configuracao != null;
    let temAeroporto = this.parametroSelecionado.Aeroporto != null;

    if (this.prefixoSelecionado == null) {
      if (this.parametroSelecionado.Prefixo) {
        let temp = this.prefixos.filter(p => temPrefixo && p.Id == this.parametroSelecionado.Prefixo.Id);
        if (temp && temp.length > 0) {
          this.prefixoSelecionado = temp[0];
          this.configuracaoDisabled = false;
        }
      } else {
        this.prefixoSelecionado = {
          Id: '', Nome: '', Configuracoes: [this.obterConfiguracaoVazia()]
        };
      }      
    }

    if (this.parametroSelecionado.Configuracao) {
      let temp = this.prefixoSelecionado.Configuracoes.filter(
        c => temConfiguracao &&
        c.Id == this.parametroSelecionado.Configuracao.Id
      );
      if (temp && temp.length > 0) {
        this.configuracaoSelecionada = temp[0];
      } else {
        this.configuracaoSelecionada = this.obterConfiguracaoVazia();        
      }      
    } else {
      this.configuracaoSelecionada = this.obterConfiguracaoVazia();
    }

    if (this.aeroportoSelecionado == null) {
      let temp = this.aeroportos.filter(a => temAeroporto && a.Nome == this.parametroSelecionado.Aeroporto);
      if (temp && temp.length > 0) {
        this.aeroportoSelecionado = temp[0];
      } else {
        this.aeroportoSelecionado = { Id: '', Nome: '' };
      }      
    }
  }

  selecionarPrefixo(): void {
    this.configuracaoDisabled = false;      
  }

  formatarDouble(event,prop) {    
    this.cd.detectChanges();
    let valor = event;
    valor = valor.replace(/[^\d,]+/g, '');
    if (valor.indexOf(',') > -1) {
      valor = valor.substring(0, (valor.indexOf(',')+2));
    }
    this.parametroSelecionado[prop] = valor;
  }

  cleanDecimalsString(value) {    
    if (value.includes(",")) {
      let size = value.split(",")[1].length || 0; 
    if (size >= 4) {
      let partes = value.split(",");
      return partes[0] + ',' + partes[1][0];
    } else {
      return value;
    }      
    } else {
      return value;
    }    
  }

  convertDoubleToString(valor): string {
    if ((valor == undefined) || (valor == null) || (valor == '')) {      
      return '0';
    } else {
      let retorno = valor.toString().replace('.',',');
      return this.cleanDecimalsString(retorno);
    }
  }

  countDecimals(value) {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0; 
  }

  convertStringToDouble(valor): any {
    if ((valor == undefined) || (valor == null) || (valor == 0)) {      
      return 0;
    } else {
      let retorno = parseFloat(valor.replace(',','.'));
      if (this.countDecimals(retorno) >= 4) {
        return retorno.toFixed(1);
      } else {
        return retorno;
      }             
    }
  }

  isInt(n: any): boolean{
    return Number(n) === n && n % 1 === 0;
  }

  isFloat(n: any): boolean {
    return Number(n) === n && n % 1 !== 0;
  }

  validarString(v: any) {
    let s = String(v);
    let valor = parseFloat(s.replace(',','.'));
    if (this.isInt(valor) || this.isFloat(valor)) {
       return true;     
    }
    return false;
  }

  validar(parametro,callback): void {
    let valido = true;
    let msg = 'Valores válidos!';

    let campos = [
      'Distancia',
      'Velocidade',
      'Consumo',
      'CorrecaoPartida',
      'ConsumoPartida',
      'CorrecaoEntre',
      'ConsumoEntre',
      'CorrecaoPouso',
      'ConsumoPouso',
      'CorrecaoTCUM',
      'ConsumoTCUM',
      'CorrecaoDeDescida',
      'ConsumoDeDescida'
    ];

    let mensagens = [
      'Distância',
      'Velocidade',
      'Consumo',
      'Correção Partida',
      'Consumo Partida',
      'Correção Entre',
      'Consumo Entre',
      'Correção Pouso',
      'Consumo Pouso',
      'Correção TCUM',
      'Consumo TCUM',
      'Correção de Descida',
      'Consumo de Descida'
    ];

    campos.forEach((entry,index) => {
      if (this.validarString(parametro[entry])) {
        parametro[entry] = this.convertStringToDouble(''+parametro[entry]);
      } else {
        valido = false;
        msg = 'Valor de ' + mensagens[index] + ' inválido!';
      }            
      if (index == (campos.length - 1)) {

        if (!valido) {
          callback(valido,msg);
        } else {

          if (this.prefixoSelecionado.Id == '') {
            callback(false,'Deve-se selecionar um Prefixo!');
          } else {
            parametro.Prefixo = this.prefixoSelecionado;

            if (this.configuracaoSelecionada.Id == '') {
              callback(false,'Deve-se selecionar uma Configuração!');
            } else {
              parametro.Configuracao = this.configuracaoSelecionada;
  
              if (this.aeroportoSelecionado.Id == '') {
                callback(false,'Deve-se selecionar um Aeroporto!');
              } else {
                parametro.Aeroporto = this.aeroportoSelecionado.Nome;
    
                callback(true,msg);

              }

            }

          }          
        }        
      }
    });
  }

  salvar(): void {
    this.mostrarLoading = true;
    this.liberarBotaoSalvar = false;

    // Clonar objeto para validar e converter doubles
    let parametro = JSON.parse(JSON.stringify(this.parametroSelecionado));
    
    this.validar(parametro,(valido,msg)=>{      
      if (!valido) {
        this.mostrarLoading = false;
        this.liberarBotaoSalvar = true;
        this.messageService.add({severity: "error", summary: "Erro", detail: msg});
      } else {             
        this.api.postParametrosCliente(parametro).then(x => {        
          if (!x.Salvo) {            
            this.messageService.add({severity: "error", summary: "SOL Sistemas", detail: "Erro ao salvar os Parâmetros do Cliente!" });
          } else {
            this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Parâmetros do Cliente salvos com sucesso!' });
          }
          console.log(x.Mensagem);                          
          this.mostrarLoading = false;
          this.liberarBotaoSalvar = true;          
          this.retorno.emit(parametro);         

        }).catch((x) => {
          this.mostrarLoading = false;
          this.liberarBotaoSalvar = true;
          console.error(x);
          this.messageService.add({severity: "error", summary: "SOL Sistemas", detail: "Erro ao salvar os Parâmetros do Cliente!" });
        });        
      }
    });
  }

}
