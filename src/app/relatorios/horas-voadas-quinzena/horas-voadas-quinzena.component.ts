import { ApiService } from "./../../shared/api.service";
import { Component, OnInit } from "@angular/core";
import { saveAs } from 'file-saver-es'
import { Coluna } from "src/app/coluna";

@Component({
  selector: "app-horas-voadas-quinzena",
  templateUrl: "./horas-voadas-quinzena.component.html",
  styleUrls: ["./horas-voadas-quinzena.component.css"],
})
export class HorasVoadasQuinzenaComponent implements OnInit {
  locale_pt;
  tudoPronto = true;
  dados;

  filtroRetorno;

  dataInicio: Date;
  dataFim: Date;
  dadosInstrucao: any;
  detalhado: any;
  colunas: any;
  memoriaDeCalculo: any;

  exibirMemoria = false;

  agruparMensal: boolean;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    this.dataFim = new Date(date.getFullYear(), date.getMonth(), 0);

    this.locale_pt = this.api.getLocale("pt");

    //this.rodarRelatorio();
  }

  rodarRelatorio() {
    this.dados = undefined;
    this.tudoPronto = false;
    this.api
      .postRelHorasQuinzena({
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
        agruparMensal: this.agruparMensal,
      })
      .then((x) => {
        //colunas = colunas, filtro = filtro, listas = listas
        this.colunas = x.colunas;
        this.dados = x.tabela;
        this.dadosInstrucao = x.valoresInstrucao;
        this.filtroRetorno = x.filtro;


        this.memoriaDeCalculo = x.memoriaDeCalculo;

        this.dados.forEach(l => {
          Object.keys(l).forEach(x => {
            l[x] = this.transformTimeSpan(l[x], true);
          })
        })

        this.tudoPronto = true;
      })
      .catch((e) => {
        this.dados = null;
        this.tudoPronto = true;
        alert('Erro ao Rodar Consulta no Banco\n' + e.message);
      })
  }

  ajustarMatricula(matricula: string): string {
    // Matricula -> pega os últimos 5. Se tiver 4 coloca o 0 na frente, se não deixa como esta
    let matriculaFormatada = '';

    if (matricula.length > 5) {
      matriculaFormatada = matricula.substring(matricula.length - 5, matricula.length);
    } else {
      if (matricula.length == 5) {
        matriculaFormatada = matricula;
      } else {
        matriculaFormatada = matricula.padStart(5, "0");
      }
    }

    return matriculaFormatada;
  }

  formatarData(data: Date): string {

    let dataBase = data;
    if (data == null) {
      let date = new Date();
      dataBase = new Date(date.getFullYear(), date.getMonth(), 1);
    }

    let dataFormatada = ('' + data.getDate()).padStart(2, "0") + ('' + (data.getMonth() + 1)).padStart(2, "0") + data.getFullYear();
    return dataFormatada;
  }

  formatBristow(valor: string): string {
    return valor.substring(0, valor.length - 3).padStart(6, '0');
  }


  obterValorPorCodigo(codigo, linha): Array<string> {
    /*
      8018 => Dias Úteis Diurno
      8019 => Dias Úteis Noturno
      8020 => Domingos Feriados Diurno
      8021 => Domingos Feriados Noturno

      8023 => Treinamento Dias Úteis Diurno
      8024 => Treinamento Dias Úteis Noturno
      8025 => Treinamento Domingos Feriados Diurno
      8044 => Treinamento Domingos Feriados Noturno

      0861 => Adicional 1/3 Horas Instrução
      0868 => AD.NOTURNO 20%
      0938 => ADICIONAL NOTURNO INSTRUÇÃO

    */

    if (linha == null) return [];

    if (codigo == '8018' && linha.HorasSomadasSemDobras != '00:00:00')
      return ['8018' + this.formatBristow(linha.HorasSomadasSemDobras)];

    if (codigo == '8019' && linha.NoturnoUtil != '00:00:00')
      return ['8019' + this.formatBristow(linha.NoturnoUtil)];

    if (codigo == '8020' && linha.DiurnoFeriadoCalc != '00:00:00')
      return ['8020' + this.formatBristow(linha.DiurnoFeriadoCalc)];

    if (codigo == '8021' && linha.NoturnoFeriado != '00:00:00')
      return ['8021' + this.formatBristow(linha.NoturnoFeriado)];


    if (codigo == '8023' && linha.TotalTreinamento != '00:00:00')
      return ['8023' + this.formatBristow(linha.TotalTreinamento)];

    if (codigo == '8024' && linha.TreinamentoNoturnoUtil != '00:00:00')
      return ['8024' + this.formatBristow(linha.TreinamentoNoturnoUtil)];

    if (codigo == '8025' && linha.TreinamentoDiurnoFeriadoCalc != '00:00:00')
      return ['8025' + this.formatBristow(linha.TreinamentoDiurnoFeriadoCalc)];

    if (codigo == '8044' && linha.TreinamentoNoturnoFeriado != '00:00:00')
      return ['8044' + this.formatBristow(linha.TreinamentoNoturnoFeriado)];



    if (codigo == '0861' && linha.TotalPagamentoInstrucao != '00:00:00')
      return ['0861' + this.formatBristow(linha.TotalPagamentoInstrucao)];

    if (codigo == '0868' && linha.HorasNoturnoComAdicional != '00:00:00')
      return ['0868' + this.formatBristow(linha.HorasNoturnoComAdicional)];

    if (codigo == '0938' && linha.HorasDeInstrucaoNoturnas != '00:00:00')
      return ['0938' + this.formatBristow(linha.HorasDeInstrucaoNoturnas)];

    return [];

  }


  transformTimeSpan(value: string, segundos: boolean = false): string {
    if (value == undefined) return '';
    if (value == null) return '';
    if (value == '') return '';

    if (value.indexOf(':') == -1) return value;

    let pedacos = value.split(':');

    if (pedacos[0].indexOf('.') > -1) {
      let ponto = pedacos[0].split('.');

      let dias: number = Number(ponto[0]) * 24;
      let horas: number = Number(ponto[1]);

      horas += dias;

      pedacos[0] = horas.toString();
    }
    if (segundos)
      return pedacos[0] + ':' + pedacos[1] + ':00';
    return pedacos[0] + ':' + pedacos[1];
  }

  gerarTXT() {
    if ((this.dados != undefined) && (this.dados != null) && (this.dados.length > 0)) {
      let linhas = [];
      let dataFormatada = this.formatarData(this.dataFim);
      let codigosArquivo = ['8018', '8019', '8020', '8021', '8023', '8024', '8025', '8044', '0861', '0868', '0938'];

      this.dados.forEach((linha, index_dados) => {
        if (linha.Matricula != null) {

          codigosArquivo.forEach((codigo, index_codigos) => {


            let linhaBase = '';
            linhaBase += this.ajustarMatricula(linha.Matricula) + '           ';
            linhaBase += dataFormatada;
            this.obterValorPorCodigo(codigo, linha)
              .forEach(x => {
                linhas.push(linhaBase + x + '           0,00           0,00            0,00N')
              });

            if (index_codigos == (codigosArquivo.length - 1)) {
              if (index_dados == (this.dados.length - 1)) {
                this.exportTXT(linhas);
              }
            }
          });
        }
      });
    }
  }

  exportTXT(linhas) {
    let conteudoArquivo = '';
    linhas.forEach((linha, index) => {
      conteudoArquivo += linha + '\r\n';

      if (index == (linhas.length - 1)) {
        var data = new Blob([conteudoArquivo], { type: 'text/plain;charset=utf-8' });
        saveAs(data, 'horasVoadasQuinzena.txt');
      }
    });
  }

  exportExcel() {
    import("xlsx").then((xlsx) => {
      let element = document.getElementById("dataTable");
      let worksheet = xlsx.utils.table_to_sheet(element);
      let workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      // worksheet["!cols"] = [{ width: 20 }, { width: 100 }];
      let excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "horasVoadasQuinzena");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
