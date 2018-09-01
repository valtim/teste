import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PesquisaService {

  oportunidadeSono: number;
  qualidadeSono: number;
  quantidadeSono: number;
  descanso: number;
  concentrar: number;
  saude: number;
  saudeFamilia: number;
  calmo: number;
  dor: number;
  assistindoTV: number;
  lendo: number;
  sentadoPublico: number;
  sentadoConsersando: number;
  sentadoAlmoco: number;
  passageiro: number;
  transitoIntenso: number;
  deitadoDescansado: number;
  constructor() { }
}
