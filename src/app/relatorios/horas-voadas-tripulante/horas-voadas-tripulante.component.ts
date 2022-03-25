import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../shared/api.service";
import * as FileSaver from "file-saver";
import { Workbook } from "exceljs";
import { wordBreak } from "html2canvas/dist/types/css/property-descriptors/word-break";

declare function print(): any;

@Component({
  selector: "app-horas-voadas-tripulante",
  templateUrl: "./horas-voadas-tripulante.component.html",
  styleUrls: ["./horas-voadas-tripulante.component.css"],
})
export class HorasVoadasTripulanteComponent implements OnInit {
  locale_pt;
  tudoPronto = false;
  dados;
  cols;

  filtroRetorno;

  dataInicio: Date;
  dataFim: Date;

  tripulantes;

  tripulanteSelecionado;

  trato;

  podeRodar = true;
  tabelaVisivel = true;
  totais;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCombos().then((x) => {
      this.tripulantes = x.Tripulante;
      this.tripulanteSelecionado = x.Tripulante[0];
      this.tudoPronto = true;
    });

    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth(), 1);
    this.dataFim = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.locale_pt = this.api.getLocale("pt");
  }

  imprimir() {
    this.podeRodar = false;
    this.tabelaVisivel = false;
    this.tabelaVisivel = true;
    print();

    //this.podeRodar = true;
  }

  rodarRelatorio() {
    this.tudoPronto = false;
    this.api
      .postRelHorasPorTripulante({
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
        tripulante: this.tripulanteSelecionado.Id,
      })
      .then((x) => {
        //colunas = colunas, filtro = filtro, listas = listas
        this.cols = x.colunas;
        this.dados = x.valores;
        this.filtroRetorno = x.filtro;
        this.trato = x.trato;
        this.totais = x.totais;
        this.tudoPronto = true;
      });
  }

  exportExcel() {
    import("xlsx").then((xlsx) => {
      let title = document.getElementById("title");
      let subtitle = document.getElementById("subtitle");
      let trato = document.getElementById("trato");
      let element = document.getElementById("dataTable");

      let worksheet = xlsx.utils.table_to_sheet(element);
      let workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };

      let excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "horasVoadasTripulante");
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
