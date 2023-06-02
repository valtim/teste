import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { lastValueFrom } from "rxjs";


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

  async getEscalaMensal(dataInicio: Date, dataFim: Date): Promise<any> {
    return await lastValueFrom(this.http.get(`${this.api.url}api/escala-mensal/${dataInicio.toISOString().split("T")[0]}/${dataFim.toISOString().split("T")[0]}`, this.api.httpOptions));
  }

  getDuplas(dataInicio: Date, dataFim: Date): any {
    return this.http.get(`${this.api.url}api/dupla/${dataInicio.toISOString().split("T")[0]}/${dataFim.toISOString().split("T")[0]}`, this.api.httpOptions)
      .toPromise();
  }

  getDuplasAdm(dataInicio: Date, dataFim: Date): any {
    return this.http.get(`${this.api.url}api/dupla-adm/${dataInicio.toISOString().split("T")[0]}/${dataFim.toISOString().split("T")[0]}`, this.api.httpOptions)
      .toPromise();
  }

  getRestricoes(dataI: Date, dataF: Date): any {
    return this.http.get(`${this.api.url}api/restricoes/${dataI.toISOString().split("T")[0]}/${dataF.toISOString().split("T")[0]}`, this.api.httpOptions)
      .toPromise();
  }

  postDuplas(duplas: any): Promise<any> {
    return this.http.post(`${this.api.url}api/duplasAndDeslocamento`, duplas, this.api.httpOptions)
    //return this.http.post(`${this.api.url}api/dupla`, duplas, this.api.httpOptions)
      .toPromise();
  }
//async getAnaliseDeFadiga(dateI: Date, dateF: Date): Promise<any>
  async getListasDupla(dateI: Date, dateF: Date): Promise<any> {
    return await lastValueFrom(this.http.get(`${this.api.url}api/dupla/listas/${dateI.toISOString().split('T')[0]}/${dateF.toISOString().split('T')[0]}`, this.api.httpOptions));
  }

}