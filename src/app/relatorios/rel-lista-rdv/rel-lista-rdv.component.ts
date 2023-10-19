import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rel-lista-rdv',
  templateUrl: './rel-lista-rdv.component.html',
  styleUrls: ['./rel-lista-rdv.component.css']
})
export class RelListaRdvComponent implements OnInit {

  locale_pt;
  tudoPronto = false;
  dados;
  cols;

  dataInicio: Date;
  dataFim: Date;

  clientesSelecionados;
  clientes;
  prefixosSelecionados;
  prefixos;
  naturezasSelecionadas;
  naturezas;

  filtroRetorno;


  rdv;

  rel_selecionado;


  constructor(private api : ApiService, private router: Router) { }

  ngOnInit(): void {

    this.api.getCombos().then(x => {
      this.prefixos = x.Prefixo;
      this.clientes = x.Cliente;
      this.naturezas = x.Natureza;
    })



    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.dataFim = new Date(date.getFullYear(), date.getMonth() , date.getDate());
    this.locale_pt = this.api.getLocale('pt');




    var objPesquisa = localStorage['rel-lista-rdv'];


    if ( objPesquisa ){

      objPesquisa = JSON.parse(objPesquisa);

      this.dataInicio = new Date(objPesquisa.dataInicio);
      this.dataFim = new Date(objPesquisa.dataFim);
  
      if (objPesquisa.prefixos) this.prefixosSelecionados = objPesquisa.prefixos;
      if (objPesquisa.clientes) this.clientesSelecionados = objPesquisa.clientes;
      if (objPesquisa.naturezas) this.naturezasSelecionadas = objPesquisa.naturezas;
    }



    this.rodarRelatorio();

  }

  rodarRelatorio() {

    var objPesquisa = {
      dataInicio: this.dataInicio,
      dataFim: this.dataFim,
      clientes: this.clientesSelecionados ? this.clientesSelecionados : null,
      prefixos: this.prefixosSelecionados ? this.prefixosSelecionados : null,
      naturezas: this.naturezasSelecionadas ? this.naturezasSelecionadas : null,
      rdv : this.rdv,
    };


    localStorage.setItem('rel-lista-rdv', JSON.stringify(objPesquisa));


    this.tudoPronto = false;
    this.api.postRelRDV (
      objPesquisa
      ).then(x => {

        //colunas = colunas, filtro = filtro, listas = listas
        this.cols = x.colunas;
        this.dados = x.valores;
        this.filtroRetorno = x.filtro;
        this.tudoPronto = true;
      })
  }

  onRowSelect(e){
    //this.adt.setar(e.data);
    if ( e.data.Cancelada == "SIM")
      return;
    this.router.navigate(['/rel-rdv/' + e.data.NumeroDaFolha]);
  }

}
