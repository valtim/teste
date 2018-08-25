import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { QuestaoService } from '../questao/questao.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.css']
})
export class QuestionarioComponent implements OnInit {

  questoes
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': '24bdd443-0570-40cc-bcde-b3edc401f49f'
    })
  };

  constructor(private data: DataService, private route: Router, private dataQuestao: QuestaoService, private http: HttpClient) { }

  ngOnInit() {
    // Abilitar isso !!
    if (typeof this.data.user === 'undefined' || typeof this.data.oportunidadeSono === 'undefined' || typeof this.data.qualidadeSono === 'undefined') {
      this.route.navigate(['/']);
    } else {
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
      ];
    }
  }

  onTerminar() {
    if (Object.keys(this.dataQuestao).length !== 12) {
      Array.from(document.querySelectorAll('.questao')).forEach(element => {
        (element as HTMLElement).style.background = '#ff8181';
        let inputValid = element.querySelector('input:valid');
        if (inputValid) {
          (inputValid.parentNode as HTMLElement).style.background = '';
        }
      });
    } else {
      // this.calculadora();
      this.route.navigate(['/resultado']);
      this.sendQuestionario();
    }
  }

  sendQuestionario() {

    let params = {
      tripulante: this.data.user,
      qualidadeSono: this.data.qualidadeSono,
      oportunidadeSono: this.data.oportunidadeSono,
      calmo: this.dataQuestao.calmo,
      concentrar: this.dataQuestao.concentrar,
      descanso: this.dataQuestao.descanso,
      dorBraco: this.dataQuestao.dorBraco,
      dorCabeca: this.dataQuestao.dorCabeca,
      dorCosta: this.dataQuestao.dorCosta,
      dorMuscular: this.dataQuestao.dorMuscular,
      dorPerna: this.dataQuestao.dorPerna,
      financeiro: this.dataQuestao.financeiro,
      produtividade: this.dataQuestao.produtividade,
      saude: this.dataQuestao.saude,
      saudeFamilia: this.dataQuestao.saudeFamilia,
      quantidadeSono: this.data.quantidadeSono
    }

    console.log('params: ', params);

    // this.http.post('https://teste.sistemasol.com.br/api/tripulante', params, this.httpOptions).subscribe(data => {
    //   console.log('data: ', data);
    // });
  }

  // calculadora() {
  //   let qualidadeSono = this.data.oportunidadeSono * this.data.qualidadeSono;
  //   let porcentagem = this.porcentagemQuestionario();
  //   let total = qualidadeSono + porcentagem;
  //   if (total > 80) {
  //     this.data.nivelFadiga = 1;
  //   } else {
  //     if (total >= 70) {
  //       this.data.nivelFadiga = 2;
  //     } else {
  //       this.data.nivelFadiga = 3;
  //     }
  //   }
  // }

  // porcentagemQuestionario() {
  //   let descansoConcentracaoPorcentagem = [10, 8, 6, 4, 2];
  //   let porcentagem = [5, 4, 3, 2, 1];
  //   let result = [];
  //   [this.dataQuestao.descanso,
  //   this.dataQuestao.concentrar].forEach(element => {
  //     result.push(descansoConcentracaoPorcentagem[element - 1]);
  //   });

  //   [this.dataQuestao.financeiro,
  //   this.dataQuestao.produtividade,
  //   this.dataQuestao.saude,
  //   this.dataQuestao.saudeFamilia,
  //   this.dataQuestao.calmo,
  //   this.dataQuestao.dorMuscular,
  //   this.dataQuestao.dorCosta,
  //   this.dataQuestao.dorPerna,
  //   this.dataQuestao.dorCabeca,
  //   this.dataQuestao.dorBraco].forEach(element => {
  //     result.push(porcentagem[element - 1]);
  //   });

  //   return this.somar(result);
  // }

  // somar(listaValores) {
  //   return listaValores.reduce((acumulador, atual) => acumulador = acumulador + atual);
  // }
}
