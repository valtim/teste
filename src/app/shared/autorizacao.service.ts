import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AutorizacaoService {
  
  private Authorization: string;
  private Rotas: string[];
  Menus: any;
  
  constructor() {
    // this.Authorization = localStorage.getItem('Authorization');
    // this.Rotas = JSON.parse(localStorage.getItem('Rotas'));

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
  
  getMenus() {

    localStorage.getItem('Menu')

    this.Menus = JSON.parse(localStorage.getItem('Menu'));
    return this.Menus;
  }

  setMenus(menus: any) {
    this.Menus = menus;
    localStorage.setItem('Menus', JSON.stringify(menus));
  }
  
  getRotas() {
    this.Rotas = JSON.parse(localStorage.getItem('Rotas'));
    return this.Rotas;
  }
}
