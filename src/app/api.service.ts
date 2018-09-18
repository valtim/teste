import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private httpOptions: any;
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://teste.sistemasol.com.br/';

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    };
  }

  postLogin(username: string, password: string): Promise<any> {
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

  getTripulantes(): Promise<any> {
    return this.http.get(this.url + 'api/Tripulante', this.httpOptions)
      .toPromise()
      .then()
      .catch();
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

}
