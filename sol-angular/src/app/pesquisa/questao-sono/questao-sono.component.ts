import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PesquisaService } from '../pesquisa.service';


@Component({
  selector: 'app-questao-sono',
  templateUrl: './questao-sono.component.html',
  styleUrls: ['./questao-sono.component.css']
})
export class QuestaoSonoComponent implements OnInit, OnDestroy {

  @Input() name: string;
  @Input() condicao: string;
  valor: string;

  constructor(private pesquisa: PesquisaService) { }

  ngOnInit() {
    if (this.pesquisa[this.name]) {
      this.valor = this.pesquisa[this.name];
    }
  }

  onChange(e) {
    this.pesquisa[this.name] = e.target.value;
    this.valor = e.target.value;
  }

  ngOnDestroy() {
    this.pesquisa[this.name] = this.valor;
  }
}
