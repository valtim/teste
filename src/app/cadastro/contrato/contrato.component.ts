import * as FileSaver from "file-saver";
import { PermissoesDeAcessoById } from "./../../models/PermissaoDeAcessoById";
import { PermissoesDeAcesso } from "./../../models/PermissoesDeAcesso";
import { Component, EventEmitter, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService, MenuItem } from "primeng/api";
import { element } from "protractor";
import { ApiService } from "src/app/shared/api.service";
import { jsPDF } from "jspdf";

@Component({
  selector: "app-contrato",
  templateUrl: "./contrato.component.html",
  styleUrls: ["./contrato.component.css"],
  providers: [MessageService],
})
export class ContratoComponent implements OnInit {
  permissoes: Array<PermissoesDeAcesso> = [];

  selectedContrato;

  constructor(private api: ApiService, private router: Router) {}

  cols: any[];
  exportColumns: any[];

  ngOnInit(): void {
    this.exibirRelatorio();
    this.cols = [
      { field: "Username", header: "Nome", minWidth: 200 },
      { field: "Perfis", header: "Perfis" },

      //hide: true
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  exibirRelatorio() {
    this.api.getPermissao().then((resp) => {
      this.permissoes = resp;
    });
  }

  // exportPdf() {
  //   import("jspdf").then((jsPDF) => {
  //     import("jspdf-autotable").then((x) => {

  //       const doc = new jsPDF.default(0, 0);
  //       doc.autoTable(this.exportColumns, this.permissoes);
  //       doc.save("products.pdf");
  //     });
  //   });
  // }

  exportExcel() {
    import("xlsx").then((xlsx) => {
      let element = document.getElementById("dataTable");
      let worksheet = xlsx.utils.table_to_sheet(element);
      let workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      let excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "permissoes");
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

  onRowSelect(event) {
    this.router.navigate(["/controle-de-acesso/" + event.data.Id]);
  }
  novoCadastro() {
    this.router.navigate(["/controle-de-acesso/novo"]);
  }
}
