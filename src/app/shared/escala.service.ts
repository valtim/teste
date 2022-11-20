import { Indisponibilidade } from './../models/Indisponibilidade';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AutorizacaoService } from './autorizacao.service';

import { DataUtil } from './../shared/DataUtil';

import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})

export class EscalaService {

  constructor(private api: ApiService, private http: HttpClient) { }



  public postFinalDeJornada(apresentacao: string): Promise<any>{
    return this.http
      .post(`${this.api.url}api/dupla/TerminoDeJornada`, apresentacao, this.api.httpOptions)
      .toPromise();
  }

  getVencimentos(referencia: Date): Promise<any> {
    return this.http.get(`${this.api.url}api/somentevencimento/${referencia.toISOString().split('T')[0]}`).toPromise();
  }

  getEscalaMensal(dataInicio: Date, dataFim: Date): any {
    return this.http.get(`${this.api.url}api/escala-mensal/${dataInicio.toISOString().split("T")[0]}/${dataFim.toISOString().split("T")[0]}`, this.api.httpOptions)
      .toPromise();
  }

  getDuplas(dataInicio: Date, dataFim: Date): any {
    return this.http.get(`${this.api.url}api/dupla/${dataInicio.toISOString().split("T")[0]}/${dataFim.toISOString().split("T")[0]}`, this.api.httpOptions)
      .toPromise();
  }

  getDuplasAdm(dataInicio: Date, dataFim: Date): any {
    return this.http.get(`${this.api.url}api/dupla-adm/${dataInicio.toISOString().split("T")[0]}/${dataFim.toISOString().split("T")[0]}`, this.api.httpOptions)
      .toPromise();
  }

  getRestricoes(data: Date): any {
    return this.http.get(`${this.api.url}api/restricoes/${data.toISOString().split("T")[0]}`, this.api.httpOptions)
      .toPromise();
  }

  postDuplas(duplas: any): Promise<any> {
    return this.http.post(`${this.api.url}api/duplasAndDeslocamento`, duplas, this.api.httpOptions)
    //return this.http.post(`${this.api.url}api/dupla`, duplas, this.api.httpOptions)
      .toPromise();
  }

  getListasDupla(data: Date): any {
    return this.http.get(`${this.api.url}api/dupla/listas/${data.toISOString().split('T')[0]}`, this.api.httpOptions)
      .toPromise();
  }

}