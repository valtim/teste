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
    this.loading = true;
    this.api.getBase().then((resp) => {
      this.bases = resp;
    });
    this.api.getNTripulante(this.route.snapshot.paramMap.get('id')).then((resp) => {
      this.tripulante = resp;
      this.tripulante.Nascimento = this.tripulante.Nascimento.split('T')[0];
      this.tripulante.Admissao = this.tripulante.Admissao.split('T')[0];
      console.log(this.tripulante);
      this.app.setTitle('Tripulante - ' + this.tripulante.Trato);
      this.loading = false;
    });
  }

  onClickTabs(name: string) {
    this.template = name;
    console.log(this.template);
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
