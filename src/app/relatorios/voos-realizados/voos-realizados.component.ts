import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/shared/api.service";
import * as FileSaver from "file-saver";
@Component({
  selector: "app-voos-realizados",
  templateUrl: "./voos-realizados.component.html",
  styleUrls: ["./voos-realizados.component.css"],
})
export class VoosRealizadosComponent implements OnInit {
  carregando = true;
  clientes: any;
  dataInicio: Date;
  dataFim: Date;
  locale_pt: any;
  filtroRetorno: any;
  dados: any;
  cols: any;
  clientesSelecionados: any;
  todosOsVoos: any;
  todosOsDiarios: any;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCombos().then((x) => {
      this.clientes = x.Cliente;
      this.carregando = false;
    });

    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth(), 1);
    this.dataFim = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.locale_pt = this.api.getLocale("pt");

    this.rodarRelatorio();
  }

  rodarRelatorio() {
    this.carregando = true;
    this.api
      .postVoosRealizados({
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
        clientes: this.clientesSelecionados ? this.clientesSelecionados : null,
      })
      .then((x) => {
        //colunas = colunas, filtro = filtro, listas = listas
        //this.cols = x.colunas;
        this.dados = x.valores;
        this.filtroRetorno = x.filtro;
        this.carregando = false;
        this.todosOsVoos = x.todosOsVoos;
        this.todosOsDiarios = x.todosOsDiarios;
      });
  }

  exportExcel() {
    import("xlsx").then((xlsx) => {
      let element = document.getElementById("dataTable");
      let worksheet = xlsx.utils.table_to_sheet(element, {
        dateNF: "dd/mm/yyyy;@",
        cellDates: true,
        raw: true,
      });

      let workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      worksheet["!cols"] = [{ width: 50 }];
      let excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "voosRealizados");
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
