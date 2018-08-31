import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Questao } from './questao.interface';
import { PesquisaService } from '../pesquisa.service';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.css']
})

export class QuestaoComponent implements OnInit, OnDestroy {

  @Input() questao: Questao;

  constructor(private pesquisa: PesquisaService) { }

  ngOnInit() {
    this.questao.value = this.pesquisa[this.questao.name];
  }

  onSelect(e) {
    this.pesquisa[e.target.name] = e.target.value;
    this.questao.value = e.target.value;
    e.target.parentNode.style['background-color'] = '';
  }

  ngOnDestroy() {
    this.pesquisa[this.questao.name] = this.questao.value;
  }
}
