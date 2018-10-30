import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { DiarioService } from '../diario.service';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-diario-bordo',
  templateUrl: './diario-bordo.component.html',
  styleUrls: ['./diario-bordo.component.css']
})
export class DiarioBordoComponent implements OnInit {

  constructor(
    private appComponent: AppComponent,
    private api: ApiService,
    private router: Router,
    private diario: DiarioService) { }


  public loading = true;
  public diarios;

  dataSearch: string;
  ngOnInit() {
    this.appComponent.setTitle('Relatório de Voo');
    this.dataSearch = new Date().toISOString().split('T')[0];

    this.api.getDiarioByDate(this.dataSearch).then((data) => {
      this.diarios = data;
      this.loading = false;
    }).catch((error) => {
      // TODO: erro mensagem
      this.loading = false;
    });
  }

  onChangeDate() {
    this.loading = true;
    this.api.getDiarioByDate(this.dataSearch).then((data) => {
      this.diarios = data;
      this.loading = false;
    }).catch((error) => {
      this.loading = false;
    });
  }

  onClickDiario(diario: any) {
    this.diario.diario = diario;
    this.router.navigate(['/relatorio-voo/editar']);
  }

  novoRelatorioVoo() {
    this.diario.diario = {
      Ativo: true,
      Cancelada: false,
      ComputadoCTM: false,
      DataDoDiario: this.dataSearch,
      Fechado: false,
      HoraDeApresentacao1: '00:00:00',
      HoraDeApresentacao2: '00:00:00',
      HoraDeApresentacao3: '00:00:00',
      HoraDeApresentacao4: '00:00:00',
      Linhas: [],
      PermiteAlteracao: true,
      Refeicao1: '00:00:00',
      Refeicao2: '00:00:00',
      Refeicao3: '00:00:00',
      Refeicao4: '00:00:00',
      Prefixo: {
        PrefixoCompleto: ''
      },
      Procedimentos: []
    };
    for (let index = 0; index < 8; index++) {
      this.diario.diario.Linhas.push({
        Ativo: true,
        Carga: 0,
        Ciclos: 0,
        ConsumoDeCombustivel: 0,
        Corte: '00:00:00',
        Decolagem: '00:00:00',
        DecolagemNoturna: false,
        Diurno: '00:00:00',
        FuelDec: 0,
        FuelPou: 0,
        HorasManutencao: '00:00:00',
        HorasManutencaoDouble: 0,
        HorasTripulante: '00:00:00',
        IFRC: '00:00:00',
        IFRR: '00:00:00',
        Noturno: '00:00:00',
        Partida: '00:00:00',
        Pax: 0,
        PlanoDeManutencao: false,
        Pouso: '00:00:00',
        PousoNoturno: false,
        PousoOffshore: false,
        Pousos: 0,
        QuantidadeAbastecida: 0,
        TemVooIFR: false,
        VooIFR: false
      });

      if (index < 4) {
        const nomes = ['Pouso Offshore', 'Decolagem Offshore', 'Decolagem Onshore', 'Pouso Onshore'];
        this.diario.diario.Procedimentos.push({
          Diurno1p: 0,
          Diurno2p: 0,
          Diurno3p: 0,
          Diurno4p: 0,
          Nome: nomes[index],
          Noturno1p: 0,
          Noturno2p: 0,
          Noturno3p: 0,
          Noturno4p: 0
        });
      }
    }
    this.router.navigate(['/relatorio-voo/novo']);
  }
}
