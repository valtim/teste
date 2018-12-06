import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-localidade',
  templateUrl: './localidade.component.html',
  styleUrls: ['./localidade.component.css']
})
export class LocalidadeComponent implements OnInit {

  search = {
    Nome: '',
    ICAO: '',
    Tipo: ''
  };
  formatoLocalidade = 'GMS';
  listaLocalidade = [];
  localidades = [];
  originalLocalidades = [];
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
    console.log(this.localidades[0]);
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
