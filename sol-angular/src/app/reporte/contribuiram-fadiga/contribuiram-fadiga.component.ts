import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ReporteService } from '../reporte.service';

@Component({
  selector: 'app-contribuiram-fadiga',
  templateUrl: './contribuiram-fadiga.component.html',
  styleUrls: ['./contribuiram-fadiga.component.css']
})
export class ContribuiramFadigaComponent implements OnInit, OnDestroy {

  constructor(private route: Router, private reporte: ReporteService) { }

  opcoes1 = [
    {
      name: 'descansoHotel',
      text: 'Descanso / Hotel',
      value: false
    },
    {
      name: 'descansoInsuficiente',
      text: 'Descanso insuficiente entre jornadas',
      value: false
    },
    {
      name: 'transicaoTardeCedo',
      text: 'Transição da jornada tarde / cedo',
      value: false
    },
    {
      name: 'inicioCedo',
      text: 'Início cedo',
      value: false
    },
    {
      name: 'trabalhoNoturno',
      text: 'Trabalho noturno',
      value: false
    },
    {
      name: 'atraso',
      text: 'Atraso',
      value: false
    },
    {
      name: 'saude',
      text: 'Saúde / Mau estar ocasional',
      value: false
    },
    {
      name: 'desconhecido',
      text: 'Desconhecido',
      value: false
    }
  ];

  opcoes2 = [
    {
      name: 'outros',
      text: 'Outros',
      value: false
    },
    {
      name: 'descansoCasa',
      text: 'Descanso / Casa',
      value: false
    },
    {
      name: 'jornadaInterrompida',
      text: 'Jornada interrompida',
      value: false
    },
    {
      name: 'transicaoCedoTarde',
      text: 'Transição da jornada cedo / tarde',
      value: false
    },
    {
      name: 'inicioTarde',
      text: 'Início tarde',
      value: false
    },
    {
      name: 'jornadaLonga',
      text: 'Jornada longa',
      value: false
    },
    {
      name: 'transporte',
      text: 'Transporte',
      value: false
    },
    {
      name: 'fadigaAcumulada',
      text: 'Fadiga acumulada',
      value: false
    },
    {
      name: 'problemasCasa',
      text: 'Problemas em casa',
      value: false
    }
  ];

  ngOnInit() {
    this.opcoes1.forEach((op) => {
      if (this.reporte[op.name]) {
        op.value = this.reporte[op.name]
      }
    });

    this.opcoes2.forEach((op) => {
      if (this.reporte[op.name]) {
        op.value = this.reporte[op.name]
      }
    });
  }

  isOpcoesValid(): Boolean {
    let result = this.opcoes1.concat(this.opcoes2).filter((opcao) => {
      return opcao.value;
    });
    return Boolean(result.length);
  }

  onClickProximo() {
    this.route.navigate(['/sinais-fisiologicos']);
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
