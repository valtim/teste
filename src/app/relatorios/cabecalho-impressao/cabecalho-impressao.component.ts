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


  ExibirRevisao;

  constructor() { }

  ngOnInit() {
    this.ExibirRevisao = (this.revisao != undefined || this.data != undefined || this.form != undefined);
    
  }

}
