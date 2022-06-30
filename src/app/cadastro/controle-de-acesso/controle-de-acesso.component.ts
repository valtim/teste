import * as FileSaver from "file-saver";
import { PermissoesDeAcesso } from "./../../models/PermissoesDeAcesso";
import { Component, EventEmitter, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ApiService } from "src/app/shared/api.service";
import { Workbook } from "exceljs";

@Component({
  selector: "app-controle-de-acesso",
  templateUrl: "./controle-de-acesso.component.html",
  styleUrls: ["./controle-de-acesso.component.css"],
  providers: [MessageService],
})
export class ControleDeAcessoComponent implements OnInit {
  permissoes: Array<PermissoesDeAcesso> = [];
  selectedContrato;

  constructor(private api: ApiService, private router: Router) {}

  cols: any[];
  exportColumns: any[];
  data: any[];

  ngOnInit(): void {
    this.exibirRelatorio();
    this.cols = [
      { field: "Username", header: "Nome", minWidth: 200 },
      { field: "Perfis", header: "Perfis" },
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

  exportExcel() {
    import("xlsx").then((xlsx) => {
      let element = document.getElementById("dataTable");
      let worksheet = xlsx.utils.table_to_sheet(element);
      let workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      worksheet["!cols"] = [{ width: 20 }, { width: 100 }];
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
