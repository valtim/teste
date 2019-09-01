import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AutorizacaoService } from './autorizacao.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private httpOptions: any;
  private url: string;
  private permission;
  error: string;
  message: any;
  username: string;

  constructor(private http: HttpClient, private autorizacao: AutorizacaoService) {
    this.url = window.location.host === 'localhost:4200' ? 'https://emar.fastapi.com.br/' : '/';
     this.url = window.location.host === 'localhost:4200' ? 'https://localhost:44314/' : '/';

    if (localStorage.getItem('Authorization')) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Authorization')
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
    return this.http.post(this.url + 'api/autorizacao', { 'username': username, 'password': password })
      .toPromise()
      .then((result: any) => {
        this.autorizacao.setAuthorization(result.Authorization);
        this.autorizacao.setRotas(result.Rotas);
        this.updateAuthorization();
      })
      .catch();
  }

  private updateAuthorization(): void {
    localStorage.setItem('Authorization', this.autorizacao.getAuthorization());
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization')
      })
    };
  }

  getDiarioByDate(date: string): Promise<any> {
    return this.http.get(`${this.url}api/relatorio-de-voo/list/${date}`, this.httpOptions)
      .toPromise();
  }

  newGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0,
      // tslint:disable-next-line:no-bitwise
      v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  getDiarioById(id: string): Promise<any> {
    return this.http.get(`${this.url}api/relatorio-de-voo/get/${id}`, this.httpOptions)
      .toPromise();
  }

  getDiarioByFolha(diario: string, folha: string): Promise<any> {
    return this.http.get(`${this.url}api/relatorio-de-voo/get/${diario}/${folha}`, this.httpOptions)
      .toPromise();
  }


  getDiarioNovo(): Promise<any> {
    console.log('arqui');
    return this.http.get(`${this.url}api/relatorio-de-voo/getnovo`, this.httpOptions)
      .toPromise();
  }

  getDiarioTripulante(id: string, month: string, year: string): Promise<any> {
    return this.http.get(`${this.url}api/novodiario/${id}/${month}/${year}`, this.httpOptions)
      .toPromise();
  }

  getPagamento(data: string): Promise<any> {
    return this.http.get(`${this.url}api/relatorio/pagamento/${data}`, this.httpOptions)
      .toPromise();
  }

  getListasPMS(): Promise<any> {
    console.log('site');
    return this.http.get(this.url + 'api/listaspadrao', this.httpOptions)
      .toPromise();
  }
