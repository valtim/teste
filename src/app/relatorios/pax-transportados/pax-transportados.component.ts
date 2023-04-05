import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/shared/api.service";
import { saveAs } from 'file-saver-es'
import { keys } from 'lodash-es';

@Component({
  selector: "app-pax-transportados",
  templateUrl: "./pax-transportados.component.html",
  styleUrls: ["./pax-transportados.component.css"],
})
export class PaxTransportadosComponent implements OnInit {
  locale_pt;
  dados;
  cols;

  dataInicio: Date;
  dataFim: Date;

  clientesSelecionados;
  clientes;
  prefixosSelecionados;
  prefixos;
  localidades: any;

  carregando = true;

  constructor(private api: ApiService) {}

  rodarRelatorio() {
    this.carregando = true;
    this.api
      .postPaxTransportado({
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
        clientes: this.clientesSelecionados ? this.clientesSelecionados : null,
        prefixos: this.prefixosSelecionados ? this.prefixosSelecionados : null,
      })
      .then((x) => {
        this.cols = x.cols;
        this.dados = x.data;
        this.carregando = false;
      });
  }

  ngOnInit() {
    this.carregando = true;
    this.api.getCombos().then((x) => {
      this.prefixos = x.Prefixo;
      this.clientes = x.Cliente;
      //sthis.localidades = x.Localidades;
      this.carregando = false;
    });

    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), 0, 1);
    this.dataFim = new Date(date.getFullYear(), 11, 31);
    this.locale_pt = this.api.getLocale("pt");

    this.rodarRelatorio();
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
      this.saveAsExcelFile(excelBuffer, "paxTransportados");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    keys.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
