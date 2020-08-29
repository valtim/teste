import { ApiService } from './../../shared/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rel-cdo',
  templateUrl: './rel-cdo.component.html',
  styleUrls: ['./rel-cdo.component.css']
})
export class RelCdoComponent implements OnInit {

  tela_ok = false;
  consulta_ok = false;

  data = new Date();
  locale_pt;


  dados;
  retorno_data;


  rowGroupMetadata: any;


  constructor(private api: ApiService) {
    this.locale_pt = this.api.getLocale('pt');
  }

  ngOnInit(): void {
    this.rodarRelatorio();
  }


  rodarRelatorio() {
    this.consulta_ok = false;
    this.api.getCDO(this.data).then(x => {
      this.dados = x.lista;
      this.retorno_data = x.data;
      this.consulta_ok = true;
      this.updateRowGroupMetaData("Cliente");
    })
  }

  updateRowGroupMetaData(coluna: string) {
    this.rowGroupMetadata = {};
    let previousRowData: any;
    if (this.dados) {
      for (let i = 0; i < this.dados.length; i++) {
        let rowData = this.dados[i];
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
