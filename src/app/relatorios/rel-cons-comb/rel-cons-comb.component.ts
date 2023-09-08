import { ApiService } from 'src/app/shared/api.service';
import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-rel-cons-comb',
  templateUrl: './rel-cons-comb.component.html',
  styleUrls: ['./rel-cons-comb.component.css']
})
export class RelConsCombComponent implements OnInit {

  locale_pt;
  tudoPronto = false;
  dados;
  cols;

  dataInicio: Date;
  dataFim: Date;

  clientesSelecionados;
  clientes;
  prefixosSelecionados;
  prefixos;

  filtroRetorno;

  CE: string = "";
  total: any;


  constructor(private api: ApiService) { }

  ngOnInit(): void {

    this.api.getCombos().then(x => {
      this.prefixos = x.Prefixo;
      this.clientes = x.Cliente;
      //this.tudoPronto = true;
    })

    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth(), 1);
    this.dataFim = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.locale_pt = this.api.getLocale('pt');


    this.rodarRelatorio();

  }

  rodarRelatorio() {
    this.tudoPronto = false;
    this.api.postConsComb(
      {
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
        clientes: this.clientesSelecionados ? this.clientesSelecionados : null,
        prefixos: this.prefixosSelecionados ? this.prefixosSelecionados : null,
        ce: this.CE.length > 0 ? this.CE : null,
      }).then(x => {
        this.cols = x.colunas;
        this.dados = x.valores;
        this.filtroRetorno = x.filtro;
        this.tudoPronto = true;
        //this.total = x.total;
      })
      .catch( x=> {
        alert('erro ao rodar relatório');
        this.tudoPronto = true;
      })
  }

  log(thing) {
    console.log(thing);
  }


  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }
  exportExcel() {
    import("xlsx").then((xlsx) => {
      // let title = document.getElementById("title");
      // let subtitle = document.getElementById("subtitle");
      // let trato = document.getElementById("trato");

      let element = document.getElementById("dataTable");
      let worksheet = xlsx.utils.table_to_sheet(element, {
        dateNF: "dd/mm/yyyy;@",
        cellDates: true,
        raw: true,
      });
      let workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };

      let excelBuffer: any = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      this.saveAsExcelFile(excelBuffer, "ConsumoDeCombustivel");
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
