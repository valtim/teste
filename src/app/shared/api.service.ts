import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DataUtil } from "./../shared/DataUtil";
import { Observable, lastValueFrom } from "rxjs";
import * as Globals from './global';
import { promise } from "protractor";
import { Apontamento } from "../models/Apontamento";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  public bearerOK = false;

  // public get httpOptions(): any {
  //   return this.getOptions();
  // }

  public obj = {
    get latest() {
      return this.getOptions();
    },
  };

  public url: string;
  public urlApp: string;
  private permission;

  private clienteLogado;

  error: string;
  message: any;
  username: string;

  gravarToken() {
    if (!this.bearerOK)
      for (var i = 0; i < localStorage.length; i++) {
        var obj = JSON.parse(localStorage[localStorage.key(i)]);
        if (obj.tokenType) {
        }
        //this.setBearer(obj.secret);
      }

    this.getLogin().then((x) => {
      //this.setBearer(x.Authorization);
      localStorage.setItem("Authorization", x.Authorization);
      localStorage.setItem("Rotas", JSON.stringify(x.Rotas));
      localStorage.setItem("Menu", JSON.stringify(x.Menu));
      if (localStorage.getItem("beforeLogin") != null) {
        var url = localStorage.getItem("beforeLogin");
        localStorage.removeItem("beforeLogin");
        window.location.href = url;
        return;
      }

      window.location.href = "/";
    });

    //window.location.href = '/home';
  }

  constructor(private http: HttpClient) {
    // this.url = window.location.host === 'localhost:4200' ? 'https://localhost:44343/' : '/';
    this.url = `${Globals.SERVER_API_URL}`;

    this.message = {
      show: false,
      title: "",
      message: "",
      type: "alert",
      callBack: () => { },
    };
  }

  public EhProducao(): Promise<any> {
    return this.http
      .get(this.url + "ehproducao", this.httpOptions)
      .toPromise();
  }


  async GetListasPick(item: string): Promise<any> {
    return await lastValueFrom(this.http
      .get(
        this.url + `/listasPick/${item}`,
        this.httpOptions
      ));
  }

  getServer() {
    return this.url;
  }

  SaveSettings(values: any) {
    localStorage.setItem(window.location.href, values);
  }

  GetSettings(): any {
    return localStorage.getItem(window.location.href);
  }

  get httpOptions() {
    if (!localStorage.getItem("Authorization"))
      return {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      };

    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Authorization"),
      }),
    };
  }

  getLogin(): Promise<any> {
    return this.http
      .get(this.url + "autorizacaoad", this.httpOptions)
      .toPromise();
  }

  postLoginAD(bearer: string): Promise<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    return this.http
      .post(
        this.url + "autorizacao-bristow",
        { bearer: bearer },
        httpOptions
      )
      .toPromise();
  }

  async postLogin(username: string, password: string): Promise<any> {
    return await lastValueFrom(this.http
      .post(
        this.url + "autorizacao-login",
        { Username: username, Password: password },
        this.httpOptions
      ));
  }

  async loggar(Funcionalidade: string) {
    await lastValueFrom(
      this.http.post(`${this.url}log-information`, { Funcionalidade: Funcionalidade }, this.httpOptions)
    ).then(usuario => {
      console.log(`${usuario['UsuarioLogado']} acessou ${Funcionalidade}`);
    });
  }

  getLogFuncionalidades(): Promise<any> {
    return this.http
      .get(`${this.url}log-funcionalidades`, this.httpOptions)
      .toPromise();
  }

  getLogs(funcionalidade: string, data: string): Promise<any> {
    if ((data != null) && (data != "")) {
      return this.http
        .get(`${this.url}log-information/${funcionalidade}/${data}`, this.httpOptions)
        .toPromise();
    } else {
      return this.http
        .get(`${this.url}log-information/${funcionalidade}`, this.httpOptions)
        .toPromise();
    }
  }

  getDiarioByDate(date: string): Promise<any> {
    return this.http
      .get(`${this.url}relatorio-de-voo/list/${date}`, this.httpOptions)
      .toPromise();
  }

  getPendenciaDeFadiga(date: Date): Promise<any> {
    return this.http
      .get(
        `${this.url}PendenciaDaFadiga/${date.toString().split("T")[0]}`,
        this.httpOptions
      )
      .toPromise();
  }
  postPendenciaDeFadiga(email: any): Promise<any> {
    return this.http
      .post(`${this.url}PendenciaDaFadiga`, email, this.httpOptions)
      .toPromise();
  }




  postDadosDaEscala(escala: any): Promise<any> {
    return this.http
      .post(`${this.url}DadosDaEscala`, escala, this.httpOptions)
      .toPromise();
  }

  // postDiarioVoo(diarioVoo: any): Promise<any> {
  //   return this.http.post(`${this.url}novodiario`, diarioVoo, this.httpOptions)
  //     .toPromise();
  // }

  getDiarioById(id: string): Promise<any> {
    return this.http
      .get(`${this.url}relatorio-de-voo/get/${id}`, this.httpOptions)
      .toPromise();
  }

  getRDVById(id: string): Promise<any> {
    return this.http
      .get(`${this.url}rdv/${id}`, this.httpOptions)
      .toPromise();
  }

  getDiarioByFolha(diario: string, folha: string): Promise<any> {
    return this.http
      .get(
        `${this.url}relatorio-de-voo/get/${diario}/${folha}`,
        this.httpOptions
      )
      .toPromise();
  }

  getDiarioNovo(): Promise<any> {
    console.log("arqui");
    return this.http
      .get(`${this.url}relatorio-de-voo/getnovo`, this.httpOptions)
      .toPromise();
  }

  async getDiarioTripulante(id: string, month: string, year: string): Promise<any> {
    return await lastValueFrom(this.http
      .get(`${this.url}novodiario/${id}/${month}/${year}`, this.httpOptions));
  }

  // async getCodigosDeApontamento(): Promise<any> {
  //   return await lastValueFrom(this.http
  //     .get<any>(`${this.url}apontamentos/codigos`, this.httpOptions));
  // }

  async getApontamentos(data: Date, base: string): Promise<Apontamento[]> {
    return await lastValueFrom(this.http
      .get<Apontamento[]>(`${this.url}apontamentos/${data.toISOString().split("T")[0]}/${base}`, this.httpOptions));
  }

  async postApontamento(apontamento: any): Promise<any> {
    return await lastValueFrom(this.http
      .post(`${this.url}apontamento`, apontamento, this.httpOptions));
  }

  postApontamentoXML(apontamento: any, baseop: string): Observable<Blob> {
    return this.http
      .post(`${this.url}apontamento/XML/${baseop}`, apontamento, { responseType: 'blob' });
  }


  async apagarApontamentos(apontamentos: any[]): Promise<any> {
    return await lastValueFrom(this.http
      .post(`${this.url}apagar-apontamentos`, apontamentos, this.httpOptions));
  }

  async postNovoApontamento(apontamento: any): Promise<any> {
    return await lastValueFrom(this.http
      .post(`${this.url}novo-apontamento`, apontamento, this.httpOptions));
  }

  getPagamento(data: string): Promise<any> {
    return this.http
      .get(`${this.url}relatorio/pagamento/${data}`, this.httpOptions)
      .toPromise();
  }

  getListasPMS(): Promise<any> {
    console.log("site");
    return this.http
      .get(this.url + "listaspadrao", this.httpOptions)
      .toPromise();
  }

  getClienteLogado(): Promise<any> {
    return this.http
      .get(`${this.url}clienteLogado`, this.httpOptions)
      .toPromise();
  }

  getQuadroDeTripulantes(): Promise<any> {
    return this.http
      .get(`${this.url}quadro-de-tripulantes`, this.httpOptions)
      .toPromise();
  }

  postVencimento(valor): Promise<any> {
    return this.http
      .post(`${this.url}quadro-de-tripulantes`, valor, this.httpOptions)
      .toPromise();
  }

  getAbastecedoras(): any {
    return JSON.parse(localStorage.getItem("Abastecedora"));
  }

  getAerodromos(): Promise<any> {
    return this.http
      .get(`${this.url}vencimento`, this.httpOptions)
      .toPromise();
  }

  getPrefixos(): any {
    return this.getCombos().then(
      () => JSON.parse(localStorage.getItem("Combos")).soPrefixo
    );
  }

  getNaturezas(): any {
    return this.getCombos().then(() =>
      JSON.parse(localStorage.getItem("Natureza"))
    );
  }

  getFuncaoBordos(): any {
    return this.getCombos().then(() =>
      JSON.parse(localStorage.getItem("FuncaoBordo"))
    );
  }

  getClientes(): any {
    return this.getCombos().then(
      () => JSON.parse(localStorage.getItem("Combos")).Cliente
    );
  }

  getTipoDeOperacoes(): any {
    return this.getCombos().then(() =>
      JSON.parse(localStorage.getItem("TipoDeOperacao"))
    );
  }

  getTripulantesCache(): any {
    return this.getCombos().then(() => JSON.parse(localStorage.getItem("Tripulante")));
  }

  async getCertificado(): Promise<any> {
    return await lastValueFrom(this.http
      .get(`${this.url}certificado`, this.httpOptions));
  }

  async postCertificado(cert: any[]): Promise<any> {
    return await lastValueFrom(this.http
      .post(`${this.url}certificado`, cert, this.httpOptions));
  }

  getVencimento(): Promise<any> {
    return this.http
      .get(`${this.url}vencimento`, this.httpOptions)
      .toPromise();
  }

  // postVencimento(vencimentoList: Array<any>): Promise<any> {
  //   return this.http.post(`${this.url}vencimento`, vencimentoList, this.httpOptions)
  //     .toPromise();
  // }

  postDiarioVoo(diarioVoo: any): Promise<any> {
    return this.http
      .post(`${this.url}novodiario`, diarioVoo, this.httpOptions)
      .toPromise();
  }

  getMenuPermission() {
    this.http
      .get(`${this.url}menu`, this.httpOptions)
      .toPromise()
      .then((response) => {
        this.permission = response;
      });
  }

  getEscala(dataEscala: string): Promise<any> {
    return this.http
      .get(`${this.url}novaescala/${dataEscala}`, this.httpOptions)
      .toPromise();
  }

  getUltimaEscala(): Promise<any> {
    return this.http
      .get(`${this.url}ultimaescala`, this.httpOptions)
      .toPromise();
  }

  postEscala(escala: any): Promise<any> {
    return this.http
      .post(`${this.url}novaescala`, escala, this.httpOptions)
      .toPromise();
  }

  getBase(): Promise<any> {
    return this.http.get(`${this.url}base`, this.httpOptions).toPromise();
  }

  getListaEscalaPrevista(): Promise<any> {
    return this.http
      .get(`${this.url}listas/escala-prevista`, this.httpOptions)
      .toPromise();
  }

  getPermission(): any {
    return this.permission;
  }

  getEnviarEscalaEmail(data: string): Promise<any> {
    return this.http
      .get(this.url + "escalaporemail/" + data, this.httpOptions)
      .toPromise();
  }

  getNTripulanteLista(): Promise<any> {
    return this.http
      .get(this.url + "ntripulante", this.httpOptions)
      .toPromise();
  }

  getNTripulante(id: string): Promise<any> {
    return this.http
      .get(this.url + "ntripulante/" + id, this.httpOptions)
      .toPromise();
  }

  postNTripulante(tripulante: any): Promise<any> {
    return this.http
      .post(this.url + "ntripulante", tripulante, this.httpOptions)
      .toPromise();
  }

  postNTripulantes(tripulantes: Array<any>): Promise<any> {
    return this.http
      .post(this.url + "ntripulantes", tripulantes, this.httpOptions)
      .toPromise();
  }

  getListaTripulante(): Promise<any> {
    return this.http
      .get(this.url + "listas/tripulante", this.httpOptions)
      .toPromise();
  }

  getListaTripulanteCombo(): Promise<any> {
    return this.http
      .get(this.url + "listas/tripulantecombo", this.httpOptions)
      .toPromise();
  }

  getLocalidade(
    tipo: string,
    perPage: number,
    currentPage: number,
    search: string
  ): Promise<any> {
    return this.http
      .get(
        `${this.url}localidade/${tipo}/${perPage}/${currentPage}${search}`,
        this.httpOptions
      )
      .toPromise();
  }

  getListaLocalidade(): Promise<any> {
    return this.http
      .get(this.url + "listas/localidade", this.httpOptions)
      .toPromise();
  }

  postLocalidade(localidades: Array<any>): Promise<any> {
    return this.http
      .post(this.url + "localidade", localidades, this.httpOptions)
      .toPromise();
  }
  async getListasTrilho(): Promise<any> {
    return await lastValueFrom(this.http
      .get(this.url + `trilho/listas`, this.httpOptions));
  }

  getTrilho(dataIni: Date, dataFim: Date): Promise<any> {
    return this.http
      .get(
        this.url +
        `trilho/${dataIni.toISOString().split("T")[0]}/${dataFim.toISOString().split("T")[0]
        }`,
        this.httpOptions
      )
      .toPromise();
  }

  postEscalaPorEmail(data: Date, extras: any) {
    return this.http
      .post(
        this.url + `escala-diaria/${data.toISOString().split("T")[0]}`,
        extras,
        this.httpOptions
      )
      .toPromise();
  }

  getEscalaDiaria(data: Date): Promise<any> {
    return this.http
      .get(
        this.url + `escala-diaria/${data.toISOString().split("T")[0]}`,
        this.httpOptions
      )
      .toPromise();
  }

  getEscalaDiariaHTML(data: string): Promise<any> {
    return this.http
      .get(this.url + `escala-diaria/${data}/html`, this.httpOptions)
      .toPromise();
  }

  getEscalaSemanal(data: Date): Promise<any> {
    return this.http
      .get(
        this.url + `escala-semanal/${data.toISOString().split("T")[0]}`,
        this.httpOptions
      )
      .toPromise();
  }

  postEscalaSemanal(data: Date, extras: any) {
    return this.http
      .post(
        this.url + `escala-semanal/${data.toISOString().split("T")[0]}`,
        extras,
        this.httpOptions
      )
      .toPromise();
  }

  postTrilho(trilhos: Array<any>): Promise<any> {
    return this.http
      .post(this.url + "trilho", trilhos, this.httpOptions)
      .toPromise();
  }

  deleteTrilho(trilhos: Array<string>): Promise<any> {
    return this.http
      .post(this.url + "trilho/delete", trilhos, this.httpOptions)
      .toPromise();
  }

  getListaBloco(): Promise<any> {
    return this.http.get(this.url + "bloco", this.httpOptions).toPromise();
  }

  getListaBlocoByPrefixo(idPrefixo: string): Promise<any> {
    return this.http
      .get(`${this.url}bloco/${idPrefixo}`, this.httpOptions)
      .toPromise();
  }

  postBlocoList(bloco: Array<any>): Promise<any> {
    return this.http
      .post(this.url + "bloco", bloco, this.httpOptions)
      .toPromise();
  }

  postUploadEscel(descricao: string, arquivos: FileList): Promise<any> {
    const data = new FormData();
    data.append("Descricao", descricao);
    data.append("ArquivoExcel", arquivos[0]);
    const option = {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
        Authorization: localStorage.getItem("Authorization"),
      }),
    };
    return this.http
      .post(`${this.url}excel/upload`, data, option)
      .toPromise();
  }

  getListaDeUsuarios(): Promise<any> {
    return this.http.get(`${this.url}listas/usuario`).toPromise();
  }

  getUsuario(): Promise<any> {
    return this.http.get(`${this.url}controledeacesso`).toPromise();
  }

  postUsuario(usuarioList: Array<any>): Promise<any> {
    return this.http
      .post(`${this.url}controledeacesso`, usuarioList)
      .toPromise();
  }

  // getGerenciaFadiga(data: string): Promise<any> {
  //   return this.http.get(`${this.url}GerenciaDeFadiga/${data}`, this.httpOptions).toPromise();
  // }

  postGerenciaFadiga(data: any): Promise<any> {
    return this.http
      .post(`${this.url}GerenciaDaFadiga`, data, this.httpOptions)
      .toPromise();
  }

  getEscalaRealizada(data: string) {
    return this.http
      .get(`${this.url}escalarealizada/${data}`, this.httpOptions)
      .toPromise();
  }

  postEscalaRealizada(escala: Array<any>): Promise<any> {
    return this.http
      .post(`${this.url}escalarealizada`, escala, this.httpOptions)
      .toPromise();
  }

  postTrocaSenha(usuario: any): Promise<any> {
    return this.http
      .post(`${this.url}trocasenha`, usuario, this.httpOptions)
      .toPromise();
  }

  getTratamentoFadiga(id: string): Promise<any> {
    return this.http
      .get(`${this.url}TratamentoDaFadiga/${id}`, this.httpOptions)
      .toPromise();
  }

  getTelaGerenciaDaFadiga(): Promise<any> {
    return this.http
      .get(`${this.url}TelaGerenciaDaFadiga`, this.httpOptions)
      .toPromise();
  }
  postTratamentoFadiga(id: string, tratamento: any): Promise<any> {
    return this.http
      .post(
        `${this.url}TratamentoDaFadiga/${id}`,
        tratamento,
        this.httpOptions
      )
      .toPromise();
  }

  getTipoPergunta() {
    return this.http
      .get(`${this.url}TipoDePergunta`, this.httpOptions)
      .toPromise();
  }

  postTipoPergunta(perguntas: any) {
    return this.http
      .post(`${this.url}TipoDePergunta`, perguntas, this.httpOptions)
      .toPromise();
  }

  getPergunta() {
    return this.http
      .get(`${this.url}Pergunta`, this.httpOptions)
      .toPromise();
  }

  postPergunta(perguntas: any) {
    return this.http
      .post(`${this.url}Pergunta`, perguntas, this.httpOptions)
      .toPromise();
  }

  getRelatorioVooPesquisa(
    fechado: boolean,
    dataInicio: string,
    dataFim: string,
    plataforma: string
  ) {
    return this.http
      .get(
        `${this.url}RdvPorPeriodo/${fechado}/${dataInicio}/${dataFim}/${plataforma}`,
        this.httpOptions
      )
      .toPromise();
  }

  getTelaConsultaRisco(): Promise<any> {
    return this.http
      .get(`${this.url}TelaConsultaAvRisco`, this.httpOptions)
      .toPromise();
  }



  getBI(dataIni: Date, dataFim: Date): Observable<Blob> {
    return this.http.get(`${this.url}consultabi/${dataIni.toISOString().split("T")[0]}/${dataFim.toISOString().split("T")[0]}`, { responseType: 'blob' });
  }

  // getCombosServidor(): Promise<any> {
  //   const promise = new Promise((resolve, reject) => {
  //     this.http
  //       .get(`${this.url}combos-light`, this.httpOptions)
  //       .toPromise()
  //       .then((x) => {
  //         localStorage.setItem("Combos", JSON.stringify(x));
  //         resolve(x);
  //       });
  //   });
  //   return promise;
  // }


  async getCombosRestrito(lista: string): Promise<any> {
    return await lastValueFrom(this.http
      .get(`${this.url}combos-light/${lista}`, this.httpOptions))
  }

  async getCombos(): Promise<any> {
    return await lastValueFrom(this.http
      .get(`${this.url}combos-light`, this.httpOptions))
  }

  postTelaConsultaRisco(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}TelaConsultaAvRisco`,
        JSON.stringify(filtro),
        this.httpOptions
      )
      .toPromise();
  }

  postPaxTransportado(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}RelQtdePaxTransportados`,
        JSON.stringify(filtro),
        this.httpOptions
      )
      .toPromise();
  }

  postConsComb(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}RelConsumoDeCombustivel`,
        JSON.stringify(filtro),
        this.httpOptions
      )
      .toPromise();
  }

  postRelErrosNoDb(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}RelErrosNoDb`,
        JSON.stringify(filtro),
        this.httpOptions
      )
      .toPromise();
  }

  postRelRDV(filtro: any): Promise<any> {
    return this.http
      .post(`${this.url}RelRdv`, JSON.stringify(filtro), this.httpOptions)
      .toPromise();
  }

  getRDV(folha: string): Promise<any> {
    return this.http
      .get(`${this.url}RelRdv/` + folha, this.httpOptions)
      .toPromise();
  }

  getAssinaturaRDV(DiarioDeBordo_id: string): Promise<any> {
    return this.http
      .get(`${this.url}assinatura-rdv/` + DiarioDeBordo_id, this.httpOptions)
      .toPromise();
  }

  baseAssinaturaRDV(DiarioDeBordo_id: string): Promise<any> {
    return this.http
      .get(`${this.url}base-assinatura-rdv/` + DiarioDeBordo_id, this.httpOptions)
      .toPromise();
  }

  postAssinaturaBoca(dados: any): Promise<any> {
    return this.http
      .post(`${this.url}assinatura-boca`, JSON.stringify(dados), this.httpOptions)
      .toPromise();
  }

  postEmailManifestos(email: any): Promise<any> {
    return this.http
      .post(`${this.url}enviar-mail-manifestos`, JSON.stringify(email), this.httpOptions)
      .toPromise();
  }

  postStatusAssinaturaBoca(dados: any): Promise<any> {
    return this.http
      .post(`${this.url}status-assinaturas-rdv`, JSON.stringify(dados), this.httpOptions)
      .toPromise();
  }

  assinarRDV(Assinatura_id: string, EmailAssinante: string, nomeArquivo: string): Promise<any> {
    return this.http
      .get(`${this.url}assinar-pdfs-rdv/` + Assinatura_id + '/' + EmailAssinante + '/' + nomeArquivo, this.httpOptions)
      .toPromise();
  }


  async getRdvFile(id: string): Promise<any> {
    return await lastValueFrom(this.http
      .get(`${this.url}RelRdv/pdf/ff678bba-099b-4d7c-9455-2ce3d424b08b`, this.httpOptions))
  }

  assinarBoca(Assinatura_id: string, EmailAssinante: string, nomeArquivo: string): Promise<any> {
    return this.http
      .get(`${this.url}assinar-pdf-boca/` + Assinatura_id + '/' + EmailAssinante + '/' + nomeArquivo, this.httpOptions)
      .toPromise();
  }

  obterStatusRDV(Assinatura_id: string, nomeArquivo: string): Promise<any> {
    return this.http
      .get(`${this.url}obter-status-rdv/` + Assinatura_id + '/' + nomeArquivo, this.httpOptions)
      .toPromise();
  }

  obterStatusBoca(Assinatura_id: string, nomeArquivo: string): Promise<any> {
    return this.http
      .get(`${this.url}obter-status-boca/` + Assinatura_id + '/' + nomeArquivo, this.httpOptions)
      .toPromise();
  }

  postRelHorasQuinzena(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}RelHorasQuinzena`,
        JSON.stringify(filtro),
        this.httpOptions
      )
      .toPromise();
  }

  postRelBoca(filtro: any): Promise<any> {
    return this.http
      .post(`${this.url}RelBoca`, JSON.stringify(filtro), this.httpOptions)
      .toPromise();
  }


  async getRelBoca(data: string, baseBoca:string): Promise<any> {
    return await lastValueFrom(this.http
      .get(`${this.url}RelBoca/enviados/${data}/${baseBoca}`, this.httpOptions));
  }

  getRelBocaPdf(data: string, baseBoca:string):  Observable<Blob> {
    return this.http
      .get(`${this.url}RelBoca/${data}/${baseBoca}`, { responseType: 'blob' });
  }

  getHorasVoadasPorDia(data: Date): Promise<any> {
    let str = DataUtil.from_date_to_traco(data);

    return this.http
      .get(`${this.url}RelControleDeHoras/${str}`, this.httpOptions)
      .toPromise();
  }

  getRelStatusDaFrota(
    data: Date,
    cliente: string
  ): Promise<any> {
    let caminho = `${this.url}RelStatusDaFrota/${data.toISOString().split("T")[0]
      }/${cliente}`;
    return this.http.get(caminho, this.httpOptions).toPromise();
  }

  getEscalaPTBR(
    dataref: Date,
    dataIni: Date,
    dataFim: Date,
    baseDeOperacao: string
  ): Promise<any> {
    let caminho = `${this.url}RelEscala/${dataref.toISOString().split("T")[0]
      }/${dataIni.toISOString().split("T")[0]}/${dataFim.toISOString().split("T")[0]
      }/${baseDeOperacao}`;
    return this.http.get(caminho, this.httpOptions).toPromise();
  }

  postRelStatusDaFrota(lista: any): Promise<any> {
    let caminho = `${this.url}RelStatusDaFrota`;
    return this.http
      .post(caminho, JSON.stringify(lista), this.httpOptions)
      .toPromise();
  }

  postRelHorasPorTripulante(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}RelHorasPorTripulante`,
        JSON.stringify(filtro),
        this.httpOptions
      )
      .toPromise();
  }

  getCliente() {
    return this.http
      .get(`${this.url}clientelogado`, this.httpOptions)
      .toPromise();
  }

  // getLogo() {
  //   return `${this.url}assets/img/${this.clienteLogado}.png`;
  // }

  postRelPousosPorLocal(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}RelPousosPorLocal`,
        JSON.stringify(filtro),
        this.httpOptions
      )
      .toPromise();
  }

  postVoosRealizados(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}RelVoosRealizados`,
        JSON.stringify(filtro),
        this.httpOptions
      )
      .toPromise();
  }

  postRelControleDeHoras(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}RelControleDeHoras`,
        JSON.stringify(filtro),
        this.httpOptions
      )
      .toPromise();
  }

  postEscalaNova(dados: any): Promise<any> {
    return this.http
      .post(
        `${this.url}dadosDaEscala`,
        JSON.stringify(dados),
        this.httpOptions
      )
      .toPromise();
  }

  getContrato(): Promise<any> {
    return this.http
      .get(`${this.url}contrato`, this.httpOptions)
      .toPromise();
  }

  getTodos(tipo: string): Promise<any> {
    return this.http
      .get(`${this.url}${tipo}`, this.httpOptions)
      .toPromise();
  }

  postIndisponibilidade(filtro: any): Promise<any> {
    return this.http
      .post(`${this.url}relIndisponibilidade`, filtro, this.httpOptions)
      .toPromise();
  }

  postCrudIndisponibilidadeFiltro(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}CrudIndiponibilidade/filtro`,
        filtro,
        this.httpOptions
      )
      .toPromise();
  }

  postCrudIndisponibilidade(filtro: any): Promise<any> {
    return this.http
      .post(`${this.url}CrudIndiponibilidade`, filtro, this.httpOptions)
      .toPromise();
  }

  postPontualidade(filtro: any): Promise<any> {
    return this.http
      .post(`${this.url}RelPontualidade`, filtro, this.httpOptions)
      .toPromise();
  }

  getCDO(data: Date): Promise<any> {
    return this.http
      .get(
        `${this.url}RelControleDiarioDeOperacoes/${data.toISOString().split("T")[0]
        }`,
        this.httpOptions
      )
      .toPromise();
  }

  getLocale(pais: string): any {
    return {
      firstDayOfWeek: 0,
      dayNames: [
        "Domingo",
        "Segunda",
        "Terça",
        "Quarta",
        "Quinta",
        "Sexta",
        "Sábado",
      ],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesMin: ["Do", "Se", "Te", "Qa", "Qi", "Se", "Sa"],
      monthNames: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ],
      monthNamesShort: [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ],
      today: "Hoje",
      clear: "Limpart",
      dateFormat: "dd/mm/yy",
      weekHeader: "Se",
    };
  }

  getJornadaImpressaoPeloId(id: string): Promise<any> {
    return this.http
      .get(`${this.url}impressaodejornada/${id}`, this.httpOptions)
      .toPromise();
  }

  getJornadaImpressaoPeloMesAno(data: Date): Promise<any> {
    return this.http
      .get(
        `${this.url}jornadamensal/data/${data.toISOString().split("T")[0]}`,
        this.httpOptions
      )
      .toPromise();
  }

  getIncompatibilidadeCRUD(): Promise<any> {
    return this.http
      .get(`${this.url}Incompatibilidade`, this.httpOptions)
      .toPromise();
  }

  postIncompatibilidadeCRUD(dados): Promise<any> {
    return this.http
      .post(`${this.url}Incompatibilidade`, dados, this.httpOptions)
      .toPromise();
  }

  deleteIncompatibilidadeCRUD(dados): Promise<any> {
    return this.http
      .post(`${this.url}Incompatibilidade/delete`, dados, this.httpOptions)
      .toPromise();
  }

  getConfirmacaoDeJornada(gerente: boolean, id: string): Promise<any> {
    if (gerente)
      return this.http
        .get(
          `${this.url}confirmacaodejornada/gerente/${id}`,
          this.httpOptions
        )
        .toPromise();

    return this.http
      .get(
        `${this.url}confirmacaodejornada/analista/${id}`,
        this.httpOptions
      )
      .toPromise();

    //confirmacao-de-jornada/gerente
  }

  getPerfis(): Promise<any> {
    return this.http.get(`${this.url}perfis`, this.httpOptions).toPromise();
  }

  getPermissao(): Promise<any> {
    return this.http
      .get(`${this.url}permissoes`, this.httpOptions)
      .toPromise();
  }

  postPermissao(permissao): Promise<any> {
    return this.http
      .post(`${this.url}permissoes`, permissao, this.httpOptions)
      .toPromise();
  }

  getPermissaoById(id: String): Promise<any> {
    return this.http
      .get(`${this.url}permissoes/${id}`, this.httpOptions)
      .toPromise();
  }

  async getTripulantes(): Promise<any> {
    return await lastValueFrom(this.http
      .get(`${this.url}tripulante`, this.httpOptions));
  }

  getTripulantesLight(): Promise<any> {
    return this.http
      .get(`${this.url}tripulante-light`, this.httpOptions)
      .toPromise();
  }


  /*
  
  async getProximosVencimentos(referencia : Date): Promise<any> {
      return await lastValueFrom(
        this.http
          .get(`${this.url}ultimosVencimentos/${referencia.toISOString().split('T')[0]}`, this.httpOptions)
      );
    }
  
          */





  getGrupoDeFicha(): Promise<any> {
    return this.http
      .get(`${this.url}grupodeficha`, this.httpOptions)
      .toPromise();
  }

  postGrupoDeFicha(grupo): Promise<any> {
    return this.http
      .post(`${this.url}grupodeficha`, grupo, this.httpOptions)
      .toPromise();
  }

  getFichaDeAvaliacao(): Promise<any> {
    return this.http
      .get(`${this.url}fichadeavaliacao`, this.httpOptions)
      .toPromise();
  }

  postFichaDeAvaliacao(ficha): Promise<any> {
    return this.http
      .post(`${this.url}fichadeavaliacao`, ficha, this.httpOptions)
      .toPromise();
  }

  async getAnaliseDeFadiga(filtro: any): Promise<any> {
    return await lastValueFrom(this.http
      .post(
        `${this.url}analise-de-fadiga/consultar`,
        filtro,
        this.httpOptions
      ));
  }

  async getProximosVencimentos(referencia: Date): Promise<any> {
    return await lastValueFrom(
      this.http
        .get(`${this.url}ultimosVencimentos/${referencia.toISOString().split('T')[0]}`, this.httpOptions)
    );
  }
  async postAtualizaVencimento(vencimento: any): Promise<any> {
    return await lastValueFrom(
      this.http.post(`${this.url}AtulizarVencimento`, vencimento, this.httpOptions)
    );
  }

  async postRelarioMedicao(filtro): Promise<any> {
    return await lastValueFrom(this.http
      .post(
        `${this.url}relmedicao`,
        filtro,
        this.httpOptions
      ));
  }


  async getGenericoController(controller: string): Promise<any> {
    return await lastValueFrom(this.http
      .get(`${this.url}${controller}`, this.httpOptions));
  }


  async getGenerico(controller: string, filtro: string): Promise<any> {
    return await lastValueFrom(this.http
      .get(`${this.url}${controller}/${filtro}`, this.httpOptions));
  }

  async postGenerico(controller: string, filtro: string, dados: any[]): Promise<any> {
    return await lastValueFrom(this.http
      .post(`${this.url}${controller}/${filtro}`, dados, this.httpOptions));
  }



  async emailEscalaMensal(filtro: any): Promise<any> {
    return await lastValueFrom(this.http
      .post(`${this.url}escala-mensal/individual`, filtro, this.httpOptions));
  }


  async emailBOCA(data: string, base: string, destinatarios : any): Promise<any> {
    return await lastValueFrom(this.http
      .post(`${this.url}RelBoca/assinado/${data}/${base}`, destinatarios, this.httpOptions));
  }


  async disponibilidade(): Promise<any> {
    return await lastValueFrom(this.http
      .get(`${this.url}painel/disponibilidade`, this.httpOptions));
  }

}
