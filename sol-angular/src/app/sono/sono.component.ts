import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sono',
  templateUrl: './sono.component.html',
  styleUrls: ['./sono.component.css']
})
export class SonoComponent implements OnInit {

  oportunidadeSono: Number
  qualidadeSono: String

  constructor() { }

  ngOnInit() {
  }

  onclick(){
    console.log('oportunidadeSono', this.oportunidadeSono);
    console.log('qualidadeSono', this.qualidadeSono);
  }

}
