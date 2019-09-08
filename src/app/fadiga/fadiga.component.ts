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
  public infoPesquisa = [];
  public historicos = [];
  private idPesquisa = '';
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
    this.api.getTratamentoFadiga(e.target.parentElement.id).then((response) => {
      this.infoPesquisa = response.Resultado;
      this.historicos = response.Evento.Avaliacoes;
      this.idPesquisa = response.Evento.Pesquisa.Id;
      this.info = true;
      this.loading = false;
    });
  }

  closeTratamentoFadiga() {
    this.info = false;
  }

  postTratamentoFadiga() {
    if (this.idPesquisa && this.tratamento.Texto) {
      this.loading = true;
      this.api.postTratamentoFadiga(this.idPesquisa, this.tratamento).then(response => {
        this.loading = false;
        this.tratamento.Texto = '';
        this.tratamento.Liberado = '';
      });
    }
  }
}
