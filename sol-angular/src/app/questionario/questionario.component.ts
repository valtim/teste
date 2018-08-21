import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { QuestaoService } from '../questao/questao.service';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.css']
})
export class QuestionarioComponent implements OnInit {

  questoes

  constructor(private data: DataService, private route: Router, private dataQuestao: QuestaoService) {
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
        name: 'saudeFamilia'
      },
      {
        respostaBoa: 'Calmo',
        respostaMa: 'Nervoso',
        name: 'calmo'
      },
      {
        respostaBoa: 'Ausência de dor nos músculos do pescoço e ombros',
        respostaMa: 'Dor nos músculos do pescoço e ombros',
        name: 'dorMuscular'
      },
      {
        respostaBoa: 'Ausência de dor nas costas e/ou região lombar',
        respostaMa: 'Dor nas costas e/ou região lombar',
        name: 'dorCosta'
      },
      {
        respostaBoa: 'Ausência de dor nas coxas, pernas e pés',
        respostaMa: 'Dor nas coxas, pernas e pés',
        name: 'dorPerna'
      },
      {
        respostaBoa: 'Ausência de dor de cabeça',
        respostaMa: 'Dor de cabeça',
        name: 'dorCabeca'
      },
      {
        respostaBoa: 'Ausência de dor nos braços, no punhos ou nas mãos',
        respostaMa: 'Dor nos braços, no punhos ou nas mãos',
        name: 'dorBraco'
      }
    ]
  }

  ngOnInit() {
    // Abilitar isso !!
    if (typeof this.data.user === 'undefined' || typeof this.data.oportunidadeSono === 'undefined' || typeof this.data.qualidadeSono === 'undefined') {
      this.route.navigate(['/']);
    }
  }

  onTerminar() {
    console.log(this.data.user)
    // console.log(this.data.oportunidadeSono)
    // console.log(this.data.qualidadeSono)
    // console.log(this.data.oportunidadeSono * this.data.qualidadeSono);
    console.log(this.somar(this.data.oportunidadeSono * this.data.qualidadeSono, this.dataQuestao.descanso,
      this.dataQuestao.concentrar,
      this.dataQuestao.financeiro,
      this.dataQuestao.produtividade,
      this.dataQuestao.saude,
      this.dataQuestao.saudeFamilia,
      this.dataQuestao.calmo,
      this.dataQuestao.dorMuscular,
      this.dataQuestao.dorCosta,
      this.dataQuestao.dorPerna,
      this.dataQuestao.dorCabeca,
      this.dataQuestao.dorBraco))
  }

  somar(...args) {
    return args.reduce((acumulador, atual) => acumulador = acumulador + atual);
  }
}
