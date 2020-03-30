import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-pax-transportados',
  templateUrl: './pax-transportados.component.html',
  styleUrls: ['./pax-transportados.component.css']
})
export class PaxTransportadosComponent implements OnInit {


  anos = [];

  anoSelecionado = new Date().getFullYear();


  dados;

  cols;

  constructor(private api: ApiService, ) { }

  pesquisarPax() {
    this.api.getPaxTransportado(this.anoSelecionado).then(x => {
      this.cols = x.cols;
      this.dados = x.data;
    })
  }

  trocaAno(e) {
    this.anoSelecionado = +e.currentTarget.value;
  }


  initAnos() {
    let anoAtual = new Date().getFullYear();
    let i = 0;
    while (anoAtual - i >= 2001) {
      this.anos.push(anoAtual - i);
      ++i;
    }
  }
  ngOnInit() {
    this.initAnos();
    this.pesquisarPax();
  }

}
