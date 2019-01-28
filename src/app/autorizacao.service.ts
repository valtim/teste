import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AutorizacaoService {

  constructor() { }

  Token: string;
  Rotas: string[];
}
