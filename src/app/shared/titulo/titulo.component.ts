import { Component, OnInit, Input } from '@angular/core';
// import { Router } from '@angular/router';


// import { DataService } from '../data.service';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {

  @Input() titulo;

  Tripulante;
  
  constructor() { }

  ngOnInit() {
    // this.Tripulante = this.data.getTripulanteLogado();
  }

}
