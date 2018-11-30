import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-localidade',
  templateUrl: './localidade.component.html',
  styleUrls: ['./localidade.component.css']
})
export class LocalidadeComponent implements OnInit {

  search = {
    Nome: '',
    ICAO: '',
    Tipo: ''
  };
  constructor(private app: AppComponent) { }

  ngOnInit() {
    this.app.setTitle('Localidade');
  }

}
