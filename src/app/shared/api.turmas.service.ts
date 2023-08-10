import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { ApiService } from './api.service';


@Injectable({
  providedIn: "root",
})
export class ApiTurmasService {
  error: string;
  message: any;
  username: string;
  defaulLoading: boolean;

  private loadingSource = new BehaviorSubject<boolean>(false);
  loading = this.loadingSource.asObservable();

  constructor(private api: ApiService, private http: HttpClient) {
    this.message = {
      show: false,
      title: "",
      message: "",
      type: "alert",
      callBack: () => { },
    };
  }

  get url(): string {
    return this.api.url;
  }

  onLoading() {
    this.defaulLoading = !this.defaulLoading;
    this.loadingSource.next(this.defaulLoading);
  }



  async postLogin(username: string, password: string): Promise<any> {
    return this.http
      .post(
        this.api.url + "autorizacao-perfil",
        { username: username, password: password },
        this.api.httpOptions
      )
      .toPromise();
  }

  newGuid(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        // tslint:disable-next-line:no-bitwise
        const r = (Math.random() * 16) | 0,
          // tslint:disable-next-line:no-bitwise
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  newBlankGuid(): string {
    return '00000000-0000-0000-0000-000000000000'
  }

  getUsuarioLogadoComPermissoes(callback) {
    this.getUsuarioLogado().then(resp => {

      if (resp == null) {
        window.location.href = "/logoff";
        return;
      }

      resp.ehAdministrador = (resp.PerfisHabilitados.map(x => x.Sigla).filter(y => ["gtr", "adm", "atr"].includes(y)).length > 0);
      resp.ehInstrutor = (resp.PerfisHabilitados.map(x => x.Sigla).filter(y => y == "ins").length > 0);
      callback(resp);
    });
  }

  getUsuarioLogado(): Promise<any> {
    const url = this.api.url + `quemsoueu`;
    return this.http.get(url, this.api.httpOptions).toPromise();
  }

  getListOfAnexos(referencia: string): Promise<any> {
    const url = this.api.url + `lista_arquivo/${referencia}`;
    return this.http.get(url, this.api.httpOptions).toPromise();
  }

  deleteAnexo(id: string): Promise<any> {
    const url = this.api.url + `arquivo/${id}/delete`;
    return this.http.get(url, this.api.httpOptions).toPromise();
  }

  postUploadAnexo(id: any, files: any): Promise<any> {
    const url = this.api.url + `arquivo/${id}`;
    return this.http.post(url, files).toPromise();
  }

  postUploadSign(id: any, files: any): Promise<any> {
    const url = this.url + `arquivo-sign/${id}`;
    return this.http.post(url, files).toPromise();
  }

  postUploadSimples(files: any): Promise<any> {
    const url = this.api.url + `arquivo`;
    return this.http.post(url, files).toPromise();
  }

  postComentario(comentario): Promise<any> {
    return this.http
      .post(`${this.api.url}TurmaComentario`, comentario, this.api.httpOptions)
      .toPromise();
  }

  getEnvolvidosTurma(idTurma): Promise<any> {
    return this.http
      .get(`${this.api.url}turma/envolvidos/${idTurma}`, this.api.httpOptions)
      .toPromise();
  }


  async getNotificarEnvolvidos(idTurma): Promise<any> {
    return await lastValueFrom(this.http
      .get(`${this.api.url}turma/notificarEnvolvidos/${idTurma}`, this.api.httpOptions));
  }

  // postNotificarEnvolvidoTurma(envolvido): Promise<any> {
  //   const httpOptions = new HttpHeaders({
  //     "Content-Type": "application/json",
  //   });
  //   return this.http
  //     .post(
  //       `https://redemet.sistemasol.com.br/mail`,
  //       envolvido,
  //       this.api.httpOptions
  //     )
  //     .toPromise();
  // }

  getInstrutores(): Promise<any> {
    return this.http
      .get(`${this.api.url}instrutor`, this.api.httpOptions)
      .toPromise();
  }

  postTreinamento(treinamento): Promise<any> {
    return this.http
      .post(`${this.api.url}treinamento`, treinamento, this.api.httpOptions)
      .toPromise();
  }


  async deleteTreinamento(ids): Promise<any> {
    return await lastValueFrom(this.http
      .post(`${this.api.url}treinamento/delete`, ids, this.api.httpOptions));
  }


  putTreinamento(treinamento): Promise<any> {
    return this.http
      .put(`${this.api.url}treinamento`, treinamento, this.api.httpOptions)
      .toPromise();
  }

  getInstrutorTreinamento(id: string): Promise<any> {
    return this.http
      .get(
        `${this.api.url}tripulante/instrutor/treinamento/${id}`,
        this.api.httpOptions
      )
      .toPromise();
  }

  getAlunosTreinamento(id: string): Promise<any> {
    return this.http
      .get(
        `${this.api.url}tripulante/alunos/treinamento/${id}`,
        this.api.httpOptions
      )
      .toPromise();
  }

  postTurma(turma: any): Promise<any> {
    return this.http
      .post(`${this.api.url}turma`, turma, this.api.httpOptions)
      .toPromise();
  }

  putTurma(turma: any): Promise<any> {
    return this.http
      .put(`${this.api.url}turma`, turma, this.api.httpOptions)
      .toPromise();
  }

  postTurmaUploadAnexo(id: any, files: any): Promise<any> {
    return this.http
      .post(`${this.api.url}turma/upload/${id}`, files, this.api.httpOptions)
      .toPromise();
  }

  getTurmaAnexos(id: string): Promise<any> {
    return this.http
      .get(`${this.api.url}turma/files/${id}`, this.api.httpOptions)
      .toPromise();
  }

  postTurmaUlpoadNRT(id: any, files: any): Promise<any> {
    return this.http
      .post(
        `${this.api.url}turma/upload/nrt/${id}`,
        files,
        this.api.httpOptions
      )
      .toPromise();
  }

  getTurmaUlpoadNRT(id: any): Promise<any> {
    return this.http
      .get(`${this.api.url}turma/files/nrt/${id}`, this.api.httpOptions)
      .toPromise();
  }

  deleteTurmaUpload(id: string, nome: string): Promise<any> {
    return this.http
      .delete(`${this.api.url}turma/upload/${id}/${nome}`, this.api.httpOptions)
      .toPromise();
  }

  deleteTurmaNRTUpload(id: string, nome: string): Promise<any> {
    return this.http
      .delete(
        `${this.api.url}turma/upload/nrt/${id}/${nome}`,
        this.api.httpOptions
      )
      .toPromise();
  }

  deleteTurma(id: string): Promise<any> {
    return this.http
      .delete(`${this.api.url}turma/${id}`, this.api.httpOptions)
      .toPromise();
  }

  getTurmas(): Promise<any> {
    return this.http
      .get(`${this.api.url}turma`, this.api.httpOptions)
      .toPromise();
  }

  getTurmasPorUsuario(): Promise<any> {
    return this.http
      .get(`${this.api.url}turma/usuario`, this.api.httpOptions)
      .toPromise();
  }
  getTurmasByData(dataIni: Date, dataFim: Date): Promise<any> {
    return this.http.get(`${this.api.url}turmaPorData/${dataIni.toISOString().split('T')[0]}/${dataFim.toISOString().split('T')[0]}`, this.api.httpOptions).toPromise();
  }

  getTurmaById(id: string): Promise<any> {
    return this.http
      .get(`${this.api.url}turma/${id}`, this.api.httpOptions)
      .toPromise();
  }

  /*
valtim
*/

  getTreinamentoPorEquipamento(): Promise<any> {
    return this.http
      .get(`${this.api.url}TreinamentoPorEquipamento`, this.api.httpOptions)
      .toPromise();
  }

  getInsumosTurmas(): Promise<any> {
    return this.http
      .get(`${this.api.url}turma/comListas`, this.api.httpOptions)
      .toPromise();
  }

  deleteTurmas(id: string[]): Promise<any> {
    return this.http
      .post(`${this.api.url}turma/delete`, id, this.api.httpOptions)
      .toPromise();
  }

  /*
fim valtim
*/


  getTreinamentos(): Promise<any> {
    return this.http
      .get(`${this.api.url}treinamento/ComListas`, this.api.httpOptions)
      .toPromise();
  }
  getEquipamentos(): Promise<any> {
    return this.http
      .get(`${this.api.url}equipamento`, this.api.httpOptions)
      .toPromise();
  }
  getEquipamentosByTreinamento(): Promise<any> {
    return this.http
      .get(`${this.api.url}equipamento/treinamento`, this.api.httpOptions)
      .toPromise();
  }

  getTipoTreinamentos(): Promise<any> {
    return this.http
      .get(`${this.api.url}treinamento/tipos`, this.api.httpOptions)
      .toPromise();
  }

  getTreinamentosByEquipamento(IdEquipamento: string): Promise<any> {
    return this.http
      .get(
        `${this.api.url}treinamento/equipamento/${IdEquipamento}`,
        this.api.httpOptions
      )
      .toPromise();
  }

  getInstrutoresByTreinamento(IdTreinamento: string): Promise<any> {
    return this.http
      .get(
        `${this.api.url}instrutor/treinamento/${IdTreinamento}`,
        this.api.httpOptions
      )
      .toPromise();
  }

  getTreinamento(id: string): Promise<any> {
    return this.http
      .get(`${this.api.url}treinamento/${id}/comListas`, this.api.httpOptions)
      .toPromise();
  }

  deleteConteudo(id: string): Promise<any> {
    return this.http
      .delete(`${this.api.url}conteudo/${id}`, this.api.httpOptions)
      .toPromise();
  }



  uploadFileTreinamento(id: string, tripulanteFiles: any): Promise<any> {
    return this.http
      .post(
        `${this.api.url}treinamento/upload/${id}`,
        tripulanteFiles,
        this.api.httpOptions
      )
      .toPromise();
  }

  deleteFileTreinamento(id: string, nome: string): Promise<any> {
    return this.http
      .delete(
        `${this.api.url}treinamento/upload/${id}/${nome}`,
        this.api.httpOptions
      )
      .toPromise();
  }

  getTreinamentoFiles(id: string): Promise<any> {
    return this.http
      .get(`${this.api.url}treinamento/files/${id}`, this.api.httpOptions)
      .toPromise();
  }

  postTurmaStatus(turmaStatus: any): Promise<any> {
    return this.http
      .post(`${this.api.url}turmaStatus`, turmaStatus, this.api.httpOptions)
      .toPromise();
  }

  putTurmaStatus(turmaStatus: any): Promise<any> {
    return this.http
      .put(`${this.api.url}turmaStatus`, turmaStatus, this.api.httpOptions)
      .toPromise();
  }

  getTurmaStatusByIdTurma(id: any): Promise<any> {
    return this.http
      .get(`${this.api.url}turmaStatus/${id}`, this.api.httpOptions)
      .toPromise();
  }

  sendEmail(email: any): Promise<any> {
    return this.http
      .post("https://log.fastapi.com.br/mail", email)
      .toPromise();
  }

  getComentariosByTurma(turma: string): Promise<any> {
    return this.http
      .get(`${this.api.url}TurmaComentario/${turma}`, this.api.httpOptions)
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
}
