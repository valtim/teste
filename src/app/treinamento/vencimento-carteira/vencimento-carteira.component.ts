import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import * as saveAs from 'file-saver';
import { MessageService } from 'primeng/api';
import { SortEvent } from 'primeng/api/sortevent';
import { ApiService } from 'src/app/shared/api.service';
import { Vencimento } from '../editar-vencimento/vencimento-model';
import { VencimentoTripulante } from '../editar-vencimento/vencimento-tripulante-model';

@Component({
  selector: 'app-vencimento-carteira',
  templateUrl: './vencimento-carteira.component.html',
  styleUrls: ['./vencimento-carteira.component.css'],
  providers: [MessageService]
})
export class VencimentoCarteiraComponent implements OnInit {
  columns: any;
  loading: boolean;

  constructor(private api: ApiService, private messageService: MessageService) { }

  ultimosVoos: any;
  public vencimentoListToSave = [];


  valorEditado: any;
  exibirModal: boolean = false;
  exibirDialogo: boolean = false;
  valores: any;

  valorExibido;

  dados: VencimentoTripulante[];


  editarValor(valor : Vencimento) {
    this.valorEditado = valor;
    this.exibirModal = !valor.Certificado.ReadOnly;
    this.exibirDialogo = valor.Certificado.ReadOnly;
  }


  podeEditar = window.location.href.indexOf("readonly") == -1;


  public itemExibido: string;

  retornoCarteira(retorno) {

    if (!retorno.Confirmado) {
      this.valorEditado = undefined;
      return;
    }

    this.api.postAtualizaVencimento(retorno.Certificado).then(x => {
      var iTripulante = this.dados.findIndex(t=>t.Tripulante.Id == x.Tripulante.Id);
      var iVencimento = this.dados[iTripulante].Vencimentos.findIndex(t=>t.Certificado.Id == x.Certificado.Id);
      this.dados[iTripulante].Vencimentos[iVencimento] = new Vencimento(x);
      this.messageService.add({ key: 'tc', severity: 'success', summary: 'Confirmado', detail: 'Dados Salvos com Sucesso' });
      this.valorEditado = undefined;
    }).catch
      (e => {

        this.messageService.add({ key: 'tc', severity: 'error', summary: 'Erro', detail: 'Erro ao salvar, verifique os dados.' });

      })
  }

  ehObjeto(value) {
    return typeof (value) == "object";
  }


  formatVencimento(x) {
    for (var i = 1; i < x.length; i++) {
      x[i] = new Vencimento(x);
    }
    return
  }

  ngOnInit() {

    this.api.getQuadroDeTripulantes().then(result => {
      this.loading = false;
      this.columns = result.columns;


      this.valores = result.valores;

      this.valores.forEach(x => {
        for (const [key, value] of Object.entries(x)) {
          x[key] = new Vencimento(value);
        }
      });

      this.dados = result.novaResposta.map(x=>new VencimentoTripulante(x));

    }).catch(e => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Erro', detail: 'Erro ao pesquisar, por favor tente novamente.' });
    });
  }
  reordenar(coluna) {

    //alert(coluna);
  }

  comparaDatas(data1, data2): number {
    if (data1 == null || data1 == null)
      return -1;

    var dataConvertida1 = new Date(data1);
    var dataConvertida2 = new Date(data2);

    return (dataConvertida1 > dataConvertida2) ? 1 : -1;
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;


      event.order == event.order * -1;

      if (typeof value1 == "object") {

        result = this.comparaDatas(value1.DataDeVencimento, value2.DataDeVencimento);
        return (event.order * result);
      }


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

  exibir(evento, item) {

    if (item.Display)
      return;

    item.Display = true;
  }


  exportExcel() {
    import("xlsx").then((xlsx) => {
      // let title = document.getElementById("title");
      // let subtitle = document.getElementById("subtitle");
      // let trato = document.getElementById("trato");

      let element = document.getElementById("quadro");
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
      this.saveAsExcelFile(excelBuffer, "quadro-de-tripulantes");
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
