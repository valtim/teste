import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ReporteService } from '../reporte.service';

@Component({
  selector: 'app-sinais-fisiologicos',
  templateUrl: './sinais-fisiologicos.component.html',
  styleUrls: ['./sinais-fisiologicos.component.css']
})
export class SinaisFisiologicosComponent implements OnInit, OnDestroy {

  constructor(private route: Router, private reporte: ReporteService) { }

  opcoes1 = [
    {
      name: 'nenhum',
      text: 'Nenhum sinal físico foi percebido',
      value: false
    },
    {
      name: 'esfregarOlhos',
      text: 'Vontade de esfregar os olhos',
      value: false
    },
    {
      name: 'piscadasFrequentes',
      text: 'Piscadas frequentes dos olhos',
      value: false
    },
    {
      name: 'piscadasLongas',
      text: 'Piscadas longas dos olhos',
      value: false
    }
  ];

  opcoes2 = [

    {
      name: 'cabecaCaindo',
      text: 'Cabeça balançando ou caindo',
      value: false
    },
    {
      name: 'inquietacao',
      text: 'Inquietação',
      value: false
    },
    {
      name: 'bocejo',
      text: 'Bocejo',
      value: false
    },
    {
      name: 'olharFixo',
      text: 'Olhar fixo',
      value: false
    },
    {
      name: 'dificuldadeOlhosAbertos',
      text: 'Dificuldade de manter os olhos abertos',
      value: false
    },
    {
      name: 'mauIntestinal',
      text: 'Mau estar intestinal',
      value: false
    }
  ];

  ngOnInit() {
    this.opcoes1.forEach((op) => {
      if (this.reporte[op.name]) {
        op.value = this.reporte[op.name];
      }
    });

    this.opcoes2.forEach((op) => {
      if (this.reporte[op.name]) {
        op.value = this.reporte[op.name];
      }
    });
  }

  isOpcoesValid(): Boolean {
    const result = this.opcoes1.concat(this.opcoes2).filter((opcao) => {
      return opcao.value;
    });
    return Boolean(result.length);
  }

  onClickProximo() {
    this.route.navigate(['/sinais-cognitivos']);
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
