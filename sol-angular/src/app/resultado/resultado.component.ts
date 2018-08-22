import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  constructor(private data: DataService, private route: Router) { }

  ngOnInit() {
  }

  onClickFechar() {
    this.data.nivelFadiga = 0;
    this.data.oportunidadeSono = 0;
    this.data.qualidadeSono = 0;
    this.data.user = null;
    this.route.navigate(['/']);
  }

}
