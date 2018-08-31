import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contramedidas',
  templateUrl: './contramedidas.component.html',
  styleUrls: ['./contramedidas.component.css']
})
export class ContramedidasComponent implements OnInit {

  constructor(private route: Router) { }

  opcoes1 = [
    {
      name: 'avisouColega',
      text: 'Avisou o colega sobre o risco da sua fadiga',
      value: false
    },
    {
      name: 'aumentouComunicacao',
      text: 'Aumentou a comunicação',
      value: false
    },
    {
      name: 'comidaBebida',
      text: 'Comida ou bebida',
      value: false
    },
    {
      name: 'sonecaVoo',
      text: 'Soneca em voo',
      value: false
    },
  ];

  opcoes2 = [
    {
      name: 'cargaTrabalho',
      text: 'Coordenou a carga de trabalho',
      value: false
    },
    {
      name: 'usoCafeina',
      text: 'Uso de cafeína',
      value: false
    },
    {
      name: 'descansoVoo',
      text: 'Descanso em voo',
      value: false
    }
  ];

  ngOnInit() {
  }

  isOpcoesValid(): Boolean {
    let result = this.opcoes1.concat(this.opcoes2).filter((opcao) => {
      return opcao.value;
    });
    return Boolean(result.length);
  }

  onClickProximo() {
    if (this.isOpcoesValid()) {
      this.route.navigate(['/consideracoes-finais']);
    }
  }
}
