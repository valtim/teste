import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-tipo-pergunta-list',
  templateUrl: './tipo-pergunta-list.component.html',
  styleUrls: ['./tipo-pergunta-list.component.css']
})
export class TipoPerguntaListComponent implements OnInit {

  public perguntas = [];
  public loading = false;

  constructor(private app: AppComponent, private api: ApiService) {
    this.app.setTitle('Tipo de Pergunta');
  }

  ngOnInit() {
    this.loading = true;
    this.getTipoPergunta();
  }

  getTipoPergunta() {
    this.api.getTipoPergunta().then((response: any) => {
      this.perguntas = response;
      this.loading = false;
    });
  }

  addPergunta() {
    this.perguntas.unshift({
      Nome: '',
      Descricao: '',
      Pagina: this.perguntas.length + 1,
      Ativo: true,
      Atualizacao: new Date(),
      Sincronizacao: new Date()
    });
  }

  deleteThis(e: any) {
    const pergunta = this.perguntas.find(p => p.Id === e.target.id);
    pergunta.Ativo = !e.target.checked;
  }

  savarPerguntas() {
    this.loading = true;
    this.api.postTipoPergunta(this.perguntas).then(response => {
      this.loading = false;
      this.api.message = {
        show: true,
        type: 'success',
        title: 'Sucesso',
        message: 'Alteração realizadas com sucesso.',
        callBack: this.getTipoPergunta()
      };
    }).catch(error => {
      this.loading = false;
      this.api.message = {
        show: true,
        type: 'error',
        title: 'Erro',
        message: error
      };
    });
  }
}