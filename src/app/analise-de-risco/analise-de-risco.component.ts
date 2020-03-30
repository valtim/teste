import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../shared/api.service';
// import {SelectItem} from 'primeng/api';
import { ApiService } from '../shared/api.service';
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

  tripulantes = [];
  tripulantesSelecionados = [];
  prefixos = [];
  prefixosSelecionados = [];


  constructor(
    private api: ApiService, 
    private router: Router,) {

    this.pt = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesMin: ["Do", "Se", "Te", "Qa", "Qi", "Se", "Sa"],
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      today: 'Hoje',
      clear: 'Limpart',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Se'
    };

  }


  pesquisar(){
    let filtro = {
      Tripulantes : this.tripulantesSelecionados,
      Prefixos : this.prefixosSelecionados,
      Datas : this.dates,

    } 


    this.api.postTelaConsultaRisco(filtro).then(x=> {
      this.grid = x;
    })
  }


  goVisualizacao(id) {
    if (id == "" || id == undefined)
      return;
    this.router.navigate(['/visualizar-analise-de-risco/' + id]);
  }


  ngOnInit() {
    this.api.getTelaConsultaRisco().then(
      x => {
        this.prefixos = x.Prefixos.map(x => { return { label: x.PrefixoCompleto, value: x.Id } });;

        this.tripulantes = x.Tripulantes.map(x => { return { label: x.Trato, value: x.Id } });

        this.grid= x.PrimeiraConsulta;
      }
    )
  }

  
  display = [true];

  showDialog(i) {
    this.grid[i].Display = true;
    // document.getElementById("idx" + i).visible = true;
    //this.display[0] = !this.display[0];
  }

}