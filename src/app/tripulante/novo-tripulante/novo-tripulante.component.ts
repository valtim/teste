import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-novo-tripulante',
  templateUrl: './novo-tripulante.component.html',
  styleUrls: ['./novo-tripulante.component.css']
})
export class NovoTripulanteComponent implements OnInit {

  private tripulante = {
    NomeCompleto: '',
    CodigoANAC: '',
    Trato: '',
    Identidade: '',
    CPF: '',
    Nascimento: '',
    Licenca: '',
    Endereco: '',
    Email: '',
    Idioma: '',
    Admissao: '',
    Base: {
      Id: ''
    },
    Cargo: {
      Id: ''
    },
    UltimoPeso: 0,
    Operacao: []
  };
  private pesoKg = 0;
  private tipoOperacoes = [];
  private cargos = [];
  private bases = [];
  private loading = true;

  constructor(private api: ApiService, private app: AppComponent) {
    this.app.setTitle('Novo Tripulante');
    this.app.setVoltar('/tripulantes');
  }

  ngOnInit() {
    this.api.getListaTripulante().then((response) => {
      this.tipoOperacoes = response.TipoDeOperacao;
      this.cargos = response.Cargo;
      this.bases = response.Base;
      this.loading = false;
    });
  }

  changePesoKg() {
    this.tripulante.UltimoPeso = parseFloat((this.pesoKg * 2.20462).toFixed(2));
  }

  changePesoLb() {
    this.pesoKg = parseFloat((this.tripulante.UltimoPeso / 2.20462).toFixed(2));
  }

  onClickNovaOperacao() {
    this.tripulante.Operacao.unshift({
      Ativo: true,
      DataDeFim: '',
      DataDeInicio: '',
      TipoDeOperacao: { Id: '' }
    });
  }

  filterObjAtivo(obj: Array<any>) {
    if (obj) {
      return obj.filter(o => o.Ativo);
    } else {
      return [];
    }
  }

  onClickDelete(obj) {
    obj.Ativo = false;
  }

  saveTripulante() {
    const API = this.api;
    const tripulante = this.tripulante;
    this.api.message = {
      show: true,
      type: 'alert',
      title: 'Salvar',
      message: 'Você deseja salvar as alteração feitas?',
      callBack() {
        API.postNTripulante(tripulante).then((response) => {
          console.log(response);
          this.api.message = {
            show: true,
            type: 'success',
            title: 'Sucesso',
            message: 'As alterações foram salvas com sucesso.'
          };
        }).catch((erro) => {
          console.log(erro);
        });
      }
    };
  }
}
