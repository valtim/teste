import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AutorizacaoService {

  private Authorization: string;
  private Rotas: string[];

  constructor() {
    this.Authorization = localStorage.getItem('Authorization');
    this.Rotas = JSON.parse(localStorage.getItem('Rotas'));
  }

  setAuthorization(Authorization: string) {
    this.Authorization = Authorization;
    localStorage.setItem('Authorization', Authorization);
  }

  setRotas(rotas: Array<string>) {
    this.Rotas = rotas;
    localStorage.setItem('Rotas', JSON.stringify(rotas));
  }

  getAuthorization() {
    return this.Authorization;
  }

  getRotas() {
    return this.Rotas;
  }
}
