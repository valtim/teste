import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-fadiga',
  templateUrl: './fadiga.component.html',
  styleUrls: ['./fadiga.component.css']
})
export class FadigaComponent implements OnInit {

  public loading = false;
  public data: string;
  public fadigas = [];
  public infoTratamentoFadiga = {
    Perguntas: [],
    Evento: {
      Pesquisa: { Id: '' }
    },
    Pesquisa: {}
  };
  public tratamento = {
    Texto: '',
    Liberado: null
  };
  public info = false;
  public pesquisa = true;

  constructor(private app: AppComponent, private api: ApiService) { }

  ngOnInit() {
    this.app.setTitle('Fadiga');
    this.data = new Date().toISOString().split('T')[0];
    this.searchFadiga();
  }

  searchFadiga() {
    this.loading = true;
    this.api.getGerenciaFadiga(this.data).then((response) => {
      this.fadigas = response;
      this.loading = false;
    }).catch(error => {
      this.loading = false;
    });
  }

  tratamentoFadiga(e) {
    this.loading = true;
    this.api.getTratamentoFadiga(e.target.id).then((response) => {
      console.log('response: ', response);
      this.infoTratamentoFadiga = response;
      this.info = true;
      this.loading = false;
    });
  }

  getPergunta(id: string): string {
    if (this.infoTratamentoFadiga.Perguntas.length && id) {
      const Pergunta = this.infoTratamentoFadiga.Perguntas.filter(pergunta => pergunta.Id === id)[0];

      if (Pergunta.Texto) {
        return Pergunta.Texto;
      } else {
        return `${Pergunta.OpcaoMenor} / ${Pergunta.OpcaoMaior}`;
      }
    }
  }

  closeTratamentoFadiga() {
    this.info = false;
  }

  postTratamentoFadiga() {
    if (this.infoTratamentoFadiga.Evento.Pesquisa.Id && this.tratamento.Texto) {
      this.loading = true;
      this.api.postTratamentoFadiga(this.infoTratamentoFadiga.Evento.Pesquisa.Id, this.tratamento).then(response => {
        this.loading = false;
        this.tratamento.Texto = '';
        this.tratamento.Liberado = '';
      });
    }
  }
}
