import { ApiService } from 'src/app/shared/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rel-cons-comb',
  templateUrl: './rel-cons-comb.component.html',
  styleUrls: ['./rel-cons-comb.component.css']
})
export class RelConsCombComponent implements OnInit {

  locale_pt;
  dados;
  cols;

  dataInicio: Date;
  dataFim: Date;

  clientesSelecionados;
  clientes;
  prefixosSelecionados;
  prefixos;

  filtroRetorno;

  tudoPronto = false;

  constructor(private api : ApiService) { }

  ngOnInit(): void {

    this.api.getCombos().then(x => {
      this.prefixos = x.Prefixos.map(x => { return { label: x.PrefixoCompleto, value: x.Id } });
      this.clientes = x.Clientes.map(x => { return { label: x.Nome, value: x.Id } });
      this.tudoPronto = true;
    })

    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth(), 1);
    this.dataFim = new Date(date.getFullYear(), date.getMonth() +1, 0);
    this.locale_pt = this.api.getLocale('pt');


    //this.rodarRelatorio();

  }

  rodarRelatorio() {
    this.tudoPronto = false;
    this.api.postConsComb (
      {
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
        clientes: this.clientesSelecionados ? this.clientesSelecionados : null,
        prefixos: this.prefixosSelecionados ? this.prefixosSelecionados : null,
      }).then(x => {

        //colunas = colunas, filtro = filtro, listas = listas
        this.cols = x.colunas;
        this.dados = x.listas;
        this.filtroRetorno = x.filtro;
        this.tudoPronto = true;
      })
  }

  log(thing) {
    console.log(thing);
  }

  

}
