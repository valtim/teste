import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor() { }

  intervecao: number;
  descansoHotel: boolean;
  descansoInsuficiente: boolean;
  transicaoTardeCedo: boolean;
  inicioCedo: boolean;
  trabalhoNoturno: boolean;
  atraso: boolean;
  saude: boolean;
  desconhecido: boolean;
  outros: boolean;
  descansoCasa: boolean;
  jornadaInterrompida: boolean;
  transicaoCedoTarde: boolean;
  inicioTarde: boolean;
  jornadaLonga: boolean;
  transporte: boolean;
  fadigaAcumulada: boolean;
  problemasCasa: boolean;
  nenhum: boolean;
  esfregarOlhos: boolean;
  piscadasFrequentes: boolean;
  piscadasLongas: boolean;
  cabecaCaindo: boolean;
  inquietacao: boolean;
  bocejo: boolean;
  olharFixo: boolean;
  dificuldadeOlhosAbertos: boolean;
  mauIntestinal: boolean;
}
