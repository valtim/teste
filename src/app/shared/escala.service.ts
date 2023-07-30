import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { lastValueFrom } from "rxjs";
import { ApiGenericoService } from './api.generico.service';


@Injectable({
  providedIn: 'root'
})

export class EscalaService {

  constructor(private api: ApiService, private http: HttpClient) { }


  async SalvarPrevisao(previsao: any[]): Promise<any>{
    return await lastValueFrom(this.http
      .post(`${this.api.url}escala-mensal`, previsao, this.api.httpOptions));
  }

  async postFinalDeJornada(apresentacao: string): Promise<any>{
    return await lastValueFrom(this.http
      .post(`${this.api.url}dupla/TerminoDeJornada`, apresentacao, this.api.httpOptions));
  }

  getVencimentos(referencia: Date): Promise<any> {
    return this.http.get(`${this.api.url}somentevencimento/${referencia.toISOString().split('T')[0]}`).toPromise();
  }

  async getEscalaMensal(dataInicio: Date, dataFim: Date): Promise<any> {
    return await lastValueFrom(this.http.get(`${this.api.url}escala-mensal/${dataInicio.toISOString().split("T")[0]}/${dataFim.toISOString().split("T")[0]}`, this.api.httpOptions));
  }

  getDuplas(dataInicio: Date, dataFim: Date): any {
    return this.http.get(`${this.api.url}dupla/${dataInicio.toISOString().split("T")[0]}/${dataFim.toISOString().split("T")[0]}`, this.api.httpOptions)
      .toPromise();
  }

  getDuplasAdm(dataInicio: Date, dataFim: Date): any {
    return this.http.get(`${this.api.url}dupla-adm/${dataInicio.toISOString().split("T")[0]}/${dataFim.toISOString().split("T")[0]}`, this.api.httpOptions)
      .toPromise();
  }

  getRestricoes(dataI: Date, dataF: Date): any {
    return this.http.get(`${this.api.url}restricoes/${dataI.toISOString().split("T")[0]}/${dataF.toISOString().split("T")[0]}`, this.api.httpOptions)
      .toPromise();
  }

  postDeslocamento(deslocamento: any): Promise<any> {
    return this.http.post(`${this.api.url}generic`, deslocamento, this.api.httpOptions)
    //return this.http.post(`${this.api.url}dupla`, duplas, this.api.httpOptions)
      .toPromise();
  }

  postDuplas(duplas: any): Promise<any> {
    return this.http.post(`${this.api.url}duplasAndDeslocamento`, duplas, this.api.httpOptions)
    //return this.http.post(`${this.api.url}dupla`, duplas, this.api.httpOptions)
      .toPromise();
  }
//async getAnaliseDeFadiga(dateI: Date, dateF: Date): Promise<any>
  async getListasDupla(dateI: Date, dateF: Date): Promise<any> {
    return await lastValueFrom(this.http.get(`${this.api.url}dupla/listas/${dateI.toISOString().split('T')[0]}/${dateF.toISOString().split('T')[0]}`, this.api.httpOptions));
  }

}