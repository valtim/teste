import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { callback } from 'chart.js/dist/helpers/helpers.core';
import { MessageService } from "primeng/api";
import { ApiService } from 'src/app/shared/api.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-editar-curriculo',
  templateUrl: './editar-curriculo.component.html',
  styleUrls: ['./editar-curriculo.component.css'],
  providers: [MessageService]
})
export class EditarCurriculoComponent implements OnInit {

  @Input() curriculoSelecionado: any;
  @Output() retorno = new EventEmitter();

  mostrarLoading: boolean = false;
  locale_pt: string;
  liberarBotaoSalvar: boolean = false;
  liberarBotaoUpload: boolean = false;
  anexos: [];
  defaultUrlFoto: string = 'url(/assets/imgs/foto-padrao.jpg)'; 
  urlFoto: string = 'url(/assets/imgs/foto-padrao.jpg)';
  fotos: any[];  
  TripulanteCargo: string = "";
  TripulanteBase: string = "";
  exibirBotaoExportar: boolean = false;

  constructor(private api: ApiService, private messageService: MessageService, private cd: ChangeDetectorRef) {
    this.locale_pt = this.api.getLocale('pt');
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

  gerarNomeArquivo(): void {
    this.curriculoSelecionado.NomeArquivo = `Curriculo_${this.curriculoSelecionado.Tripulante.Trato.toUpperCase().replace(" ", "-")}.pdf`;        
  }

  ajustarData(data: any): any {
    if ((data == undefined) || (data == null)) {
      return null;
    }

    let str = [];
    if (Object.prototype.toString.call(data) === '[object Date]') {
      str = data.toISOString().split("T");
    } else {
      if (data.length == 0) {
        return null;
      } else {
        str = data.split("T");
      }
    }

    if ((str == undefined) || (str == null) || (str.length < 2)) {
      return null;
    }

    let ano = str[0].split('-')[0];
    if (ano == '0001') {
      return null;
    }

    return new Date(data);
  }

  ngOnInit(): void {    
    this.mostrarLoading = true;
    this.liberarBotaoSalvar = false;
    this.exibirBotaoExportar = false;
    
    if ((this.curriculoSelecionado == undefined) || (this.curriculoSelecionado == null)) {
      this.curriculoSelecionado = {
        CurriculosDados: []
      };
    } else {
      if ((this.curriculoSelecionado.CurriculosDados == undefined) || (this.curriculoSelecionado.CurriculosDados == null)) {
        this.curriculoSelecionado.CurriculosDados = [];
      }
    }    
    
    this.api.getCurriculoById(this.curriculoSelecionado.Tripulante.Id).then((x) => {  
      this.fotos = [];    
      this.curriculoSelecionado = x.Curriculo;
      this.gerarNomeArquivo();
      this.curriculoSelecionado.ValidadeCMA = this.ajustarData(this.curriculoSelecionado.ValidadeCMA);
      this.curriculoSelecionado.DataExpedicao = this.ajustarData(this.curriculoSelecionado.DataExpedicao);
      this.definirFoto(x.FotoTripulante);

      this.curriculoSelecionado.CurriculosDados =
        this.curriculoSelecionado.CurriculosDados.map(obj => ({
          ...obj,
          HorasComando: this.convertDoubleToString(obj.HorasComando),
          HorasCopiloto: this.convertDoubleToString(obj.HorasCopiloto),
          Total: this.convertDoubleToString(obj.HorasComando + obj.HorasCopiloto),
          Curriculo: { Id: this.curriculoSelecionado.Id }
        }));

      if (this.curriculoSelecionado.Tripulante.Cargo) {
        this.TripulanteCargo = this.curriculoSelecionado.Tripulante.Cargo.Nome;
      }
      if (this.curriculoSelecionado.Tripulante.Base) {
        this.TripulanteBase = this.curriculoSelecionado.Tripulante.Base.Nome;
      }    

      this.mostrarLoading = false;
      this.liberarBotaoSalvar = true;
      this.exibirBotaoExportar = true;
    });      
  }

  removerHorario(id) {
    this.curriculoSelecionado.CurriculosDados = this.curriculoSelecionado.CurriculosDados.filter(x => x.Id != id);        
  }

  formatarDouble(event,id,prop) {    
    this.cd.detectChanges();
    let valor = event;
    valor = valor.replace(/[^\d,]+/g, '');
    
    let linha = this.curriculoSelecionado.CurriculosDados.filter(x => x.Id == id)[0];
    linha[prop] = valor;
    linha.Total = this.calcularTotal(linha);
  }

  calcularTotal(linha) {    
    let HorasComando = 0;
    let HorasCopiloto = 0;

    if (this.validarString(linha.HorasComando)) {
      HorasComando = this.convertStringToDouble(linha.HorasComando);      
    }
    
    if (this.validarString(linha.HorasCopiloto)) {
      HorasCopiloto = this.convertStringToDouble(linha.HorasCopiloto);      
    }

    return this.convertDoubleToString( HorasComando + HorasCopiloto );
  }

  novoHorario() {
    let nova = {   
      "Id": uuidv4(),
      Ativo: true,   
      OperadorAereo: '',
      PeriodoInicio: null,
      PeriodoFim : null,
      Modelo: '',
      HorasComando: '0',
      HorasCopiloto: '0',
      Total: '0',
      Curriculo: { Id: this.curriculoSelecionado.Id },
      Ordem: this.curriculoSelecionado.CurriculosDados.length 
    };
    this.curriculoSelecionado.CurriculosDados.push(nova);    
  }

  definirFoto(foto: any): void {
    if (
      (foto != undefined) &&
      (foto != null) &&
      (foto.Id != undefined) &&
      (foto.Id != null) &&
      (foto.Id != "")
    ) {
      this.fotos.push(foto);
      this.urlFoto = `url(${this.api.url}arquivo/${foto.Id})`;      
      this.liberarBotaoUpload = false;
    } else {
      this.urlFoto = this.defaultUrlFoto;
      this.liberarBotaoUpload = true;
    }
  }

  uploadAnexos(event) {
    this.mostrarLoading = true;
    const formData = new FormData();
    event.files.forEach((arq, index) => {
      let nameFile = "FOTO_" + this.curriculoSelecionado.Tripulante.Trato.replace(/ /g, '_');            
      formData.append(`file[${index}]`, arq, nameFile);
    
      if (index == (event.files.length - 1)) {
        this.fotos = [];
        this.api.salvarFotoTripulante(this.curriculoSelecionado.Tripulante.Id,formData).then((arquivos) => {                              
          arquivos.forEach((arquivo, indexArquivos) => {
            if (indexArquivos == (arquivos.length - 1)) {
              this.definirFoto(arquivo);              
              this.mostrarLoading = false;                            
            }
          });                    
        });        
      }
    });
  }

  apagarAnexo(id : string){
    this.mostrarLoading = true;
    this.api.deleteAnexo(id).then(() => {
      this.fotos = [];
      this.definirFoto(null);
      this.mostrarLoading = false;
    });
  }

  abrirArquivo(id : string) {    
    if (this.fotos.length == 1) {
      window.open(`${this.api.url}arquivo/${this.fotos[0].Id}`,'_blank');
    }    
  }

  validar(curriculo,callback) {
    let valido = true;

    if (curriculo.CurriculosDados.length == 0) {
      callback(true);
    } else {
      curriculo.CurriculosDados.forEach((entry,index) => {
        if (this.validarString(entry.HorasComando)) {
          entry.HorasComando = this.convertStringToDouble(entry.HorasComando);
        } else {
          valido = false;
        }
        if (this.validarString(entry.HorasCopiloto)) {
          entry.HorasCopiloto = this.convertStringToDouble(entry.HorasCopiloto);
        } else {
          valido = false;
        }
        if (valido) {
          entry.Total = entry.HorasComando + entry.HorasCopiloto;
        }
        
        if (index == (curriculo.CurriculosDados.length - 1)) {
          callback(valido);
        }
      });
    }
  }

  downloadResponse(res) {    
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute('style','display: none');
    let url = URL.createObjectURL(res.blob);
    a.href = url;
    a.download = res.fileName;
    a.click();
    window.URL.revokeObjectURL(url);

    this.mostrarLoading = false;
    this.exibirBotaoExportar = true;
  }

  exportar(): void {    
    this.exibirBotaoExportar = false;
    this.mostrarLoading = true;
    
    this.api.obterCurriculosPDF([this.curriculoSelecionado]).then((x) => {
        this.downloadResponse(x);
    });
  }

  salvar(): void {
    this.mostrarLoading = true;
    this.liberarBotaoSalvar = false;

    // Clonar objeto para validar e converter doubles
    let curriculo = JSON.parse(JSON.stringify(this.curriculoSelecionado));

    this.validar(curriculo,valido=>{
      if (!valido) {
        this.mostrarLoading = false;
        this.liberarBotaoSalvar = true;
        this.messageService.add({
          severity: "error",
          summary: "Erro",
          detail: "Há erros nos campos horas de Comando e Copiloto!",
        });
      } else {        
        this.api.salvarCurriculo(curriculo).then(x => {
          if (!x.Salvo) {            
            this.messageService.add({severity: "error", summary: "SOL Sistemas", detail: "Erro ao salvar o Currículo!" });
          } else {
            this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Currículo salvo com sucesso!' });
          }
          console.log(x.Mensagem);                          
          this.mostrarLoading = false;
          this.liberarBotaoSalvar = true;
          
          if (this.curriculoSelecionado.CurriculosDados.length > 0) {
            this.curriculoSelecionado.CurriculoIncompleto = false;            
          } else {
            this.curriculoSelecionado.CurriculoIncompleto = true;
          }
          this.retorno.emit(this.curriculoSelecionado.CurriculoIncompleto);         

        }).catch((x) => {
          this.mostrarLoading = false;
          this.liberarBotaoSalvar = true;
          console.error(x);
          this.messageService.add({severity: "error", summary: "SOL Sistemas", detail: "Erro ao salvar o Currículo!" });
        });        
      }
    });    
  }
}
