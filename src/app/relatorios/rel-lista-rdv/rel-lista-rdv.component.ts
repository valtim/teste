import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';

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

  filtroRetorno;


  rdv;

  rel_selecionado;


  constructor(private api : ApiService, private router: Router) { }

  ngOnInit(): void {

    this.api.getCombos().then(x => {
      this.prefixos = x.Prefixos.map(x => { return { label: x.PrefixoCompleto, value: x.Id } });
      this.clientes = x.Clientes.map(x => { return { label: x.Nome, value: x.Id } });
      this.tudoPronto = true;
    })

    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth(), date.getDate()-1);
    this.dataFim = new Date(date.getFullYear(), date.getMonth() , date.getDate());
    this.locale_pt = this.api.getLocale('pt');


    this.rodarRelatorio();

  }

  rodarRelatorio() {
    this.tudoPronto = false;
    this.api.postRelRDV (
      {
        dataInicio: this.dataInicio,
        dataFim: this.dataFim,
        clientes: this.clientesSelecionados ? this.clientesSelecionados : null,
        prefixos: this.prefixosSelecionados ? this.prefixosSelecionados : null,
        rdv : this.rdv,
      }).then(x => {

        //colunas = colunas, filtro = filtro, listas = listas
        this.cols = x.colunas;
        this.dados = x.valores;
        this.filtroRetorno = x.filtro;
        this.tudoPronto = true;
      })
  }

  onRowSelect(e){
    //this.adt.setar(e.data);
    this.router.navigate(['/rel-rdv/' + e.data.NumeroDaFolha]);
  }

}
