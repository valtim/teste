import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AutorizacaoService } from "./autorizacao.service";

@Injectable({
  providedIn: "root",
})
export class ApiGenericoService {
  url: string;
  httpOptions: { headers: any };
  constructor(
    private http: HttpClient,
    private autorizacao: AutorizacaoService
  ) {
    this.url =
      window.location.host === "localhost:4200"
      ? "https://localhost:44343/"
     //? "https://teste.fastapi.com.br/"
        : "/";
    if (localStorage.getItem("Authorization")) {
      this.httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("Authorization"),
        }),
      };
    }
  }

  getGenerico(tipo: string): Promise<any> {
    return this.http
      .get(`${this.url}api/genericoComExemplo/${tipo}`, this.httpOptions)
      .toPromise();
  }

  deleteGenerico(tipo: string, itens: any[]): Promise<any> {
    //let httpParams = new HttpParams().set('itens', JSON.stringify(itens));

    let caminho = `${this.url}api/Generico/delete/${tipo}`;
    return this.http.post(caminho, itens, this.httpOptions).toPromise();
  }

  postGenerico(tipo: string, dados: any): Promise<any> {

    dados.forEach(x=>{
      delete x.AtualizadoPor;
    })
    return this.http
      .post(
        `${this.url}api/salvar/${tipo}`,
        JSON.stringify(dados),
        this.httpOptions
      )
      .toPromise();
  }
}
