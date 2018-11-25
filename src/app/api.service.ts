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
  message: any;

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

    this.message = {
      show: false,
      title: '',
      message: '',
      type: 'alert',
      callBack: () => { }
    };
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
      .toPromise();
  }

  getDiarioTripulante(id: string, month: string, year: string): Promise<any> {
    return this.http.get(this.url + `api/novodiario/${id}/${month}/${year}`, this.httpOptions)
      .toPromise();
  }

  getPagamento(data: string): Promise<any> {
    return this.http.get(this.url + `api/relatorio/pagamento/${data}`, this.httpOptions)
      .toPromise();
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
      .toPromise();
  }

  getCertificado(): Promise<any> {
    return this.http.get(this.url + 'api/certificado', this.httpOptions)
      .toPromise();
  }

  getVencimento(): Promise<any> {
    return this.http.get(this.url + 'api/vencimento', this.httpOptions)
      .toPromise();
  }

  postVencimento(vencimentoList: Array<any>): Promise<any> {
    return this.http.post(this.url + 'api/vencimento', vencimentoList, this.httpOptions)
      .toPromise();
  }

  postDiarioVoo(diarioVoo: any): Promise<any> {
    return this.http.post(this.url + 'api/novodiario', diarioVoo, this.httpOptions)
      .toPromise();
  }

  getLogoff(): Promise<any> {
    return this.http.get(this.url + 'api/exit', this.httpOptions)
      .toPromise();
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

  getUltimaEscala(): Promise<any> {
    return this.http.get(this.url + 'api/ultimaescala', this.httpOptions)
      .toPromise();
  }

  postEscala(escala: any): Promise<any> {
    return this.http.post(this.url + 'api/novaescala', escala, this.httpOptions)
      .toPromise();
  }

  getBase(): Promise<any> {
    return this.http.get(this.url + 'api/base', this.httpOptions).toPromise();
  }

  getListaEscalaPrevista(): Promise<any> {
    return this.http.get(this.url + 'api/listas/escala-prevista', this.httpOptions).toPromise();
  }

  getPermission(): any {
    return this.permission;
  }

  getEnviarEscalaEmail(data: string): Promise<any> {
    return this.http.get(this.url + 'api/escalaporemail/' + data, this.httpOptions).toPromise();
  }

  getNTripulanteLista(): Promise<any> {
    return this.http.get(this.url + 'api/ntripulante', this.httpOptions).toPromise();
  }

  getNTripulante(id: string): Promise<any> {
    return this.http.get(this.url + 'api/ntripulante/' + id, this.httpOptions).toPromise();
  }

  getListaTripulante(): Promise<any> {
    return this.http.get(this.url + 'api/listas/tripulante', this.httpOptions).toPromise();
  }
}
