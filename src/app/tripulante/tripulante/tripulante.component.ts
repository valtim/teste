import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-tripulante',
  templateUrl: './tripulante.component.html',
  styleUrls: ['./tripulante.component.css']
})
export class TripulanteComponent implements OnInit {

  tripulante: any;
  loading: boolean;
  bases: [{ Id: '', Nome: '' }];
  template: string;
  cargos: [{ Id: '', Nome: '' }];
  tipoOperacoes: Array<any>;
  tipoAeronaveis: Array<any>;
  cursos: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private app: AppComponent,
    private api: ApiService
  ) {
    this.tripulante = {
      Base: {},
      Cargo: {}
    };
  }

  ngOnInit() {
    this.template = 'dados-pessoais';
    // this.template = 'experiencia';
    this.loading = true;
    this.api.getListaTripulante().then((response) => {
      this.bases = response.Base;
      this.cargos = response.Cargo;
      this.tipoOperacoes = response.TipoDeOperacao;
      this.tipoAeronaveis = response.TipoDeAeronave;
      this.cursos = response.Curso;
    }).catch((error) => {
      this.api.message = {
        show: true,
        type: 'error',
        title: error.error.Message,
        message: error.error.ExceptionMessage
      };
      this.loading = false;
    });

    this.api.getNTripulante(this.route.snapshot.paramMap.get('id')).then((resp) => {
      this.tripulante = resp;
      this.tripulante.Nascimento = this.tripulante.Nascimento.split('T')[0];
      this.tripulante.Admissao = this.tripulante.Admissao.split('T')[0];

      this.tripulante.Operacao = this.tripulante.Operacao.map((operacao) => {

        if (operacao.DataDeInicio) {
          operacao.DataDeInicio = operacao.DataDeInicio.split('T')[0];
        }

        if (operacao.DataDeFim) {
          operacao.DataDeFim = operacao.DataDeFim.split('T')[0];
        }
        return operacao;
      });

      this.tripulante.Experiencia = this.tripulante.Experiencia.map((experiencia) => {
        if (experiencia.DataDeInicio) {
          experiencia.DataDeInicio = experiencia.DataDeInicio.split('T')[0];
        }

        if (experiencia.DataDeFim) {
          experiencia.DataDeFim = experiencia.DataDeFim.split('T')[0];
        }

        if (!experiencia.TipoDeAeronave) {
          experiencia.TipoDeAeronave = { Id: '' };
        }

        if (!experiencia.TipoDeOperacao) {
          experiencia.TipoDeOperacao = { Id: '' };
        }

        if (!experiencia.Cargo) {
          experiencia.Cargo = { Id: '' };
        }

        return experiencia;
      });

      this.tripulante.RelativoFuncaoEmpresa = this.tripulante.RelativoFuncaoEmpresa.map((empresa) => {
        if (empresa.DataDeFim) {
          empresa.DataDeFim = empresa.DataDeFim.split('T')[0];
        }

        if (empresa.Validade) {
          empresa.Validade = empresa.Validade.split('T')[0];
        }
        return empresa;
      });

      this.tripulante.Especializacoes = this.tripulante.Especializacoes.map((espec) => {
        if (espec.DataDeInicio) {
          espec.DataDeInicio = espec.DataDeInicio.split('T')[0];
        }

        if (espec.DataDeFim) {
          espec.DataDeFim = espec.DataDeFim.split('T')[0];
        }

        if (!espec.TipoDeOperacao) {
          espec.TipoDeOperacao = { Id: '' };
        }

        if (!espec.Empresa) {
          espec.Empresa = '';
        }

        return espec;
      });

      console.log(this.tripulante);
      this.app.setTitle('Tripulante - ' + this.tripulante.Trato);
      this.loading = false;
    }).catch((error) => {
      this.api.message = {
        show: true,
        type: 'error',
        title: error.error.Message,
        message: error.error.ExceptionMessage
      };
      this.loading = false;
    });
  }

  onClickTabs(name: string) {
    this.template = name;
  }

  compareFn(obj1: any, obj2: any): boolean {
    return obj1 && obj2 ? obj1.Id === obj2.Id : obj1 === obj2;
  }
}

interface Tripulante {
  Ativo: boolean;
  Atualizacao: string;
  Id: string;
  Trato: string;
  NomeCompleto: string;
  CodigoANAC: number;
  UltimoPeso: number;
  Email: string;
  Identidade: string;
  CPF: string;
  Nascimento: string;
  Licenca: string;
  Endereco: string;
  Idioma: string;
  Admissao: string;
  Operacao: Array<any>;
  Experiencia: Array<any>;
  Especializacoes: Array<any>;
  InformacoesAcademicas: Array<any>;
  RelativoFuncaoGeral: Array<any>;
  RelativoFuncaoEmpresa: Array<any>;
  Base: any;
  Cargo: any;
}
