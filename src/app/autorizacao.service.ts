import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AutorizacaoService {

  private Token: string;
  private Rotas: string[];

  constructor() {
    this.Token = localStorage.getItem('Token');
    this.Rotas = JSON.parse(localStorage.getItem('Rotas'));
  }

  setToken(token: string) {
    this.Token = token;
    localStorage.setItem('Token', token);
  }

  setRotas(rotas: Array<string>) {
    this.Rotas = rotas;
    localStorage.setItem('Rotas', JSON.stringify(rotas));
  }

  getToken() {
    return this.Token;
  }

  getRotas() {
    return this.Rotas;
  }
}
