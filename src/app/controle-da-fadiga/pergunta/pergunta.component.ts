import { ApiService } from 'src/app/shared/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.css']
})
export class PerguntaComponent implements OnInit {

  public loading = false;
  public tipoPerguntas = [];
  public perguntas = [];
  public showOpcao = false;
  public opcoeList = [];

  constructor(private api: ApiService) {
    // this.app.setTitle('Pergunta');
  }

  ngOnInit() {
    this.loading = true;
    this.api.getPergunta().then((response: any) => {
      this.perguntas = response.Lista;
      this.tipoPerguntas = response.TipoDePergunta;
      this.loading = false;
    });
  }

  addPergunta() {
    this.perguntas.unshift({
      TipoPergunta: {
        Id: ''
      },
      Texto: '',
      OpcaoMenor: '',
      OpcaoMaior: '',
      Configuracao: '',
      Ativo: true
    });
  }

  deletePergunta(e: any) {
    const pergunta = this.perguntas.filter((p) => {
      return p.Id === e.target.id;
    })[0];
    pergunta.Ativo = !e.target.checked;
  }

  savarPerguntas() {
    this.loading = true;
    this.api.postPergunta(this.perguntas).then(response => {
      this.perguntas = this.perguntas.filter((pergunta: any) => {
        return pergunta.Ativo;
      });
      this.loading = false;
    });
  }

  opcoes(id: string) {
    const pergunta = this.perguntas.filter((p: any) => {
      return p.Id === id;
    })[0];
    this.opcoeList = pergunta.Opcoes;
    this.showOpcao = true;
  }

  closeOpcao() {
    let removeOpcoes = [];
    this.opcoeList.forEach(opcao => {
      if (!opcao.Texto.trim()) {
        removeOpcoes.push(opcao);
      }
    });

    removeOpcoes.forEach(remove => {
      this.opcoeList.splice(remove, 1);
    });

    removeOpcoes = [];
    this.showOpcao = false;
  }

  addOpcao() {
    this.opcoeList.push({
      Ativo: true,
      OrdemDeExibicao: this.opcoeList.length + 1,
      Texto: '',
      Valor: 0
    });
  }

}
