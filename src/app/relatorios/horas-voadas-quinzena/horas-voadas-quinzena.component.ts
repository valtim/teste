import { ApiService } from "./../../shared/api.service";
import { Component, OnInit } from "@angular/core";
import * as FileSaver from "file-saver";

@Component({
  selector: "app-horas-voadas-quinzena",
  templateUrl: "./horas-voadas-quinzena.component.html",
  styleUrls: ["./horas-voadas-quinzena.component.css"],
})
export class HorasVoadasQuinzenaComponent implements OnInit {
  locale_pt;
  tudoPronto = false;
  dados;
  cols;

  filtroRetorno;

  dataInicio: Date;
  dataFim: Date;
  dadosInstrucao: any;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth(), 1);
    this.dataFim = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.locale_pt = this.api.getLocale("pt");

    this.rodarRelatorio();
  }

  rodarRelatorio() {
    this.tudoPronto = false;
    this.api
      .postRelHorasQuinzena({
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
      })
      .then((x) => {
        //colunas = colunas, filtro = filtro, listas = listas
        this.cols = x.colunas;
        this.dados = x.valores;
        this.dadosInstrucao = x.valoresInstrucao;
        this.filtroRetorno = x.filtro;
        this.tudoPronto = true;
      });
  }

  ajustarMatricula(matricula: string): string {
    // Matricula -> pega os últimos 5. Se tiver 4 coloca o 0 na frente, se não deixa como esta
    let matriculaFormatada = '';
    
    if (matricula.length > 5) {
      matriculaFormatada = matricula.substring(0, 5);
    } else {
      if (matricula.length == 5) {
        matriculaFormatada = matricula;
      } else {
        matriculaFormatada = matricula.padStart(5,"0");
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
    
    let dataFormatada = ('' + data.getDate()).padStart(2,"0") + ('' + (data.getMonth() + 1)).padStart(2,"0") + data.getFullYear();
    return dataFormatada;
  }

  obterValorPorCodigo(codigo,linha): string {
    /*
      8018 => Dias Úteis Diurno
      8019 => Dias Úteis Noturno
      8020 => Domingos Feriados Diurno
      8021 => Domingos Feriados Noturno

      8023 => Treinamento Dias Úteis Diurno
      8024 => Treinamento Dias Úteis Noturno
      8025 => Treinamento Domingos Feriados Diurno
      8044 => Treinamento Domingos Feriados Noturno
    */

    if (linha == null) {
      return '000:00';
    } else {
      if (codigo == '8018') {
        return linha.TotalDiurnoUtil.padStart(6,"0");
      } else if (codigo == '8019') {
        return linha.TotalNoturnoUtil.padStart(6,"0");
      } else if (codigo == '8020') {
        return linha.TotalDiurnoFeriado.padStart(6,"0");
      } else if (codigo == '8021') {
        return linha.TotalNoturnoFeriado.padStart(6,"0");
      } else {
        return '000:00';
      }
    }
  }

  gerarTXT() {
    if ( (this.dados != undefined) && (this.dados != null) && (this.dados.length > 0) ) {
      let linhas = [];
      let dataFormatada = this.formatarData(this.dataFim);
      let codigosArquivo = ['8018','8019','8020','8021','8023','8024','8025','8044']; 

      this.dados.forEach((linha,index_dados) => {
        if (linha.Matricula != null) {
          
          let linhaBase = '';

          let matricula = this.ajustarMatricula(linha.Matricula);
          linhaBase += matricula;
          linhaBase += dataFormatada;

          codigosArquivo.forEach((codigo,index_codigos)=>{
            let valor = this.obterValorPorCodigo(codigo,linha);
            let linhaFormatada = linhaBase + valor + '           0,00           0,00            0,00N';
            linhas.push(linhaFormatada);

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
    linhas.forEach((linha,index)=>{
      conteudoArquivo += linha + '\r\n';

      if (index == (linhas.length - 1)) {
        var data = new Blob([conteudoArquivo], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(data, 'horasVoadasQuinzena.txt');
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
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