/*
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
  */
  

  getClienteLogado(): Promise<any> {
    return this.http.get(`${this.url}api/clienteLogado`, this.httpOptions)
      .toPromise();
  }

  getTripulantes(): Promise<any> {
    return this.http.get(`${this.url}api/quadro-de-tripulantes`, this.httpOptions)
      .toPromise();
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

  getCertificado(): Promise<any> {
    return this.http.get(`${this.url}api/certificado`, this.httpOptions)
      .toPromise();
  }

  getVencimento(): Promise<any> {
    return this.http.get(`${this.url}api/vencimento`, this.httpOptions)
      .toPromise();
  }

  postVencimento(vencimentoList: Array<any>): Promise<any> {
    return this.http.post(`${this.url}api/vencimento`, vencimentoList, this.httpOptions)
      .toPromise();
  }

  postDiarioVoo(diarioVoo: any): Promise<any> {
    return this.http.post(`${this.url}api/novodiario`, diarioVoo, this.httpOptions)
      .toPromise();
  }


  getMenuPermission() {
    this.http.get(`${this.url}api/menu`, this.httpOptions)
      .toPromise()
      .then((response) => {
        this.permission = response;
      });
  }

  getEscala(dataEscala: string): Promise<any> {
    return this.http.get(`${this.url}api/novaescala/${dataEscala}`, this.httpOptions)
      .toPromise();
  }

  getUltimaEscala(): Promise<any> {
    return this.http.get(`${this.url}api/ultimaescala`, this.httpOptions)
      .toPromise();
  }

  postEscala(escala: any): Promise<any> {
    return this.http.post(`${this.url}api/novaescala`, escala, this.httpOptions)
      .toPromise();
  }

  getBase(): Promise<any> {
    return this.http.get(`${this.url}api/base`, this.httpOptions).toPromise();
  }

  getListaEscalaPrevista(): Promise<any> {
    return this.http.get(`${this.url}api/listas/escala-prevista`, this.httpOptions).toPromise();
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

  postNTripulante(tripulante: any): Promise<any> {
    return this.http.post(this.url + 'api/ntripulante', tripulante, this.httpOptions)
      .toPromise();
  }

  postNTripulantes(tripulantes: Array<any>): Promise<any> {
    return this.http.post(this.url + 'api/ntripulantes', tripulantes, this.httpOptions)
      .toPromise();
  }

  getListaTripulante(): Promise<any> {
    return this.http.get(this.url + 'api/listas/tripulante', this.httpOptions).toPromise();
  }

  getLocalidade(tipo: string, perPage: number, currentPage: number, search: string): Promise<any> {
    return this.http.get(`${this.url}api/localidade/${tipo}/${perPage}/${currentPage}${search}`, this.httpOptions).toPromise();
  }

  getListaLocalidade(): Promise<any> {
    return this.http.get(this.url + 'api/listas/localidade', this.httpOptions).toPromise();
  }

  postLocalidade(localidades: Array<any>): Promise<any> {
    return this.http.post(this.url + 'api/localidade', localidades, this.httpOptions).toPromise();
  }

  getListaBloco(): Promise<any> {
    return this.http.get(this.url + 'api/bloco', this.httpOptions).toPromise();
  }

  getListaBlocoByPrefixo(idPrefixo: string): Promise<any> {
    return this.http.get(`${this.url}api/bloco/${idPrefixo}`, this.httpOptions).toPromise();
  }

  postBlocoList(bloco: Array<any>): Promise<any> {
    return this.http.post(this.url + 'api/bloco', bloco, this.httpOptions).toPromise();
  }

  postUploadEscel(descricao: string, arquivos: FileList): Promise<any> {
    const data = new FormData();
    data.append('Descricao', descricao);
    data.append('ArquivoExcel', arquivos[0]);
    const option = {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
        'Authorization': localStorage.getItem('Authorization')
      })
    };
    return this.http.post(`${this.url}api/excel/upload`, data, option).toPromise();
  }

  getUsuario(): Promise<any> {
    return this.http.get(`${this.url}api/controledeacesso`).toPromise();
  }

  postUsuario(usuarioList: Array<any>): Promise<any> {
    return this.http.post(`${this.url}api/controledeacesso`, usuarioList).toPromise();
  }

  getGerenciaFadiga(data: string): Promise<any> {
    return this.http.get(`${this.url}api/GerenciaDeFadiga/${data}`, this.httpOptions).toPromise();
  }

  getEscalaRealizada(data: string) {
    return this.http.get(`${this.url}api/escalarealizada/${data}`, this.httpOptions).toPromise();
  }

  postEscalaRealizada(escala: Array<any>): Promise<any> {
    return this.http.post(`${this.url}api/escalarealizada`, escala, this.httpOptions).toPromise();
  }

  postTrocaSenha(usuario: any): Promise<any> {
    return this.http.post(`${this.url}api/trocasenha`, usuario, this.httpOptions).toPromise();
  }

  getTratamentoFadiga(id: string): Promise<any> {
    return this.http.get(`${this.url}api/TratamentoDaFadiga/${id}`, this.httpOptions).toPromise();
  }

  postTratamentoFadiga(id: string, tratamento: any) {
    return this.http.post(`${this.url}api/TratamentoDaFadiga/${id}`, tratamento, this.httpOptions).toPromise();
  }

  getTipoPergunta() {
    return this.http.get(`${this.url}api/TipoDePergunta`, this.httpOptions).toPromise();
  }

  postTipoPergunta(perguntas: any) {
    return this.http.post(`${this.url}api/TipoDePergunta`, perguntas, this.httpOptions).toPromise();
  }

  getPergunta() {
    return this.http.get(`${this.url}api/Pergunta`, this.httpOptions).toPromise();
  }

  postPergunta(perguntas: any) {
    return this.http.post(`${this.url}api/Pergunta`, perguntas, this.httpOptions).toPromise();
  }

  getRelatorioVooPesquisa(fechado: boolean, dataInicio: string, dataFim: string, plataforma: string) {
    return this.http.get(`${this.url}api/diarios/pesquisar/${fechado}/${dataInicio}/${dataFim}/${plataforma}`,
    this.httpOptions).toPromise();
  }
}
