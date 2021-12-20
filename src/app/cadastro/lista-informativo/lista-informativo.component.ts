import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-informativo',
  templateUrl: './lista-informativo.component.html',
  styleUrls: ['./lista-informativo.component.css']
})
export class ListaInformativoComponent implements OnInit {

  tudoPronto = true;

  dataInicio;
  dataFim;
  linhasSelecionadas = [];
  informativos;

  constructor() { }

  ngOnInit(): void {

    this.dataInicio = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.dataFim = new Date(new Date().getFullYear(), new Date().getMonth() +1, 0);

  }

  novaLinha(){

  }

  salvar(){

///api/somenteVencimento/{dia.ToString("yyyy-MM-dd")}");
///api/prevencaodafadiga/{dia.ToString("yyyy-MM-dd")}");

  }

  delete(){

  }

  rodarRelatorio(){

  }

}
