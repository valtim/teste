import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.css']
})
export class QuestionarioComponent implements OnInit {

  questoes

  constructor() {
    this.questoes = [
      {
        respostaBoa: 'Descansado',
        respostaMa: 'Cansado',
        name: 'descanso'
      },
      {
        respostaBoa: 'Boa concentração',
        respostaMa: 'Dificuldade de concentrar',
        name: 'concentrar'
      },
      {
        respostaBoa: 'Situação financeira controlada',
        respostaMa: 'Problemas financeiros',
        name: 'financeiro'
      },
      {
        respostaBoa: 'Produtividade normal',
        respostaMa: 'Produtividade comprometida',
        name: 'produtividade'
      },
      {
        respostaBoa: 'Sua saúde está excelente',
        respostaMa: 'Sua saúde está muito ruim',
        name: 'saude'
      },
      {
        respostaBoa: 'Filhos ou conjugue bem de saúde',
        respostaMa: 'Problemas de saúde nos filhos ou conjugue',
        name: 'saude_familia'
      },
      {
        respostaBoa: 'Calmo',
        respostaMa: 'Nervoso',
        name: 'calmo'
      },
      {
        respostaBoa: 'Ausência de dor nos músculos do pescoço e ombros',
        respostaMa: 'Dor nos músculos do pescoço e ombros',
        name: 'dor_muscular'
      },
      {
        respostaBoa: 'Ausência de dor nas costas e/ou região lombar',
        respostaMa: 'Dor nas costas e/ou região lombar',
        name: 'dor_costa'
      },
      {
        respostaBoa: 'Ausência de dor nas coxas, pernas e pés',
        respostaMa: 'Dor nas coxas, pernas e pés',
        name: 'dor_perna'
      },
      {
        respostaBoa: 'Ausência de dor de cabeça',
        respostaMa: 'Dor de cabeça',
        name: 'dor_cabeca'
      },
      {
        respostaBoa: 'Ausência de dor nos braços, no punhos ou nas mãos',
        respostaMa: 'Dor nos braços, no punhos ou nas mãos',
        name: 'dor_braco'
      }
    ]
  }

  ngOnInit() {
  }

}
