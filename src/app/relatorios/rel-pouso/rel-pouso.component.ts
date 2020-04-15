import { ApiService } from './../../shared/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rel-pouso',
  templateUrl: './rel-pouso.component.html',
  styleUrls: ['./rel-pouso.component.css']
})
export class RelPousoComponent implements OnInit {

  colunas : [];
  colunasSelecionadas :[];
  valores: [];

  
  colunasP : [];
  colunasSelecionadasP :[];
  valoresP: [];


  pt;

  dataInicio: Date;
  dataFim: Date;
  
  

  carregado = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {

    const date = new Date();
    this.dataInicio = new Date(date.getFullYear(), date.getMonth(), 1);
    this.dataFim = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.pt = this.api.getLocale('pt');


    this.rodarRelatorio();

    
  }

  rodarRelatorio(){
    
    this.carregado = false;
    this.api.postRelPousosPorLocal({dataInicio : this.dataInicio, dataFim : this.dataFim}).then(x=>{
      this.colunasSelecionadas = x.decolagens.colunas;
      this.colunas = x.decolagens.colunas.slice(1, x.decolagens.colunas.length);
      this.valores = x.decolagens.valores;

      
      this.colunasSelecionadasP = x.pousos.colunas;
      this.colunasP = x.pousos.colunas.slice(1, x.pousos.colunas.length);
      this.valoresP = x.pousos.valores;

      this.carregado = true;
  })
  }

}
