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
