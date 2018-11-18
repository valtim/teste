import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private httpOptions: any;
  private url: string;
  private permission;
  error: string;

  constructor(private http: HttpClient) {
    this.url = window.location.host === 'localhost:4200' ? 'https://teste.sistemasol.com.br/' : '/';

    if (localStorage.getItem('token')) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'token': localStorage.getItem('token')
        })
      };
    }
  }

  async postLogin(username: string, password: string): Promise<any> {
    return this.http.post(this.url + 'api/login', { 'username': username, 'password': password })
      .toPromise()
      .then((result: string) => {
        this.updateToken(result);
      })
      .catch();
  }

  private updateToken(token: string): void {
    localStorage.setItem('token', token);
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
  }

  getDiarioByDate(date: string): Promise<any> {
    return this.http.get(this.url + 'api/novodiario/' + date, this.httpOptions)
      .toPromise()
      .then()
      .catch();
  }

  getDiarioTripulante(id: string, month: string, year: string): Promise<any> {
    return this.http.get(this.url + `api/novodiario/${id}/${month}/${year}`, this.httpOptions)
      .toPromise()
      .then()
      .catch();
  }

  getPagamento(data: string): Promise<any> {
    return this.http.get(this.url + `api/relatorio/pagamento/${data}`, this.httpOptions)
      .toPromise()
      .then()
      .catch();
  }

  getListas(callback: Function): void {
    if (
      !(localStorage.getItem('Abastecedora') && localStorage.getItem('Cliente')
        && localStorage.getItem('FuncaoBordo') && localStorage.getItem('Natureza')
        && localStorage.getItem('Prefixo') && localStorage.getItem('TipoDeOperacao')
        && localStorage.getItem('TipoDeProcedimento') && localStorage.getItem('Tripulante'))
    ) {
      this.http.get(this.url + 'api/listaspadrao', this.httpOptions).toPromise()
        .then((result: any) => {
          localStorage.setItem('Abastecedora', JSON.stringify(result.Abastecedora));
          localStorage.setItem('Cliente', JSON.stringify(result.Cliente));
          localStorage.setItem('FuncaoBordo', JSON.stringify(result.FuncaoBordo));
          localStorage.setItem('Natureza', JSON.stringify(result.Natureza));
          localStorage.setItem('Prefixo', JSON.stringify(result.Prefixo));
          localStorage.setItem('TipoDeOperacao', JSON.stringify(result.TipoDeOperacao));
          localStorage.setItem('TipoDeProcedimento', JSON.stringify(result.TipoDeProcedimento));
          localStorage.setItem('Tripulante', JSON.stringify(result.Tripulante));
          callback();
        })
        .catch();
    }
  }

  getTripulantes(): any {
    return JSON.parse(localStorage.getItem('Tripulante'));
  }

  getAbastecedoras(): any {
    return JSON.parse(localStorage.getItem('Abastecedora'));
  }

  getPrefixos(): any {
    return JSON.parse(localStorage.getItem('Prefixo'));
  }

  getNaturezas(): any {
    return JSON.parse(localStorage.getItem('Natureza'));
  }

  getFuncaoBordos(): any {
    return JSON.parse(localStorage.getItem('FuncaoBordo'));
  }

  getClientes(): any {
    return JSON.parse(localStorage.getItem('Cliente'));
  }

  getTipoDeOperacoes(): any {
    return JSON.parse(localStorage.getItem('TipoDeOperacao'));
  }

  getBloco(IdPrefixo: string): Promise<any> {
    return this.http.get(this.url + `api/bloco/${IdPrefixo}`, this.httpOptions)
      .toPromise()
      .then()
      .catch();
  }

  getCertificado(): Promise<any> {
    return this.http.get(this.url + 'api/certificado', this.httpOptions)
      .toPromise()
      .then()
      .catch();
  }

  getVencimento(): Promise<any> {
    return this.http.get(this.url + 'api/vencimento', this.httpOptions)
      .toPromise()
      .then()
      .catch();
  }

  postVencimento(vencimentoList: Array<any>): Promise<any> {
    return this.http.post(this.url + 'api/vencimento', vencimentoList, this.httpOptions)
      .toPromise()
      .then()
      .catch();
  }

  postDiarioVoo(diarioVoo: any): Promise<any> {
    return this.http.post(this.url + 'api/novodiario', diarioVoo, this.httpOptions)
      .toPromise()
      .then()
      .catch();
  }

  getLogoff(): Promise<any> {
    return this.http.get(this.url + 'api/exit', this.httpOptions)
      .toPromise()
      .then()
      .catch();
  }

  getMenuPermission() {
    this.http.get(this.url + 'api/menu', this.httpOptions)
      .toPromise()
      .then((response) => {
        this.permission = response;
      });
  }

  getEscala(dataEscala: string): Promise<any> {
    return this.http.get(this.url + 'api/novaescala/' + dataEscala, this.httpOptions)
      .toPromise();
  }

  getBase(): Promise<any> {
    return this.http.get(this.url + 'api/base', this.httpOptions).toPromise();
  }

  getPermission(): any {
    return this.permission;
  }
}
