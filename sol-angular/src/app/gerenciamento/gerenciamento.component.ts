import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerenciamento',
  templateUrl: './gerenciamento.component.html',
  styleUrls: ['./gerenciamento.component.css']
})
export class GerenciamentoComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  onClickPesquisa() {
    this.route.navigate(['/login']);
  }

}
