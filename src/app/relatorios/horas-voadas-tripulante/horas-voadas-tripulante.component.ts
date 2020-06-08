import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';

declare function print(): any;

@Component({
  selector: 'app-horas-voadas-tripulante',
  templateUrl: './horas-voadas-tripulante.component.html',
  styleUrls: ['./horas-voadas-tripulante.component.css']
})
export class HorasVoadasTripulanteComponent implements OnInit {



  locale_pt;
  tudoPronto = false;
  dados;
  cols;

  filtroRetorno;

  dataInicio: Date;
  dataFim: Date;

  tripulantes;

  tripulanteSelecionado;

  trato;

  podeRodar = true;
  tabelaVisivel = true;
  totais;

  constructor(private api: ApiService) { }

  ngOnInit(): void {

    this.api.getCombos().then(x => {
      this.tripulantes = x.Tripulante;
      this.tripulanteSelecionado = x.Tripulante[0];
      this.tudoPronto = true;
    })

    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth(), 1);
    this.dataFim = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.locale_pt = this.api.getLocale('pt');

  }

  imprimir() {
    this.podeRodar = false;
    this.tabelaVisivel = false;
    this.tabelaVisivel = true;
    print();

    //this.podeRodar = true;
  }

  rodarRelatorio() {
    this.tudoPronto = false;
    this.api.postRelHorasPorTripulante(
      {
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
        tripulante: this.tripulanteSelecionado.Id,
      }).then(x => {

        //colunas = colunas, filtro = filtro, listas = listas
        this.cols = x.colunas;
        this.dados = x.valores;
        this.filtroRetorno = x.filtro;
        this.trato = x.trato;
        this.totais = x.totais;
        this.tudoPronto = true;
      })
  }

}
