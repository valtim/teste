import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private URL: string
  user: any
  reporte: boolean

  constructor() {
    this.URL = (window.location.host === 'localhost:4200') ? 'https://teste.sistemasol.com.br/' : 'https://www.controledafadiga.com.br/';
  }

  getURL() {
    return this.URL;
  }
}
