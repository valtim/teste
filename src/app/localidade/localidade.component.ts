import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-localidade',
  templateUrl: './localidade.component.html',
  styleUrls: ['./localidade.component.css']
})
export class LocalidadeComponent implements OnInit {

  private search = {
    Nome: '',
    ICAO: '',
    Tipo: ''
  };
  private formatoLocalidade = 'GMS';
  private listaLocalidade = [];
  private localidades = [];
  private originalLocalidades = [];
  private localidadesAlteradas = [];
  constructor(private app: AppComponent, private api: ApiService) { }

  ngOnInit() {
    this.app.setTitle('Localidade');
    this.api.getListaLocalidade().then((result) => {
      this.listaLocalidade = result.TipoDeLocalidade;
    });
    this.api.getLocalidade(this.formatoLocalidade).then((result) => {
      this.originalLocalidades = this.localidades = result;
      console.log(result);
    });
  }

  onChangeFormato() {
    this.api.getLocalidade(this.formatoLocalidade).then((result) => {
      this.localidades = result;
    });
  }

  onSendLocalidade() {
    this.api.postLocalidade(this.localidadesAlteradas).then((response) => {
      console.log(response);
      this.localidadesAlteradas = [];
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

  onSearchLocalidade() {
    this.localidades = this.originalLocalidades.filter((localidade) => {
      return localidade.Nome.includes(this.search.Nome);
    }).filter((localidade) => {
      return localidade.NomeICAO.includes(this.search.ICAO);
    }).filter((localidade) => {
      return localidade.TipoDeLocalidade.Id.includes(this.search.Tipo);
    });
  }

  onRemoveLocalidade(localidade) {
    localidade.Ativo = !localidade.Ativo;
  }
}
