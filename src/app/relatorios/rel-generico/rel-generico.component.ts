import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-rel-generico',
  templateUrl: './rel-generico.component.html',
  styleUrls: ['./rel-generico.component.css']
})
export class RelGenericoComponent implements OnInit {

  locale_pt;
  dataInicio: Date;
  dataFim: Date;
  tudoPronto: boolean;
  cols: any;
  dados: any;
  filtroRetorno: any;


  constructor(private api: ApiService) { }

  ngOnInit(): void {

    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    this.dataFim = new Date(date.getFullYear(), date.getMonth(), date.getDate());
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
    this.api.postRelRDV(
      objPesquisa
    ).then(x => {

      //colunas = colunas, filtro = filtro, listas = listas
      this.cols = x.colunas;
      this.dados = x.valores;
      //this.filtroRetorno = x.filtro;
      this.tudoPronto = true;
    })
  }
}
