import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-localidade',
  templateUrl: './localidade.component.html',
  styleUrls: ['./localidade.component.css']
})
export class LocalidadeComponent implements OnInit {

  public search = {
    Nome: '',
    ICAO: '',
    Tipo: ''
  };
  public query = '';
  public tipoLocalidade = 'GMS';
  public listaLocalidade = [];
  public perPage = 10;
  public currentPage = 1;
  public total = 0;
  public localidades = [];
  public localidadesAlteradas = [];
  public loading = true;
  public longitudeMask = [/\d/, /\d/, '°', /\d/, /\d/, '\'', /\d/, /\d/, '"'];

  constructor(private api: ApiService) { }

  ngOnInit() {
    // this.app.setTitle('Localidade');
    this.api.getListaLocalidade().then((result) => {
      this.listaLocalidade = result.TipoDeLocalidade;
    });
    this.getLocalidade();
  }

  private getLocalidade() {
    this.loading = true;
    this.api.getLocalidade(this.tipoLocalidade, this.perPage, this.currentPage, this.query)
      .then((result) => {
        this.localidades = result.Registros;
        this.currentPage = result.Pagina;
        this.perPage = result.TamanhoDaPagina;
        this.total = result.Total;
        this.loading = false;
      });
  }

  onChangeLocalidade(localidade: any) {
    const exist = this.localidadesAlteradas.filter(alterado => alterado.Id === localidade.Id);
    if (exist.length > 0) {
      const index = this.localidadesAlteradas.indexOf(exist[0]);
      this.localidadesAlteradas.splice(index, 1);
    }
    this.localidadesAlteradas.push(localidade);
  }

  onChangeFormato() {
    this.getLocalidade();
  }

  onChangePage(page: any) {
    console.log(page);
    if (this.perPage !== parseInt(page.perPage, 10)) {
      this.currentPage = 1;
      this.perPage = parseInt(page.perPage, 10);
    } else {
      this.currentPage = page.currentPage;
    }
    this.getLocalidade();
  }

  onSendLocalidade() {
    this.api.postLocalidade(this.localidadesAlteradas).then((response) => {
      this.localidadesAlteradas = [];
    });
  }

  onSearchLocalidade() {
    if (this.search.Nome) {
      this.query += `/NOME="${this.search.Nome}"`;
    }
    if (this.search.ICAO) {
      this.query += `/ICAO="${this.search.ICAO}"`;
    }
    if (this.search.Tipo) {
      this.query += `/Tipo.Id="${this.search.Tipo}"`;
    }

    this.getLocalidade();
  }

  onRemoveLocalidade(localidade: any) {
    localidade.Ativo = !localidade.Ativo;
    this.onChangeLocalidade(localidade);
  }
}
