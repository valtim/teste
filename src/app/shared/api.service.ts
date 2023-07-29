import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DataUtil } from "./../shared/DataUtil";
import { Observable, lastValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  public bearerOK = false;

  public get httpOptions(): any {
    return this.getOptions();
  }

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
    this.url =
      window.location.host === "localhost:4200"
        ? "https://localhost:44343/"
        //? "https://teste.fastapi.com.br/"
        : "/";

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
      .get(this.url + "api/ehproducao", this.httpOptions)
      .toPromise();
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

  getOptions() {
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
      .get(this.url + "api/autorizacaoad", this.httpOptions)
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
        this.url + "api/autorizacao-bristow",
        { bearer: bearer },
        httpOptions
      )
      .toPromise();
  }

  async postLogin(username: string, password: string): Promise<any> {
    // this.httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // };

    return await lastValueFrom(this.http
      .post(
        this.url + "api/autorizacao",
        { Username: username, Password: password },
        this.httpOptions
      ));
  }

  getDiarioByDate(date: string): Promise<any> {
    return this.http
      .get(`${this.url}api/relatorio-de-voo/list/${date}`, this.httpOptions)
      .toPromise();
  }

  getPendenciaDeFadiga(date: Date): Promise<any> {
    return this.http
      .get(
        `${this.url}api/PendenciaDaFadiga/${date.toString().split("T")[0]}`,
        this.httpOptions
      )
      .toPromise();
  }
  postPendenciaDeFadiga(email: any): Promise<any> {
    return this.http
      .post(`${this.url}api/PendenciaDaFadiga`, email, this.httpOptions)
      .toPromise();
  }




  postDadosDaEscala(escala: any): Promise<any> {
    return this.http
      .post(`${this.url}api/DadosDaEscala`, escala, this.httpOptions)
      .toPromise();
  }

  // postDiarioVoo(diarioVoo: any): Promise<any> {
  //   return this.http.post(`${this.url}api/novodiario`, diarioVoo, this.httpOptions)
  //     .toPromise();
  // }

  getDiarioById(id: string): Promise<any> {
    return this.http
      .get(`${this.url}api/relatorio-de-voo/get/${id}`, this.httpOptions)
      .toPromise();
  }

  getRDVById(id: string): Promise<any> {
    return this.http
      .get(`${this.url}api/rdv/${id}`, this.httpOptions)
      .toPromise();
  }

  getDiarioByFolha(diario: string, folha: string): Promise<any> {
    return this.http
      .get(
        `${this.url}api/relatorio-de-voo/get/${diario}/${folha}`,
        this.httpOptions
      )
      .toPromise();
  }

  getDiarioNovo(): Promise<any> {
    console.log("arqui");
    return this.http
      .get(`${this.url}api/relatorio-de-voo/getnovo`, this.httpOptions)
      .toPromise();
  }

  getDiarioTripulante(id: string, month: string, year: string): Promise<any> {
    return this.http
      .get(`${this.url}api/novodiario/${id}/${month}/${year}`, this.httpOptions)
      .toPromise();
  }

  getPagamento(data: string): Promise<any> {
    return this.http
      .get(`${this.url}api/relatorio/pagamento/${data}`, this.httpOptions)
      .toPromise();
  }

  getListasPMS(): Promise<any> {
    console.log("site");
    return this.http
      .get(this.url + "api/listaspadrao", this.httpOptions)
      .toPromise();
  }

  getClienteLogado(): Promise<any> {
    return this.http
      .get(`${this.url}api/clienteLogado`, this.httpOptions)
      .toPromise();
  }

  getQuadroDeTripulantes(): Promise<any> {
    return this.http
      .get(`${this.url}api/quadro-de-tripulantes`, this.httpOptions)
      .toPromise();
  }

  postVencimento(valor): Promise<any> {
    return this.http
      .post(`${this.url}api/quadro-de-tripulantes`, valor, this.httpOptions)
      .toPromise();
  }

  getAbastecedoras(): any {
    return JSON.parse(localStorage.getItem("Abastecedora"));
  }

  getAerodromos(): Promise<any> {
    return this.http
      .get(`${this.url}api/vencimento`, this.httpOptions)
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

  getCertificado(): Promise<any> {
    return this.http
      .get(`${this.url}api/certificado`, this.httpOptions)
      .toPromise();
  }

  getVencimento(): Promise<any> {
    return this.http
      .get(`${this.url}api/vencimento`, this.httpOptions)
      .toPromise();
  }

  // postVencimento(vencimentoList: Array<any>): Promise<any> {
  //   return this.http.post(`${this.url}api/vencimento`, vencimentoList, this.httpOptions)
  //     .toPromise();
  // }

  postDiarioVoo(diarioVoo: any): Promise<any> {
    return this.http
      .post(`${this.url}api/novodiario`, diarioVoo, this.httpOptions)
      .toPromise();
  }

  getMenuPermission() {
    this.http
      .get(`${this.url}api/menu`, this.httpOptions)
      .toPromise()
      .then((response) => {
        this.permission = response;
      });
  }

  getEscala(dataEscala: string): Promise<any> {
    return this.http
      .get(`${this.url}api/novaescala/${dataEscala}`, this.httpOptions)
      .toPromise();
  }

  getUltimaEscala(): Promise<any> {
    return this.http
      .get(`${this.url}api/ultimaescala`, this.httpOptions)
      .toPromise();
  }

  postEscala(escala: any): Promise<any> {
    return this.http
      .post(`${this.url}api/novaescala`, escala, this.httpOptions)
      .toPromise();
  }

  getBase(): Promise<any> {
    return this.http.get(`${this.url}api/base`, this.httpOptions).toPromise();
  }

  getListaEscalaPrevista(): Promise<any> {
    return this.http
      .get(`${this.url}api/listas/escala-prevista`, this.httpOptions)
      .toPromise();
  }

  getPermission(): any {
    return this.permission;
  }

  getEnviarEscalaEmail(data: string): Promise<any> {
    return this.http
      .get(this.url + "api/escalaporemail/" + data, this.httpOptions)
      .toPromise();
  }

  getNTripulanteLista(): Promise<any> {
    return this.http
      .get(this.url + "api/ntripulante", this.httpOptions)
      .toPromise();
  }

  getNTripulante(id: string): Promise<any> {
    return this.http
      .get(this.url + "api/ntripulante/" + id, this.httpOptions)
      .toPromise();
  }

  postNTripulante(tripulante: any): Promise<any> {
    return this.http
      .post(this.url + "api/ntripulante", tripulante, this.httpOptions)
      .toPromise();
  }

  postNTripulantes(tripulantes: Array<any>): Promise<any> {
    return this.http
      .post(this.url + "api/ntripulantes", tripulantes, this.httpOptions)
      .toPromise();
  }

  getListaTripulante(): Promise<any> {
    return this.http
      .get(this.url + "api/listas/tripulante", this.httpOptions)
      .toPromise();
  }

  getListaTripulanteCombo(): Promise<any> {
    return this.http
      .get(this.url + "api/listas/tripulantecombo", this.httpOptions)
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
        `${this.url}api/localidade/${tipo}/${perPage}/${currentPage}${search}`,
        this.httpOptions
      )
      .toPromise();
  }

  getListaLocalidade(): Promise<any> {
    return this.http
      .get(this.url + "api/listas/localidade", this.httpOptions)
      .toPromise();
  }

  postLocalidade(localidades: Array<any>): Promise<any> {
    return this.http
      .post(this.url + "api/localidade", localidades, this.httpOptions)
      .toPromise();
  }
  getListasTrilho(): Promise<any> {
    return this.http
      .get(this.url + `api/trilho/listas`, this.httpOptions)
      .toPromise();
  }

  getTrilho(dataIni: Date, dataFim: Date): Promise<any> {
    return this.http
      .get(
        this.url +
        `api/trilho/${dataIni.toISOString().split("T")[0]}/${dataFim.toISOString().split("T")[0]
        }`,
        this.httpOptions
      )
      .toPromise();
  }

  postEscalaPorEmail(data: Date, extras: any) {
    return this.http
      .post(
        this.url + `api/escala-diaria/${data.toISOString().split("T")[0]}`,
        extras,
        this.httpOptions
      )
      .toPromise();
  }

  getEscalaDiaria(data: Date): Promise<any> {
    return this.http
      .get(
        this.url + `api/escala-diaria/${data.toISOString().split("T")[0]}`,
        this.httpOptions
      )
      .toPromise();
  }

  getEscalaDiariaHTML(data: string): Promise<any> {
    return this.http
      .get(this.url + `api/escala-diaria/${data}/html`, this.httpOptions)
      .toPromise();
  }

  getEscalaSemanal(data: Date): Promise<any> {
    return this.http
      .get(
        this.url + `api/escala-semanal/${data.toISOString().split("T")[0]}`,
        this.httpOptions
      )
      .toPromise();
  }

  postEscalaSemanal(data: Date, extras: any) {
    return this.http
      .post(
        this.url + `api/escala-semanal/${data.toISOString().split("T")[0]}`,
        extras,
        this.httpOptions
      )
      .toPromise();
  }

  postTrilho(trilhos: Array<any>): Promise<any> {
    return this.http
      .post(this.url + "api/trilho", trilhos, this.httpOptions)
      .toPromise();
  }

  deleteTrilho(trilhos: Array<string>): Promise<any> {
    return this.http
      .post(this.url + "api/trilho/delete", trilhos, this.httpOptions)
      .toPromise();
  }

  getListaBloco(): Promise<any> {
    return this.http.get(this.url + "api/bloco", this.httpOptions).toPromise();
  }

  getListaBlocoByPrefixo(idPrefixo: string): Promise<any> {
    return this.http
      .get(`${this.url}api/bloco/${idPrefixo}`, this.httpOptions)
      .toPromise();
  }

  postBlocoList(bloco: Array<any>): Promise<any> {
    return this.http
      .post(this.url + "api/bloco", bloco, this.httpOptions)
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
      .post(`${this.url}api/excel/upload`, data, option)
      .toPromise();
  }

  getListaDeUsuarios(): Promise<any> {
    return this.http.get(`${this.url}api/listas/usuario`).toPromise();
  }

  getUsuario(): Promise<any> {
    return this.http.get(`${this.url}api/controledeacesso`).toPromise();
  }

  postUsuario(usuarioList: Array<any>): Promise<any> {
    return this.http
      .post(`${this.url}api/controledeacesso`, usuarioList)
      .toPromise();
  }

  // getGerenciaFadiga(data: string): Promise<any> {
  //   return this.http.get(`${this.url}api/GerenciaDeFadiga/${data}`, this.httpOptions).toPromise();
  // }

  postGerenciaFadiga(data: any): Promise<any> {
    return this.http
      .post(`${this.url}api/GerenciaDaFadiga`, data, this.httpOptions)
      .toPromise();
  }

  getEscalaRealizada(data: string) {
    return this.http
      .get(`${this.url}api/escalarealizada/${data}`, this.httpOptions)
      .toPromise();
  }

  postEscalaRealizada(escala: Array<any>): Promise<any> {
    return this.http
      .post(`${this.url}api/escalarealizada`, escala, this.httpOptions)
      .toPromise();
  }

  postTrocaSenha(usuario: any): Promise<any> {
    return this.http
      .post(`${this.url}api/trocasenha`, usuario, this.httpOptions)
      .toPromise();
  }

  getTratamentoFadiga(id: string): Promise<any> {
    return this.http
      .get(`${this.url}api/TratamentoDaFadiga/${id}`, this.httpOptions)
      .toPromise();
  }

  getTelaGerenciaDaFadiga(): Promise<any> {
    return this.http
      .get(`${this.url}api/TelaGerenciaDaFadiga`, this.httpOptions)
      .toPromise();
  }
  postTratamentoFadiga(id: string, tratamento: any): Promise<any> {
    return this.http
      .post(
        `${this.url}api/TratamentoDaFadiga/${id}`,
        tratamento,
        this.httpOptions
      )
      .toPromise();
  }

  getTipoPergunta() {
    return this.http
      .get(`${this.url}api/TipoDePergunta`, this.httpOptions)
      .toPromise();
  }

  postTipoPergunta(perguntas: any) {
    return this.http
      .post(`${this.url}api/TipoDePergunta`, perguntas, this.httpOptions)
      .toPromise();
  }

  getPergunta() {
    return this.http
      .get(`${this.url}api/Pergunta`, this.httpOptions)
      .toPromise();
  }

  postPergunta(perguntas: any) {
    return this.http
      .post(`${this.url}api/Pergunta`, perguntas, this.httpOptions)
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
        `${this.url}api/RdvPorPeriodo/${fechado}/${dataInicio}/${dataFim}/${plataforma}`,
        this.httpOptions
      )
      .toPromise();
  }

  getTelaConsultaRisco(): Promise<any> {
    return this.http
      .get(`${this.url}api/TelaConsultaAvRisco`, this.httpOptions)
      .toPromise();
  }

  getBI(dataIni: Date, dataFim: Date): Observable<any> {
    return this.http.get(
      `${this.url}api/consultabi/${dataIni.toISOString().split("T")[0]}/${dataFim.toISOString().split("T")[0]
      }`,
      this.httpOptions
    );
  }

  getCombosServidor(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this.http
        .get(`${this.url}api/combos-light`, this.httpOptions)
        .toPromise()
        .then((x) => {
          localStorage.setItem("Combos", JSON.stringify(x));
          resolve(x);
        });
    });
    return promise;
  }

  getCombos(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      let combos = localStorage.getItem("Combos");
      if ((combos == null) || (combos == 'null')) {
        this.getCombosServidor().then((x) => {
          resolve(x);
        });
      } else {
        resolve(JSON.parse(localStorage.getItem("Combos")));
      }
    });

    return promise;
  }

  postTelaConsultaRisco(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}api/TelaConsultaAvRisco`,
        JSON.stringify(filtro),
        this.httpOptions
      )
      .toPromise();
  }

  postPaxTransportado(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}api/RelQtdePaxTransportados`,
        JSON.stringify(filtro),
        this.httpOptions
      )
      .toPromise();
  }

  postConsComb(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}api/RelConsumoDeCombustivel`,
        JSON.stringify(filtro),
        this.httpOptions
      )
      .toPromise();
  }

  postRelErrosNoDb(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}api/RelErrosNoDb`,
        JSON.stringify(filtro),
        this.httpOptions
      )
      .toPromise();
  }

  postRelRDV(filtro: any): Promise<any> {
    return this.http
      .post(`${this.url}api/RelRdv`, JSON.stringify(filtro), this.httpOptions)
      .toPromise();
  }

  getRDV(folha: string): Promise<any> {
    return this.http
      .get(`${this.url}api/RelRdv/` + folha, this.httpOptions)
      .toPromise();
  }

  getAssinaturaRDV (DiarioDeBordo_id: string): Promise<any> {
    return this.http
      .get(`${this.url}api/assinatura-rdv/` + DiarioDeBordo_id, this.httpOptions)
      .toPromise();
  }

  baseAssinaturaRDV (DiarioDeBordo_id: string): Promise<any> {
    return this.http
      .get(`${this.url}api/base-assinatura-rdv/` + DiarioDeBordo_id, this.httpOptions)
      .toPromise();
  }

  postAssinaturaBoca (dados: any): Promise<any> {
    return this.http
      .post(`${this.url}api/assinatura-boca`, JSON.stringify(dados), this.httpOptions)
      .toPromise();
  }

  postEmailManifestos (email: any): Promise<any> {
    return this.http
      .post(`${this.url}api/enviar-mail-manifestos`, JSON.stringify(email), this.httpOptions)
      .toPromise();
  }

  postStatusAssinaturaBoca (dados: any): Promise<any> {
    return this.http
      .post(`${this.url}api/status-assinaturas-rdv`, JSON.stringify(dados), this.httpOptions)
      .toPromise();
  }

  assinarRDV (Assinatura_id: string, EmailAssinante: string, nomeArquivo: string): Promise<any> {
    return this.http
      .get(`${this.url}api/assinar-pdfs-rdv/` + Assinatura_id + '/' + EmailAssinante + '/' + nomeArquivo, this.httpOptions)
      .toPromise();
  }

  assinarBoca (Assinatura_id: string, EmailAssinante: string, nomeArquivo: string): Promise<any> {
    return this.http
      .get(`${this.url}api/assinar-pdf-boca/` + Assinatura_id + '/' + EmailAssinante + '/' + nomeArquivo, this.httpOptions)
      .toPromise();
  }

  obterStatusRDV (Assinatura_id: string, nomeArquivo: string): Promise<any> {
    return this.http
      .get(`${this.url}api/obter-status-rdv/` + Assinatura_id + '/' + nomeArquivo, this.httpOptions)
      .toPromise();
  }

  obterStatusBoca (Assinatura_id: string, nomeArquivo: string): Promise<any> {
    return this.http
      .get(`${this.url}api/obter-status-boca/` + Assinatura_id + '/' + nomeArquivo, this.httpOptions)
      .toPromise();
  }

  postRelHorasQuinzena(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}api/RelHorasQuinzena`,
        JSON.stringify(filtro),
        this.httpOptions
      )
      .toPromise();
  }

  postRelBoca(filtro: any): Promise<any> {
    return this.http
      .post(`${this.url}api/RelBoca`, JSON.stringify(filtro), this.httpOptions)
      .toPromise();
  }

  getHorasVoadasPorDia(data: Date): Promise<any> {
    let str = DataUtil.from_date_to_traco(data);

    return this.http
      .get(`${this.url}api/RelControleDeHoras/${str}`, this.httpOptions)
      .toPromise();
  }

  getRelStatusDaFrota(
    data: Date,
    cliente: string
  ): Promise<any> {
    let caminho = `${this.url}api/RelStatusDaFrota/${data.toISOString().split("T")[0]
      }/${cliente}`;
    return this.http.get(caminho, this.httpOptions).toPromise();
  }

  getEscalaPTBR(
    dataref: Date,
    dataIni: Date,
    dataFim: Date,
    baseDeOperacao: string
  ): Promise<any> {
    let caminho = `${this.url}api/RelEscala/${dataref.toISOString().split("T")[0]
      }/${dataIni.toISOString().split("T")[0]}/${dataFim.toISOString().split("T")[0]
      }/${baseDeOperacao}`;
    return this.http.get(caminho, this.httpOptions).toPromise();
  }

  postRelStatusDaFrota(lista: any): Promise<any> {
    let caminho = `${this.url}api/RelStatusDaFrota`;
    return this.http
      .post(caminho, JSON.stringify(lista), this.httpOptions)
      .toPromise();
  }

  postRelHorasPorTripulante(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}api/RelHorasPorTripulante`,
        JSON.stringify(filtro),
        this.httpOptions
      )
      .toPromise();
  }

  getCliente() {
    return this.http
      .get(`${this.url}api/clientelogado`, this.httpOptions)
      .toPromise();
  }

  // getLogo() {
  //   return `${this.url}assets/img/${this.clienteLogado}.png`;
  // }

  postRelPousosPorLocal(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}api/RelPousosPorLocal`,
        JSON.stringify(filtro),
        this.httpOptions
      )
      .toPromise();
  }

  postVoosRealizados(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}api/RelVoosRealizados`,
        JSON.stringify(filtro),
        this.httpOptions
      )
      .toPromise();
  }

  postRelControleDeHoras(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}api/RelControleDeHoras`,
        JSON.stringify(filtro),
        this.httpOptions
      )
      .toPromise();
  }

  postEscalaNova(dados: any): Promise<any> {
    return this.http
      .post(
        `${this.url}api/dadosDaEscala`,
        JSON.stringify(dados),
        this.httpOptions
      )
      .toPromise();
  }

  getContrato(): Promise<any> {
    return this.http
      .get(`${this.url}api/contrato`, this.httpOptions)
      .toPromise();
  }

  getTodos(tipo: string): Promise<any> {
    return this.http
      .get(`${this.url}api/${tipo}`, this.httpOptions)
      .toPromise();
  }

  postIndisponibilidade(filtro: any): Promise<any> {
    return this.http
      .post(`${this.url}api/relIndisponibilidade`, filtro, this.httpOptions)
      .toPromise();
  }

  postCrudIndisponibilidadeFiltro(filtro: any): Promise<any> {
    return this.http
      .post(
        `${this.url}api/CrudIndiponibilidade/filtro`,
        filtro,
        this.httpOptions
      )
      .toPromise();
  }

  postCrudIndisponibilidade(filtro: any): Promise<any> {
    return this.http
      .post(`${this.url}api/CrudIndiponibilidade`, filtro, this.httpOptions)
      .toPromise();
  }

  postPontualidade(filtro: any): Promise<any> {
    return this.http
      .post(`${this.url}api/RelPontualidade`, filtro, this.httpOptions)
      .toPromise();
  }

  getCDO(data: Date): Promise<any> {
    return this.http
      .get(
        `${this.url}api/RelControleDiarioDeOperacoes/${data.toISOString().split("T")[0]
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
      .get(`${this.url}api/impressaodejornada/${id}`, this.httpOptions)
      .toPromise();
  }

  getJornadaImpressaoPeloMesAno(data: Date): Promise<any> {
    return this.http
      .get(
        `${this.url}api/jornadamensal/data/${data.toISOString().split("T")[0]}`,
        this.httpOptions
      )
      .toPromise();
  }

  getIncompatibilidadeCRUD(): Promise<any> {
    return this.http
      .get(`${this.url}api/Incompatibilidade`, this.httpOptions)
      .toPromise();
  }

  postIncompatibilidadeCRUD(dados): Promise<any> {
    return this.http
      .post(`${this.url}api/Incompatibilidade`, dados, this.httpOptions)
      .toPromise();
  }

  deleteIncompatibilidadeCRUD(dados): Promise<any> {
    return this.http
      .post(`${this.url}api/Incompatibilidade/delete`, dados, this.httpOptions)
      .toPromise();
  }

  getConfirmacaoDeJornada(gerente: boolean, id: string): Promise<any> {
    if (gerente)
      return this.http
        .get(
          `${this.url}api/confirmacaodejornada/gerente/${id}`,
          this.httpOptions
        )
        .toPromise();

    return this.http
      .get(
        `${this.url}api/confirmacaodejornada/analista/${id}`,
        this.httpOptions
      )
      .toPromise();

    //confirmacao-de-jornada/gerente
  }

  getPerfis(): Promise<any> {
    return this.http.get(`${this.url}api/perfis`, this.httpOptions).toPromise();
  }

  getPermissao(): Promise<any> {
    return this.http
      .get(`${this.url}api/permissoes`, this.httpOptions)
      .toPromise();
  }

  postPermissao(permissao): Promise<any> {
    return this.http
      .post(`${this.url}api/permissoes`, permissao, this.httpOptions)
      .toPromise();
  }

  getPermissaoById(id: String): Promise<any> {
    return this.http
      .get(`${this.url}api/permissoes/${id}`, this.httpOptions)
      .toPromise();
  }

  getTripulantes(): Promise<any> {
    return this.http
      .get(`${this.url}api/tripulante`, this.httpOptions)
      .toPromise();
  }

  getTripulantesLight(): Promise<any> {
    return this.http
      .get(`${this.url}api/tripulante-light`, this.httpOptions)
      .toPromise();
  }


  /*
  
  async getProximosVencimentos(referencia : Date): Promise<any> {
      return await lastValueFrom(
        this.http
          .get(`${this.url}api/ultimosVencimentos/${referencia.toISOString().split('T')[0]}`, this.httpOptions)
      );
    }
  
          */



  async getAnaliseDeFadiga(dateI: Date, dateF: Date): Promise<any> {
    return await lastValueFrom(this.http
      .get(
        `${this.url}api/analise-de-fadiga/consultar/${dateI.toISOString().split("T")[0]}/${dateF.toISOString().split("T")[0]}`,
        this.httpOptions
      ));
  }

  getGrupoDeFicha(): Promise<any> {
    return this.http
      .get(`${this.url}api/grupodeficha`, this.httpOptions)
      .toPromise();
  }

  postGrupoDeFicha(grupo): Promise<any> {
    return this.http
      .post(`${this.url}api/grupodeficha`, grupo, this.httpOptions)
      .toPromise();
  }

  getFichaDeAvaliacao(): Promise<any> {
    return this.http
      .get(`${this.url}api/fichadeavaliacao`, this.httpOptions)
      .toPromise();
  }

  postFichaDeAvaliacao(ficha): Promise<any> {
    return this.http
      .post(`${this.url}api/fichadeavaliacao`, ficha, this.httpOptions)
      .toPromise();
  }

  async getProximosVencimentos(referencia: Date): Promise<any> {
    return await lastValueFrom(
      this.http
        .get(`${this.url}api/ultimosVencimentos/${referencia.toISOString().split('T')[0]}`, this.httpOptions)
    );
  }
  async postAtualizaVencimento(vencimento: any): Promise<any> {
    return await lastValueFrom(
      this.http.post(`${this.url}api/AtulizarVencimento`, vencimento, this.httpOptions)
    );
  }

  async postRelarioMedicao(filtro): Promise<any> {
    return await lastValueFrom(this.http
      .post(
        `${this.url}api/relmedicao`,
        filtro,
        this.httpOptions
      ));
  }


  async getGenerico(controller: string, filtro: string): Promise<any> {
    return await lastValueFrom(this.http
      .get(`${this.url}api/${controller}/${filtro}`, this.httpOptions));
  }


}
