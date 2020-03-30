import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cabecalho-impressao',
  templateUrl: './cabecalho-impressao.component.html',
  styleUrls: ['./cabecalho-impressao.component.css']
})
export class CabecalhoImpressaoComponent implements OnInit {

  @Input() titulo;

  @Input() form;

  @Input() revisao;

  @Input() data;

  @Input() registro;


  classe = "col-lg-7 border border-dark";

  ExibirRevisao;

  constructor() { }

  ngOnInit() {
    this.ExibirRevisao = this.revisao || this.data || this.registro;
    if ( !this.ExibirRevisao )
      this.classe = "col-lg-9 border border-dark";
  }

}
