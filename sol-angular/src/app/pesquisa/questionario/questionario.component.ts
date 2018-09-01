import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { PesquisaService } from '../pesquisa.service';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.css']
})
export class QuestionarioComponent implements OnInit {

  questoes = [
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
      respostaBoa: 'Calmo',
      respostaMa: 'Nervoso',
      name: 'calmo'
    },
    {
      respostaBoa: 'Minha saúde está excelente',
      respostaMa: 'Minha saúde está muito ruim',
      name: 'saude'
    },
    {
      respostaBoa: 'Filhos ou conjugue bem de saúde',
      respostaMa: 'Problemas de saúde nos filhos ou conjugue',
      name: 'saudeFamilia'
    },
    {
      respostaBoa: 'Sem dor no corpo',
      respostaMa: 'Dor no corpo',
      name: 'dor'
    }
  ];

  constructor(private data: DataService, private pesquisa: PesquisaService, private route: Router) { }

  ngOnInit() {
    if (this.data.user === undefined || this.pesquisa.oportunidadeSono === undefined || this.pesquisa.qualidadeSono === undefined) {
      this.route.navigate(['/']);
    }
  }

  onTerminar() {
    if (!this.respondedAll()) {
      Array.from(document.querySelectorAll('.questao')).forEach(element => {
        (element as HTMLElement).style.background = '#ff8181';
        const inputValid = element.querySelector('input:valid');
        if (inputValid) {
          (inputValid.parentNode as HTMLElement).style.background = '';
        }
      });
    } else {
      this.route.navigate(['/intensidade-sono']);
    }
  }

  respondedAll(): boolean {
    let result = true;
    this.questoes.forEach((questao) => {
      if (this.pesquisa[questao.name] === undefined) {
        result = false;
      }
    });
    return result;
  }

}
