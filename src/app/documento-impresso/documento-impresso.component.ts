import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-documento-impresso',
  templateUrl: './documento-impresso.component.html',
  styleUrls: ['./documento-impresso.component.css']
})
export class DocumentoImpressoComponent implements OnInit {

  constructor() { }

  @Input() titulo;

  @Input() form;

  @Input() revisao;

  @Input() data;

  @Input() registro;

  @Input() rodape;

  

  @Input() HTML;

  ngOnInit() {
    this.titulo = "AVALIAÇÃO DE RISCO"
  }

}
