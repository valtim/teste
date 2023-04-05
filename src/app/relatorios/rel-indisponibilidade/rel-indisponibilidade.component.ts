import { Indisponibilidade } from "./../../models/Indisponibilidade";
import { ApiService } from "./../../shared/api.service";
import { Component, OnInit } from "@angular/core";
import { saveAs } from 'file-saver-es'

@Component({
  selector: "app-rel-indisponibilidade",
  templateUrl: "./rel-indisponibilidade.component.html",
  styleUrls: ["./rel-indisponibilidade.component.css"],
})
export class RelIndisponibilidadeComponent implements OnInit {
  carregandoMenu = true;
  prefixos: any;
  clientes: any;
  clientesSelecionados;
  prefixosSelecionados;
  dataInicio: Date;
  dataFim: Date;
  locale_pt;
  penaliza: true;
  carregandoRelatorio: boolean;
  dados: Indisponibilidade[];
  cols: any;

  dataIniciof: Date;
  dataFimf: Date;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.locale_pt = this.api.getLocale("pt");

    this.penaliza = true;
    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth() - 1, 26);
    this.dataFim = new Date(date.getFullYear(), date.getMonth(), 25);

    this.api.getCombos().then((x) => {
      this.prefixos = x.Prefixo;
      this.clientes = x.Cliente;
      //sthis.localidades = x.Localidades;
      this.carregandoMenu = false;

      this.rodarRelatorio();
    });
  }

  rodarRelatorio() {
    this.carregandoRelatorio = true;
    const filtro = {
      prefixos: this.prefixosSelecionados,
      clientes: this.clientesSelecionados,
      penaliza: this.penaliza,
      dataInicio: this.dataInicio,
      dataFim: this.dataFim,
    };
    this.api.postIndisponibilidade(filtro).then((x) => {
      this.dados = x.dados;
      (this.cols = x.cols), (this.carregandoRelatorio = false);
      this.dataIniciof = x.filtros.dataInicio;
      this.dataFimf = x.filtros.dataFim;
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
      this.saveAsExcelFile(excelBuffer, "indisponibilidade");
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
