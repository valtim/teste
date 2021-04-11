import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {

  @Input() titulo;
  @Input() carregando;

  exibir = false;


  Tripulante;
  
  constructor() { }

  ngOnInit() {
    // this.Tripulante = this.data.getTripulanteLogado();
  }

  exibir_menu(){
    this.exibir = !this.exibir;
  }

}
