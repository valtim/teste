import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { PesquisaService } from '../pesquisa.service';

@Component({
  selector: 'app-intensidade-sono',
  templateUrl: './intensidade-sono.component.html',
  styleUrls: ['./intensidade-sono.component.css']
})
export class IntensidadeSonoComponent implements OnInit, OnDestroy {

  user
  oportunidadeSono
  qualidadeSono

  constructor(private route: Router, private pesquisa: PesquisaService, private data: DataService) { }

  ngOnInit() {
    if (this.data.user === undefined || this.pesquisa.oportunidadeSono === undefined || this.pesquisa.qualidadeSono === undefined) {
      this.route.navigate(['/']);
    } else {
      this.user = this.data.user;
      this.oportunidadeSono = this.pesquisa.oportunidadeSono;
      this.qualidadeSono = this.pesquisa.qualidadeSono;
    }
  }

  questoes = [
    { condicao: 'Assistindo TV', name: 'assistindoTV' },
    { condicao: 'Sentado e lendo', name: 'lendo' },
    { condicao: 'Sentado em um lugar público', name: 'sentadoPublico' },
    { condicao: 'Sentado conversando com alguém', name: 'sentadoConsersando' },
    { condicao: 'Sentado calmamente após o almoço', name: 'sentadoAlmoco' },
    { condicao: 'Como passageiro, andando uma hora sem parar', name: 'passageiro' },
    { condicao: 'Enquanto para por alguns minutos ao pegar trânsito intenso', name: 'transitoIntenso' },
    { condicao: 'Deitado, descansado à tarde, quando as circunstâncias permitem', name: 'deitadoDescansado' }
  ]

  onTerminar() {
    let terminar = true;
    this.questoes.forEach((questao) => {
      if (this.pesquisa[questao.name] === undefined) {
        terminar = false;
      }
    })
    if (terminar) {
      this.route.navigate(['/resultado']);
    }
  }

  ngOnDestroy() {
    this.data.user = this.user;
    this.pesquisa.oportunidadeSono = this.oportunidadeSono;
    this.pesquisa.qualidadeSono = this.qualidadeSono;
  }
}
