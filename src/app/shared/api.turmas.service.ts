import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AutorizacaoService } from './autorizacao.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ApiTurmasService {
  private httpOptions: any;
  public URLCORE: string;
  private permission;
  error: string;
  message: any;
  username: string;
  defaulLoading: boolean;

  private loadingSource = new BehaviorSubject<boolean>(false);
  loading = this.loadingSource.asObservable();

  constructor(private http: HttpClient, private autorizacao: AutorizacaoService) {

    this.URLCORE = window.location.host == 'localhost:4200' ? 'https://localhost:44343/' : '/';

    if (localStorage.getItem('Authorization')) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Authorization'),
        })
      };
    } else {
      this.httpOptions = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }

    this.message = {
      show: false,
      title: '',
      message: '',
      type: 'alert',
      callBack: () => { }
    };
  }

  onLoading() {
    this.defaulLoading = !this.defaulLoading;
    this.loadingSource.next(this.defaulLoading);
  }

  getOptions(lista : []){
    if ( lista == undefined ){
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Authorization'),
        })
      };
    }

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization'),
        'Lista': JSON.stringify(lista)
      })
    };
  }

  async postLogin(username: string, password: string): Promise<any> {
    return this.http.post(this.URLCORE + 'api/autorizacao-perfil', { 'username': username, 'password': password }, this.httpOptions)
      .toPromise();
  }

  public updateAuthorization(): void {
    localStorage.setItem('Authorization', this.autorizacao.getAuthorization());
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('Authorization')
      })
    };
  }

  newGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0,
        // tslint:disable-next-line:no-bitwise
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  newBlankGuid():string{
    return '00000000-0000-0000-0000-000000000000'           
  }

  getUsuarioLogadoComPermissoes(callback) {
    this.getUsuarioLogado().then(resp => {
      resp.ehAdministrador = (resp.PerfisHabilitados.map(x => x.Sigla).filter(y => ["gtr","adm","atr"].includes(y)).length > 0);
      resp.ehInstrutor = (resp.PerfisHabilitados.map(x => x.Sigla).filter(y => y == "ins").length > 0);      
      callback(resp);
    });
  }

  getUsuarioLogado(): Promise<any> {
    const url = this.URLCORE + `api/quemsoueu`;
    return this.http.get(url, this.httpOptions).toPromise();
  }

  getListOfAnexos(referencia: string): Promise<any> {
    const url = this.URLCORE + `api/lista_arquivo/${referencia}`;
    return this.http.get( url, this.httpOptions).toPromise();
  }

  deleteAnexo(id: string): Promise<any> {
    const url = this.URLCORE + `api/arquivo/${id}/delete`;
    return this.http.get( url, this.httpOptions).toPromise();
  }

  postUploadAnexo(id: any, files: any): Promise<any> {
    const url = this.URLCORE + `api/arquivo/${id}`;
    return this.http.post(url, files).toPromise();
  }

  postUploadSimples(files: any): Promise<any> {
    const url = this.URLCORE + `api/arquivo`;
    return this.http.post(url, files).toPromise();
  }

  postComentario(comentario): Promise<any> {
    return this.http.post(`${this.URLCORE}api/TurmaComentario`, comentario, this.httpOptions).toPromise();
  }

  getEnvolvidosTurma(idTurma): Promise<any> {
    return this.http.get(`${this.URLCORE}api/turma/envolvidos/${idTurma}`, this.httpOptions).toPromise();
  }

  postNotificarEnvolvidoTurma(envolvido): Promise<any> {
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`https://redemet.fastapi.com.br/api/mail`, envolvido, this.httpOptions).toPromise();
  }

  getInstrutores(): Promise<any> {
    return this.http.get(`${this.URLCORE}api/instrutor`, this.httpOptions).toPromise();
  }

  postTreinamento(treinamento): Promise<any> {
    return this.http.post(`${this.URLCORE}api/treinamento`, treinamento, this.httpOptions).toPromise();
  }

  putTreinamento(treinamento): Promise<any> {
    return this.http.put(`${this.URLCORE}api/treinamento`, treinamento, this.httpOptions).toPromise();
  }

  getInstrutorTreinamento(id: string): Promise<any> {
    return this.http.get(`${this.URLCORE}api/tripulante/instrutor/treinamento/${id}`, this.httpOptions).toPromise();
  }

  getAlunosTreinamento(id: string): Promise<any> {
    return this.http.get(`${this.URLCORE}api/tripulante/alunos/treinamento/${id}`, this.httpOptions).toPromise();
  }

  postTurma(turma: any): Promise<any> {
    return this.http.post(`${this.URLCORE}api/turma`, turma, this.httpOptions).toPromise();
  }

  putTurma(turma: any): Promise<any> {
    return this.http.put(`${this.URLCORE}api/turma`, turma, this.httpOptions).toPromise();
  }

  postTurmaUploadAnexo(id: any, files: any): Promise<any> {
    return this.http.post(`${this.URLCORE}api/turma/upload/${id}`, files, this.httpOptions).toPromise();
  }

  getTurmaAnexos(id: string): Promise<any> {
    return this.http.get(`${this.URLCORE}api/turma/files/${id}`, this.httpOptions).toPromise();
  }

  postTurmaUlpoadNRT(id: any, files: any): Promise<any> {
    return this.http.post(`${this.URLCORE}api/turma/upload/nrt/${id}`, files, this.httpOptions).toPromise();
  }

  getTurmaUlpoadNRT(id: any): Promise<any> {
    return this.http.get(`${this.URLCORE}api/turma/files/nrt/${id}`, this.httpOptions).toPromise();
  }

  deleteTurmaUpload(id: string, nome: string): Promise<any> {
    return this.http.delete(`${this.URLCORE}api/turma/upload/${id}/${nome}`, this.httpOptions).toPromise();
  }

  deleteTurmaNRTUpload(id: string, nome: string): Promise<any> {
    return this.http.delete(`${this.URLCORE}api/turma/upload/nrt/${id}/${nome}`, this.httpOptions).toPromise();
  }

  deleteTurma(id: string): Promise<any> {
    return this.http.delete(`${this.URLCORE}api/turma/${id}`, this.httpOptions).toPromise();
  }

  getTurmas(): Promise<any> {
    return this.http.get(`${this.URLCORE}api/turma`, this.httpOptions).toPromise();
  }

  getTurmasPorUsuario(): Promise<any> {
    return this.http.get(`${this.URLCORE}api/turma/usuario`, this.httpOptions).toPromise();

  }
  getTurmasByData(dataIni :Date, dataFim: Date): Promise<any> {
    return this.http.get(`${this.URLCORE}api/turmaPorData/${dataIni.toISOString().split('T')[0]}/${dataFim.toISOString().split('T')[0]}`, this.httpOptions).toPromise();
  }

  getTurmaById(id: string): Promise<any> {
    return this.http.get(`${this.URLCORE}api/turma/${id}`, this.httpOptions).toPromise();
  }

