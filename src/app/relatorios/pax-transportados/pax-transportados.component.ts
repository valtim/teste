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
  localidades: any;


  carregando = true;


  constructor(private api: ApiService, ) { }

  rodarRelatorio() {    
    this.carregando = true;
    this.api.postPaxTransportado(
      {
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
        clientes: this.clientesSelecionados ? this.clientesSelecionados : null,
        prefixos: this.prefixosSelecionados ? this.prefixosSelecionados : null,
      }).then(x => {
        this.cols = x.cols;
        this.dados = x.data;
        this.carregando = false;
      })
  }


  ngOnInit() {

    this.carregando = true;
    this.api.getCombos().then(x => {
      this.prefixos = x.Prefixo;
      this.clientes = x.Cliente;
      //sthis.localidades = x.Localidades;
      this.carregando = false;
    })

    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), 0, 1);
    this.dataFim = new Date(date.getFullYear(), 11, 31);
    this.locale_pt = this.api.getLocale('pt');

    this.rodarRelatorio();


  }

}
