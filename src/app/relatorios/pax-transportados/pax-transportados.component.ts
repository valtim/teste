import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-pax-transportados',
  templateUrl: './pax-transportados.component.html',
  styleUrls: ['./pax-transportados.component.css']
})
export class PaxTransportadosComponent implements OnInit {



  locale_pt;
  dados;
  cols;

  dataInicio: Date;
  dataFim: Date;

  clientesSelecionados;
  clientes;
  prefixosSelecionados;
  prefixos;


  constructor(private api: ApiService, ) { }

  rodarRelatorio() {
    this.api.postPaxTransportado(
      {
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
        clientes: this.clientesSelecionados ? this.clientesSelecionados : null,
        prefixos: this.prefixosSelecionados ? this.prefixosSelecionados : null,
      }).then(x => {
        this.cols = x.cols;
        this.dados = x.data;
      })
  }


  ngOnInit() {


    this.api.getCombos().then(x => {
      this.prefixos = x.Prefixos.map(x => { return { label: x.PrefixoCompleto, value: x.Id } });
      //this.prefixosSelecionados = x.Prefixos.map(x => { return { label: x.PrefixoCompleto, value: x.Id } });
      this.clientes = x.Clientes.map(x => { return { label: x.Nome, value: x.Id } });
      //this.clientesSelecionados = x.Clientes.map(x => { return { label: x.Nome, value: x.Id } });
    })

    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), 0, 1);
    this.dataFim = new Date(date.getFullYear(), 11, 31);
    this.locale_pt = this.api.getLocale('pt');

    this.rodarRelatorio();


  }

}