/*
valtim
*/

getTreinamentoPorEquipamento(): Promise<any> {
  return this.http.get(`${this.URLCORE}api/TreinamentoPorEquipamento`, this.httpOptions).toPromise();
}


getInsumosTurmas(): Promise<any> {
  return this.http.get(`${this.URLCORE}api/turma/comListas`, this.httpOptions).toPromise();
}

deleteTurmas(id: string[]): Promise<any> {
  return this.http.post(`${this.URLCORE}api/turma/delete`, id, this.httpOptions).toPromise();
}

/*
fim valtim
*/



  getTreinamentos(): Promise<any> {
    return this.http.get(`${this.URLCORE}api/treinamento/ComListas`, this.httpOptions).toPromise();
  }
  getEquipamentos(): Promise<any> {
    return this.http.get(`${this.URLCORE}api/equipamento`, this.httpOptions).toPromise();
  }
  getEquipamentosByTreinamento(): Promise<any> {
    return this.http.get(`${this.URLCORE}api/equipamento/treinamento`, this.httpOptions).toPromise();
  }

  getTipoTreinamentos(): Promise<any> {
    return this.http.get(`${this.URLCORE}api/treinamento/tipos`, this.httpOptions).toPromise();
  }

  getTreinamentosByEquipamento(IdEquipamento: string): Promise<any> {
    return this.http.get(`${this.URLCORE}api/treinamento/equipamento/${IdEquipamento}`, this.httpOptions).toPromise();
  }

  getInstrutoresByTreinamento(IdTreinamento: string): Promise<any> {
    return this.http.get(`${this.URLCORE}api/instrutor/treinamento/${IdTreinamento}`, this.httpOptions).toPromise();
  }

  getTreinamento(id: string): Promise<any> {
    return this.http.get(`${this.URLCORE}api/treinamento/${id}/comListas`, this.httpOptions).toPromise();
  }

  deleteConteudo(id: string): Promise<any> {
    return this.http.delete(`${this.URLCORE}api/conteudo/${id}`, this.httpOptions).toPromise();
  }

  deleteTreinamento(id: string): Promise<any> {
    return this.http.delete(`${this.URLCORE}api/treinamento/${id}`, this.httpOptions).toPromise();
  }

  uploadFileTreinamento(id: string, tripulanteFiles: any): Promise<any> {
    return this.http.post(`${this.URLCORE}api/treinamento/upload/${id}`, tripulanteFiles, this.httpOptions).toPromise();
  }

  deleteFileTreinamento(id: string, nome: string): Promise<any> {
    return this.http.delete(`${this.URLCORE}api/treinamento/upload/${id}/${nome}`, this.httpOptions).toPromise();
  }

  getTreinamentoFiles(id: string): Promise<any> {
    return this.http.get(`${this.URLCORE}api/treinamento/files/${id}`, this.httpOptions).toPromise();
  }

  postTurmaStatus(turmaStatus: any): Promise<any> {
    return this.http.post(`${this.URLCORE}api/turmaStatus`, turmaStatus, this.httpOptions).toPromise();
  }

  putTurmaStatus(turmaStatus: any): Promise<any> {
    return this.http.put(`${this.URLCORE}api/turmaStatus`, turmaStatus, this.httpOptions).toPromise();
  }

  getTurmaStatusByIdTurma(id: any): Promise<any> {
    return this.http.get(`${this.URLCORE}api/turmaStatus/${id}`, this.httpOptions).toPromise();
  }

  sendEmail(email: any): Promise<any> {
    return this.http.post('https://log.fastapi.com.br/api/mail', email).toPromise();
  }  

  getComentariosByTurma(turma: string): Promise<any> {
    return this.http.get(`${this.URLCORE}api/TurmaComentario/${turma}`, this.httpOptions).toPromise();
  }

  getLocale(pais: string): any {
    return {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesMin: ["Do", "Se", "Te", "Qa", "Qi", "Se", "Sa"],
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      today: 'Hoje',
      clear: 'Limpart',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Se'
    };
  }
}
