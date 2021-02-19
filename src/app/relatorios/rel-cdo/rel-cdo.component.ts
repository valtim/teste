import { ApiService } from './../../shared/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-rel-cdo',
  templateUrl: './rel-cdo.component.html',
  styleUrls: ['./rel-cdo.component.css']
})
export class RelCdoComponent implements OnInit {

  @ViewChild ('conteudo') conteudo;

  tela_ok = false;
  consulta_ok = false;

  data = new Date();
  locale_pt;


  retorno_data;


  rowGroupMetadata: any;
  dadosCliente: any;
  dadosInterno: any;
  indisponibilidadesAbertas: any;
  resultado: any;
  observacaoIndisponibilidade: any;

  htmlContent : any;


  constructor(private api: ApiService, private sanitizer:DomSanitizer) {
    this.locale_pt = this.api.getLocale('pt');
  }

  ngOnInit(): void {

    if ( this.api.GetSettings() != null )
    {
      this.data = new Date(this.api.GetSettings());
      this.rodarRelatorio();
      return;
    }

    let data = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() + 1);

    this.data.setDate(data.getDate() - 1);
    this.rodarRelatorio();
    
  }


  imprimir(){
    //window.getElementById("conteudo").print();
    //this.conteudo.nativeElement.print();
    print();
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('conteudo').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

  rodarRelatorio() {
    this.api.SaveSettings(this.data.toISOString());
    this.consulta_ok = false;
    this.api.getCDO(this.data).then(x => {
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(x[0].HTML + x[1].HTML);
      // this.dadosCliente = x.lista;
      // this.dadosInterno = x.listaInterna;
      // this.retorno_data = x.data;
      // this.observacaoIndisponibilidade = x.observacaoIndisponibilidade;
      // this.resultado = x.resultado;
      this.consulta_ok = true;
      // this.updateRowGroupMetaData("Cliente");
    })
  }

  updateRowGroupMetaData(coluna: string) {
    this.rowGroupMetadata = {};
    let previousRowData: any;
    if (this.dadosCliente) {
      for (let i = 0; i < this.dadosCliente.length; i++) {
        let rowData = this.dadosCliente[i];
        let brand = rowData[coluna];
        if (i == 0) {
          this.rowGroupMetadata[brand] = { index: 0, size: 1 };
          previousRowData = rowData;
          continue;
        }
        //let previousRowData = this.dados[i - 1];
        let previousRowGroup = previousRowData[coluna];
        if (brand === previousRowGroup)
          this.rowGroupMetadata[brand].size++;
        else
          this.rowGroupMetadata[brand] = { index: i, size: 1 };

        previousRowData = rowData;
      }
    }
  }

  mudeiAqui(e, valor: any) {
    if (valor.Novo)
      return;

    valor.Modificado = true;
    //this.verBotoes();
  }

}
