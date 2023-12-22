import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiGenericoService {
  
  
  constructor(private api: ApiService, private http: HttpClient) {
  
  }

  getGenerico(tipo: string): Promise<any> {
    return this.http
      .get(`${this.api.url}genericoComExemplo/${tipo}`, this.api.httpOptions)
      .toPromise();
  }

  async deleteGenerico(tipo: string, itens: any[]): Promise<any> {
    //let httpParams = new HttpParams().set('itens', JSON.stringify(itens));

    let caminho = `${this.api.url}Generico/delete/${tipo}`;
    return await lastValueFrom(this.http.post(caminho, JSON.stringify(itens), this.api.httpOptions));
  }

  postGenerico(tipo: string, dados: any): Promise<any> {

    dados.forEach(x=>{
      delete x.AtualizadoPor;
    })
    return this.http
      .post(
        `${this.api.url}salvar/${tipo}`,
        JSON.stringify(dados),
        this.api.httpOptions
      )
      .toPromise();
  }


}
