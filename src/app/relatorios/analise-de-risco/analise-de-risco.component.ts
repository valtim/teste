import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../shared/api.service';
// import {SelectItem} from 'primeng-lts/api';
import { ApiService } from '../../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analise-de-risco',
  templateUrl: './analise-de-risco.component.html',
  styleUrls: ['./analise-de-risco.component.css']
})
export class AnaliseDeRiscoComponent implements OnInit {

  grid = null;


  titulo = "Avaliação de Risco";

  pt: any;

  dates;

  carregando = true;

  tripulantes = [];
  tripulantesSelecionados = [];
  prefixos = [];
  prefixosSelecionados = [];


  constructor(
    private api: ApiService,
    private router: Router, ) {

    this.pt = api.getLocale('pt');


  }


  pesquisar() {
    let filtro = {
      Tripulantes: this.tripulantesSelecionados,
      Prefixos: this.prefixosSelecionados,
      Datas: this.dates,

    }


    this.api.postTelaConsultaRisco(filtro).then(x => {
      this.grid = x;
    })
  }


  goVisualizacao(id) {
    if (id == "" || id == undefined)
      return;
    this.router.navigate(['/visualizar-analise-de-risco/' + id]);
  }


  ngOnInit() {
    this.api.getCombos().then(
      x => {
        this.prefixos = x.Prefixo;
        this.tripulantes = x.Tripulante;

        //this.grid= x.PrimeiraConsulta;
      }
    )

    this.api.getTelaConsultaRisco().then(x => {
      this.grid = x;
      this.carregando = false;
    })
  }


  display = [true];

  showDialog(i) {
    this.grid[i].Display = true;
    // document.getElementById("idx" + i).visible = true;
    //this.display[0] = !this.display[0];
  }

}
