//import { ExcelService } from './../../services/excel-service';
import * as FileSaver from "file-saver";
import { ApiService } from "./../../shared/api.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-rel-pouso",
  templateUrl: "./rel-pouso.component.html",
  styleUrls: ["./rel-pouso.component.css"],
})
export class RelPousoComponent implements OnInit {
  colunas: [];
  colunasSelecionadas: [];
  valores: [];

  colunasP: [];
  colunasSelecionadasP: [];
  valoresP: [];

  locale_pt;

  dataInicio: Date;
  dataFim: Date;

  carregando = true;
  prefixos: any;
  localidades: any;
  prefixosSelecionados: any;
  localidadesSelecionados: any;
  clientes: any;
  clientesSelecionados: any;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth(), 1);
    this.dataFim = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.locale_pt = this.api.getLocale("pt");

    this.api.getCombos().then((x) => {
      this.prefixos = x.Prefixo;
      this.localidades = x.Localidade;
      this.clientes = x.Cliente;
      this.carregando = false;
    });

    this.rodarRelatorio();
  }

  rodarRelatorio() {
    this.carregando = true;
    this.api
      .postRelPousosPorLocal({
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
        localidades: this.localidadesSelecionados
          ? this.localidadesSelecionados
          : null,
        prefixos: this.prefixosSelecionados ? this.prefixosSelecionados : null,
        clientes: this.clientesSelecionados ? this.clientesSelecionados : null,
      })
      .then((x) => {
        this.colunasSelecionadas = x.decolagens.colunas;
        this.colunas = x.decolagens.colunas.slice(
          1,
          x.decolagens.colunas.length
        );
        this.valores = x.decolagens.valores;

        this.colunasSelecionadasP = x.pousos.colunas;
        this.colunasP = x.pousos.colunas.slice(1, x.pousos.colunas.length);
        this.valoresP = x.pousos.valores;

        this.carregando = false;
      });
  }

  exportExcel() {
    import("xlsx").then((xlsx) => {
      let element = document.getElementById("dataTable");
      let worksheet = xlsx.utils.table_to_sheet(element);
      let workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      worksheet["!cols"] = [{ width: 20 }];
      let excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "decolagensPousos");
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
