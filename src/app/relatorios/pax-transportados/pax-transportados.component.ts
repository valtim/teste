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

  bases;
  basesSelecionadas;
  clientesSelecionados;
  clientes;
  prefixosSelecionados;
  prefixos;
  localidades: any;

  carregando = true;
  decolagens: any;
  pousos: any;
  formPronto: boolean;

  constructor(private api: ApiService) {
    this.api.getCombos().then((x) => {
      this.prefixos = x.Prefixo;
      this.clientes = x.Cliente;
      this.bases = x.BaseDoTripulante;
      this.basesSelecionadas = x.BaseDoTripulante.map(y => y.Id);
      this.formPronto = true;
      this.carregando = false;
    });
  }

  rodarRelatorio() {
    this.carregando = true;
    this.api
      .postPaxTransportado({
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
        clientes: this.clientesSelecionados ? this.clientesSelecionados : null,
        prefixos: this.prefixosSelecionados ? this.prefixosSelecionados : null,
        localidades : this.basesSelecionadas ? this.basesSelecionadas : null,
      })
      .then((x) => {
        this.decolagens = x.decolagens;
        this.pousos = x.pousos;
        this.carregando = false;
      })
      .catch(()=>{
        this.carregando = false;
        alert('erro ao carregar dados');
      });
  }

  ngOnInit() {
    this.carregando = true;


    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), 0, 1);
    this.dataFim = new Date(date.getFullYear(), 11, 31);
    this.locale_pt = this.api.getLocale("pt");

    // this.rodarRelatorio();
  }

  exportExcel() {
    import("xlsx").then((xlsx) => {
      let sheetDec = xlsx.utils.table_to_sheet(document.getElementById("dec"));
      let sheetPou = xlsx.utils.table_to_sheet(document.getElementById("pou"));
      let wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, sheetDec, "Decolagens");
      xlsx.utils.book_append_sheet(wb, sheetPou, "Pousos");
      // worksheet["!cols"] = [{ width: 20 }, { width: 100 }];
      let excelBuffer: any = xlsx.write(wb, {
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
    saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
