import { ApiService } from './../../shared/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horas-voadas-quinzena',
  templateUrl: './horas-voadas-quinzena.component.html',
  styleUrls: ['./horas-voadas-quinzena.component.css']
})
export class HorasVoadasQuinzenaComponent implements OnInit {

  locale_pt;
  tudoPronto = false;
  dados;
  cols;

  filtroRetorno;

  dataInicio: Date;
  dataFim: Date;

  constructor(private api : ApiService) { }

  ngOnInit(): void {


    
    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth(), 1);
    this.dataFim = new Date(date.getFullYear(), date.getMonth() +1, 0);
    this.locale_pt = this.api.getLocale('pt');

    this.rodarRelatorio();



  }

  rodarRelatorio() {
    this.tudoPronto = false;
    this.api.postRelHorasQuinzena (
      {
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
      }).then(x => {

        //colunas = colunas, filtro = filtro, listas = listas
        this.cols = x.colunas;
        this.dados = x.valores;
        this.filtroRetorno = x.filtro;
        this.tudoPronto = true;
      })
  }

}
