import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ReporteService } from '../reporte.service';

@Component({
  selector: 'app-sinais-cognitivos',
  templateUrl: './sinais-cognitivos.component.html',
  styleUrls: ['./sinais-cognitivos.component.css']
})
export class SinaisCognitivosComponent implements OnInit, OnDestroy {

  constructor(private route: Router, private reporte: ReporteService) { }

  opcoes1 = [
    {
      name: 'nenhum',
      text: 'Nenhum sinal cognitivo foi percebido',
      value: false
    },
    {
      name: 'memoriaPrejudicada',
      text: 'Memória prejudicada',
      value: false
    },
    {
      name: 'comunicacaoReduzida',
      text: 'Comunicação reduzida',
      value: false
    },
    {
      name: 'decisaoPrejudicada',
      text: 'Tomada de decisão prejudicada',
      value: false
    }
  ];

  opcoes2 = [
    {
      name: 'Atencao',
      text: 'Atenção prejudicada',
      value: false
    },
    {
      name: 'mauHumor',
      text: 'Mau humor',
      value: false
    },
    {
      name: 'resolucaoProblemaPrejudicada',
      text: 'Resolução de problemas prejudicada',
      value: false
    },
    {
      name: 'conscienciaSituacional',
      text: 'Consciência situacional prejudicada',
      value: false
    }
  ];

  ngOnInit() {
    this.opcoes1.forEach((op) => {
      op.value = this.reporte[op.name];
    });

    this.opcoes2.forEach((op) => {
      op.value = this.reporte[op.name];
    });
  }

  isOpcoesValid(): Boolean {
    const result = this.opcoes1.concat(this.opcoes2).filter((opcao) => {
      return opcao.value;
    });
    return Boolean(result.length);
  }

  onClickProximo() {
    if (this.isOpcoesValid()) {
      this.route.navigate(['/contramedidas']);
    }
  }

  ngOnDestroy() {
    this.opcoes1.forEach((op) => {
      this.reporte[op.name] = op.value;
    });

    this.opcoes2.forEach((op) => {
      this.reporte[op.name] = op.value;
    });
  }
}
