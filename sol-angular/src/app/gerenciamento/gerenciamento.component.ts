import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-gerenciamento',
  templateUrl: './gerenciamento.component.html',
  styleUrls: ['./gerenciamento.component.css']
})
export class GerenciamentoComponent implements OnInit {

  constructor(private route: Router, private data: DataService) { }

  ngOnInit() {
  }

  onClickPesquisa() {
    this.data.reporte = false;
    this.route.navigate(['/login']);
  }

  onClickReporte() {
    this.data.reporte = true;
    this.route.navigate(['/login']);
  }
}
