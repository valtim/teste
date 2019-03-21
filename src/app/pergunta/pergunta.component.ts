import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.css']
})
export class PerguntaComponent implements OnInit {

  public loading = false;
  public tipoPerguntas = [];
  public perguntas = [];

  constructor(private api: ApiService, private app: AppComponent) {
    this.app.setTitle('Pergunta');
  }

  ngOnInit() {
    this.loading = true;
    this.api.getPergunta().then((response: any) => {
      this.perguntas = response;
      this.loading = false;
    });
  }

  addPergunta() {
    this.perguntas.unshift({
      tipodepergunta: '',
      Texto: '',
      OpcaoMenor: '',
      OpcaoMaior: '',
      Configuracao: '',
      Ativo: true
    });
  }

}
