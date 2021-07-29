import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-erros-no-db',
  templateUrl: './erros-no-db.component.html',
  styleUrls: ['./erros-no-db.component.css']
})
export class ErrosNoDbComponent implements OnInit {

  locale_pt;
  dataInicio: Date;
  dataFim: Date;
  tudoPronto: boolean;
  cols: any;
  dados: any;
  filtroRetorno: any;


  constructor(private api : ApiService) { }

  ngOnInit(): void {

    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth(), 1);
    this.dataFim = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.locale_pt = this.api.getLocale('pt');

    this.rodarRelatorio();

  }

  rodarRelatorio() {

    var objPesquisa = {
      dataInicio: this.dataInicio,
      dataFim: this.dataFim,
    };


    localStorage.setItem('rel-lista-rdv', JSON.stringify(objPesquisa));


    this.tudoPronto = false;
    this.api.postRelErrosNoDb (
      objPesquisa
      ).then(x => {
        this.cols = x.colunas;
        this.dados = x.valores;
        this.tudoPronto = true;
      })
  }

}
