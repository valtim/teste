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
        'token': 'a5748c43-9ff4-44ba-815e-22d122a75778'
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

}
