import { Component, OnInit } from '@angular/core';
import { InfoTripulanteService } from '../infoTripulante.service';

@Component({
  selector: 'app-info-tripulante',
  templateUrl: './info-tripulante.component.html',
  styleUrls: ['./info-tripulante.component.css']
})
export class InfoTripulanteComponent implements OnInit {

  constructor(private info: InfoTripulanteService) { }
  private estadoAtual;
  private sonolencia;
  private tripulante;

  ngOnInit() {
    this.tripulante = this.info.tripulante;

    this.sonolencia = [
      {
        questao: 'Assistindo TV',
        resposta: 0
      },
      {
        questao: 'Sentado e Lendo',
        resposta: 0
      },
      {
        questao: 'Sentado em um lugar publico',
        resposta: 0
      },
      {
        questao: 'Sentado conversando com alguém',
        resposta: 0
      },
      {
        questao: 'Sentado calmamente após o almoço',
        resposta: 0
      },
      {
        questao: 'Como passageiro andando uma hora sem parar',
        resposta: 0
      },
      {
        questao: 'Enquanto para por alguns minutos ao pegar transito intenso',
        resposta: 0
      },
      {
        questao: 'Deitado, denscansando à tarde, quando as circunstâncias permitem',
        resposta: 0
      }
    ];

    this.estadoAtual = [
      {
        questao: 'Como você está se sentindo?',
        positivo: 'Descansado',
        negativo: 'Cansado',
        resposta: 0
      },
      {
        questao: 'Como está a sua concentração?',
        positivo: 'Boa Concentração',
        negativo: 'Dificuldade de se Concentrar',
        resposta: 0
      },
      {
        questao: 'Como está o seu temperamento?',
        positivo: 'Calmo',
        negativo: 'Nervoso',
        resposta: 0
      },
      {
        questao: 'Como está a sua saúde?',
        positivo: 'Saúde está excelente',
        negativo: 'Saúde está ruim',
        resposta: 0
      },
      {
        questao: 'Como está a saúde da sua familia?',
        positivo: 'Familiares bem de saúde',
        negativo: 'Familiares com saúde ruim',
        resposta: 0
      },
      {
        questao: 'Está com dor?',
        positivo: 'Ausência de dor',
        negativo: 'Presença de dor',
        resposta: 0
      }
    ];
  }

}
