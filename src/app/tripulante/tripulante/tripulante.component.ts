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
        if (typeof operacao.Ativo === 'undefined') {
          operacao.Ativo = true;
        }

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

        if (typeof empresa.Ativo === 'undefined') {
          empresa.Ativo = true;
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

        if (typeof espec.Ativo === 'undefined') {
          espec.Ativo = true;
        }

        return espec;
      });

      this.tripulante.InformacoesAcademicas = this.tripulante.InformacoesAcademicas
        .map((academica) => {
          if (academica.DataDeFim) {
            academica.DataDeFim = academica.DataDeFim.split('T')[0];
          }

          if (academica.DataDeInicio) {
            academica.DataDeInicio = academica.DataDeInicio.split('T')[0];
          }

          if (typeof academica.Ativo === 'undefined') {
            academica.Ativo = true;
          }

          return academica;
        });

      this.tripulante.RelativoFuncaoGeral = this.tripulante.RelativoFuncaoGeral.map((geral) => {
        if (typeof geral.Ativo === 'undefined') {
          geral.Ativo = true;
        }
        return geral;
      });

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

  onClickNovaOperacao() {
    this.tripulante.Operacao.unshift({
      Ativo: true,
      DataDeFim: '',
      DataDeInicio: '',
      TipoDeOperacao: { Id: '' }
    });
  }

  onClickNovaExperiencia() {
    this.tripulante.Experiencia.unshift({
      Ativo: true,
      Atualizacao: new Date(),
      Cargo: { Id: '' },
      Id: '',
      Empresa: '',
      TipoDeAeronave: { Id: '' },
      TipoDeOperacao: { Id: '' },
      TotalDeHoras: 0,
      TotalDeHorasIFR: 0,
      TotalDeHorasNoturno: 0
    });
  }

  onClickNovaEspecializacao() {
    this.tripulante.Especializacoes.unshift({
      Ativo: true,
      CargaHoraria: 0,
      DataDeFim: '',
      DataDeInicio: '',
      Empresa: '',
      TipoDeOperacao: { Id: '' }
    });
  }

  onClickNovaInformacaoAcademica() {
    this.tripulante.InformacoesAcademicas.unshift({
      Ativo: true,
      Instituicao: '',
      Curso: '',
      DataDeFim: '',
      DataDeInicio: ''
    });
  }

  onClickNovoRelativoFuncaoEmpresa() {
    this.tripulante.RelativoFuncaoEmpresa.unshift({
      Ativo: true,
      CargaHoraria: 0,
      Curso: { Id: '' },
      DataDeFim: '',
      Inicial: false,
      Validade: ''
    });
  }

  onClickNovoRelativoFuncaoGeral() {
    this.tripulante.RelativoFuncaoGeral.unshift({
      Ano: 0,
      Ativo: true,
      CargaHoraria: 0,
      Curso: '',
      Instituicao: ''
    });
  }

  onClickDelete(obj) {
    obj.Ativo = false;
  }

  filterObjAtivo(obj: Array<any>) {
    if (obj) {
      return obj.filter(o => o.Ativo);
    } else {
      return [];
    }
  }

  onClickSave() {
    console.log(this.tripulante);
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
