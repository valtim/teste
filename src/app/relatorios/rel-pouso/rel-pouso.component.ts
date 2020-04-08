import { ApiService } from './../../shared/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rel-pouso',
  templateUrl: './rel-pouso.component.html',
  styleUrls: ['./rel-pouso.component.css']
})
export class RelPousoComponent implements OnInit {

  colunas : [];
  valores: [];

  carregado = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.postRelPousosPorLocal({}).then(x=>{
        this.colunas = x.colunas;
        this.valores = x.valores;
        this.carregado = true;

    })
  }

}
