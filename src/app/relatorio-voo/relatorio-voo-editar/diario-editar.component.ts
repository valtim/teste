import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DiarioService } from '../diario.service';
import { ApiService } from '../../api.service';
import { AppComponent } from 'src/app/app.component';
import { Diario, Linha, Procedimento } from '../model';

@Component({
  selector: 'app-diario-editar',
  templateUrl: './diario-editar.component.html',
  styleUrls: ['./diario-editar.component.css']
})
export class DiarioEditarComponent implements OnInit {

  private dataDiario: Diario = {
    Id: '',
    Ativo: true,
    Linhas: [],
    Fechado: false,
    Cancelada: false,
    ComputadoCTM: false,
    DataDoDiario: '',
    NumeroDaFolha: '',
    Atualizacao: new Date(),
    HoraDeApresentacao1: '',
    HoraDeApresentacao2: '',
    HoraDeApresentacao3: '',
    HoraDeApresentacao4: '',
    NumeroDoDiario: '',
    PermiteAlteracao: true,
    Prefixo: { Id: '', PrefixoCompleto: '' },
    Trip1: { Id: '' },
    Trip2: { Id: '' },
    Trip3: { Id: '' },
    Trip4: { Id: '' },
    Procedimentos: [],
    Validado: false,
    Sincronizacao: new Date(),
    Refeicao1: '',
    Refeicao2: '',
    Refeicao3: '',
    Refeicao4: ''
  };
  private prefixos: any;
  private blocos: any;
  private loading = true;
  private nDiarios: any;
  private tipoDeOperacoes: any;
  private abastecedoras = [];
  private tripulantes: any;
  private funcaoBordos: any;
  private clientes: any;
  private naturezas: any;

  constructor(private app: AppComponent, private route: Router,
    private diario: DiarioService, private api: ApiService, private activatedRoute: ActivatedRoute) {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.api.getDiarioById(this.activatedRoute.snapshot.paramMap.get('id')).then(result => {
        this.blocos = result.Blocos;
        this.dataDiario = result.Diario;
        this.tripulantes = result.Tripulante;
        this.prefixos = result.Prefixo;
        this.tipoDeOperacoes = result.TipoDeOperacao;
        this.abastecedoras = result.Abastecedora;
        this.clientes = result.Cliente;
        this.naturezas = result.Natureza;
        this.funcaoBordos = result.FuncaoBordo;
        this.formatarDiario();
      });
    } else {
      this.prefixos = this.api.getPrefixos();
      this.tipoDeOperacoes = this.api.getTipoDeOperacoes();
      this.abastecedoras = this.api.getAbastecedoras();
      this.api.getTripulantes().then(result => {
        this.tripulantes = result.Tripulantes;
      });
      this.funcaoBordos = this.api.getFuncaoBordos();
      this.clientes = this.api.getClientes();
      this.naturezas = this.api.getNaturezas();
      this.dataDiario.DataDoDiario = this.diario.dataSearch;
      this.dataDiario.Linhas = this.createLinhas();
      this.dataDiario.Procedimentos = this.createProcedimentos();
      this.loading = false;
    }
  }

  ngOnInit() {
    this.app.setVoltar('/relatorio-voo');
  }

  formatarDiario() {
    if (this.dataDiario.Prefixo.Id) {
      this.api.getBloco(this.dataDiario.Prefixo.Id).then(result => {
        this.blocos = result;
      });
    } else {
      this.api.getListaBloco().then(result => {
        this.blocos = result;
      });
    }
    this.montarTripulante();
    this.dataDiario.DataDoDiario = this.formatData(this.dataDiario.DataDoDiario);
    for (let index = 1; index <= 4; index++) {
      this.dataDiario['Refeicao' + index] = this.formatTime(this.dataDiario['Refeicao' + index]);
      this.dataDiario['HoraDeApresentacao' + index] = this.formatTime(this.dataDiario['HoraDeApresentacao' + index]);
    }
    for (let index = 0; index < this.dataDiario.Linhas.length; index++) {
      this.dataDiario.Linhas[index].Partida = this.formatTime(this.dataDiario.Linhas[index].Partida);
      this.dataDiario.Linhas[index].Decolagem = this.formatTime(this.dataDiario.Linhas[index].Decolagem);
      this.dataDiario.Linhas[index].Pouso = this.formatTime(this.dataDiario.Linhas[index].Pouso);
      this.dataDiario.Linhas[index].Corte = this.formatTime(this.dataDiario.Linhas[index].Corte);
      this.dataDiario.Linhas[index].Diurno = this.formatTime(this.dataDiario.Linhas[index].Diurno);
      this.dataDiario.Linhas[index].Noturno = this.formatTime(this.dataDiario.Linhas[index].Noturno);
      this.dataDiario.Linhas[index].IFRC = this.formatTime(this.dataDiario.Linhas[index].IFRC);
      this.dataDiario.Linhas[index].IFRR = this.formatTime(this.dataDiario.Linhas[index].IFRR);
      this.totalLinha(index);
      this.VFR(index);
      this.Diurno(index);
      if (!this.dataDiario.Linhas[index].Abastecedora) {
        this.dataDiario.Linhas[index].Abastecedora = {
          Id: ''
        };
      }
      if (!this.dataDiario.Linhas[index].FuncaoTrip1) {
        this.dataDiario.Linhas[index].FuncaoTrip1 = {
          Id: ''
        };
      }
      if (!this.dataDiario.Linhas[index].FuncaoTrip2) {
        this.dataDiario.Linhas[index].FuncaoTrip2 = {
          Id: ''
        };
      }
      if (!this.dataDiario.Linhas[index].TipoDeOperacao) {
        this.dataDiario.Linhas[index].TipoDeOperacao = {
          Id: ''
        };
      }
      if (!this.dataDiario.Linhas[index].Cliente) {
        this.dataDiario.Linhas[index].Cliente = {
          Id: ''
        };
      }
      if (!this.dataDiario.Linhas[index].Comandante) {
        this.dataDiario.Linhas[index].Comandante = {
          Id: ''
        };
      }
      if (!this.dataDiario.Linhas[index].PrimeiroOficial) {
        this.dataDiario.Linhas[index].PrimeiroOficial = {
          Id: ''
        };
      }
    }
    if (!this.dataDiario.NumeroDoDiario) {
      this.dataDiario.NumeroDoDiario = '';
      this.dataDiario.NumeroDaFolha = '';
    }
    this.loading = false;
  }

  montarTripulante() {
    if (!this.dataDiario.Trip1) {
      this.dataDiario.Trip1 = {
        Id: ''
      };
    }

    if (!this.dataDiario.Trip2) {
      this.dataDiario.Trip2 = {
        Id: ''
      };
    }

    if (!this.dataDiario.Trip3) {
      this.dataDiario.Trip3 = {
        Id: ''
      };
    }

    if (!this.dataDiario.Trip4) {
      this.dataDiario.Trip4 = {
        Id: ''
      };
    }
  }

  formatData(data: string) {
    return data.match(/\d{4}-\d{2}-\d{2}/)[0];
  }

  formatTime(data: string) {
    if (data) {
      return data.match(/\d{2}:\d{2}/)[0];
    }
    return '00:00';
  }

  refeicaoTracker(index) {
    return this.dataDiario['Refeicao' + index];
  }

  sumHours(hour1: string, hour2: string): string {
    let minutos: string | number;
    let hours: string | number;
    minutos = parseInt(hour1.split(':')[1], 10) + parseInt(hour2.split(':')[1], 10);
    hours = parseInt(hour1.split(':')[0], 10) + parseInt(hour2.split(':')[0], 10);
    if (minutos > 59) {
      hours += 1;
      minutos %= 60;
    }
    hours = hours > 9 ? hours : '0' + hours;
    minutos = minutos > 9 ? minutos : '0' + minutos;
    return hours + ':' + minutos;
  }

  Diurno(index: number): string {
    this.dataDiario.Linhas[index].Diurno = this.fewerHours(
      this.dataDiario.Linhas[index].total,
      this.dataDiario.Linhas[index].Noturno);
    return this.dataDiario.Linhas[index].Diurno;
  }

  fewerHours(hour1: string, hour2: string): string {
    let hours = 0;
    let minutos = 0;

    hours = parseInt(hour1.split(':')[0], 10) - parseInt(hour2.split(':')[0], 10);
    minutos = parseInt(hour1.split(':')[1], 10) - parseInt(hour2.split(':')[1], 10);

    if (minutos < 0) {
      minutos = 60 + minutos;
      hours -= 1;
    }

    if (hours < 0) {
      return '00:00';
    }

    const minutosStr = minutos < 10 ? '0' + minutos : minutos;
    const hoursStr = hours < 10 ? '0' + hours : hours;
    return hoursStr + ':' + minutosStr;
  }

  totalLinha(index: number): string {
    // (vDecolagem - vPartida) + (vPouso - vDecolagem) + (vCorte - vPouso)
    let total = this.fewerHours(this.dataDiario.Linhas[index].Decolagem, this.dataDiario.Linhas[index].Partida);
    total = this.sumHours(total, this.fewerHours(this.dataDiario.Linhas[index].Pouso, this.dataDiario.Linhas[index].Decolagem));
    total = this.sumHours(total, this.fewerHours(this.dataDiario.Linhas[index].Corte, this.dataDiario.Linhas[index].Pouso));
    this.dataDiario.Linhas[index].total = total;
    return total;
  }

  getBlocos() {
    const prefixo = this.prefixos.filter((element: any) => {
      return element.PrefixoCompleto === this.dataDiario.Prefixo.PrefixoCompleto;
    })[0];
    this.api.getBloco(prefixo.Id).then(result => {
      this.blocos = result;
    });
  }

  folhaDiario(): Array<Number> {
    if (!this.blocos || this.dataDiario.NumeroDoDiario === '') {
      return [];
    }
    const bloco = this.blocos.filter((element) => {
      return element.Numero === this.dataDiario.NumeroDoDiario;
    })[0];

    const resultado = [];
    for (let index = bloco.FolhaInicial; index <= bloco.FolhaFinal; index++) {
      resultado.push(index);
    }
    return resultado;
  }

  salvarDario() {
    this.refatorarDataDiario();
    console.log(this.dataDiario);
    this.loading = true;
    this.api.postDiarioVoo(this.dataDiario).then(() => {
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  }

  refatorarDataDiario() {
    if (this.dataDiario.Trip1.Id === '') {
      this.dataDiario.Trip1 = null;
    }
    if (this.dataDiario.Trip2.Id === '') {
      this.dataDiario.Trip2 = null;
    }
    if (this.dataDiario.Trip3.Id === '') {
      this.dataDiario.Trip3 = null;
    }
    if (this.dataDiario.Trip4.Id === '') {
      this.dataDiario.Trip4 = null;
    }
    for (let index = 0; index < this.dataDiario.Linhas.length; index++) {
      if (this.dataDiario.Linhas[index].Comandante.Id === '') {
        this.dataDiario.Linhas[index].Comandante = null;
      }
      if (this.dataDiario.Linhas[index].PrimeiroOficial.Id === '') {
        this.dataDiario.Linhas[index].PrimeiroOficial = null;
      }
      if (this.dataDiario.Linhas[index].Cliente.Id === '') {
        this.dataDiario.Linhas[index].Cliente = null;
      }
    }
  }

  totalColunaHora(name: string): string {
    let total = '';
    total = this.sumHours(this.dataDiario.Linhas[0][name], this.dataDiario.Linhas[1][name]);
    for (let index = 2; index < this.dataDiario.Linhas.length; index++) {
      total = this.sumHours(total, this.dataDiario.Linhas[index][name]);
    }
    return total;
  }

  totalColunaNumber(name: string): number {
    let total = 0;
    for (let index = 0; index < this.dataDiario.Linhas.length; index++) {
      if (this.dataDiario.Linhas[index][name]) {
        total += parseInt(this.dataDiario.Linhas[index][name], 10);
      }
    }
    return total;
  }

  VFR(index: number): string {
    this.dataDiario.Linhas[index].vfr = this.fewerHours(
      this.fewerHours(this.dataDiario.Linhas[index].total, this.dataDiario.Linhas[index].IFRR),
      this.dataDiario.Linhas[index].IFRC);
    return this.dataDiario.Linhas[index].vfr;
  }

  totalTotal(): string {
    let total = '';
    total = this.sumHours(
      this.totalLinha(0),
      this.totalLinha(1)
    );
    for (let index = 2; index < this.dataDiario.Linhas.length; index++) {
      total = this.sumHours(total,
        this.totalLinha(index)
      );
    }
    return total;
  }

  createProcedimentos(): Array<Procedimento> {
    const resultProcedimentos: Array<Procedimento> = [];
    if (!this.dataDiario.Procedimentos.length) {
      for (let index = 0; index < 4; index++) {
        resultProcedimentos.push({
          Diurno1p: 0,
          Diurno2p: 0,
          Diurno3p: 0,
          Diurno4p: 0,
          Noturno1p: 0,
          Noturno2p: 0,
          Noturno3p: 0,
          Noturno4p: 0
        });
      }
    }
    return resultProcedimentos;
  }

  createLinhas(): Array<Linha> {
    const resultLinhas: Array<Linha> = [];
    for (let index = 0; index < 8; index++) {
      resultLinhas.push({
        Abastecedora: '',
        AeroportoDeOrigem: '',
        Ativo: true,
        Atualizacao: new Date(),
        Carga: 0,
        Ciclos: 0,
        Cliente: { Id: '' },
        Comandante: { Id: '' },
        ConsumoDeCombustivel: 0,
        Corte: '',
        Decolagem: '',
        DecolagemNoturna: false,
        Destino: '',
        DestinoDeclarado: null,
        DiarioDeBordo: { Id: '' },
        Diurno: this.formatTime(null),
        FuelDec: 0,
        FuelPou: 0,
        FuncaoTrip1: {},
        FuncaoTrip2: {},
        IFRC: this.formatTime(null),
        Id: '',
        IFRR: this.formatTime(null),
        NascerDoSol: new Date(),
        Natureza: {},
        NotaDeAbastecimento: '',
        Noturno: this.formatTime(null),
        OrdemDeExibicao: index,
        Origem: {},
        OrigemDeclarada: '',
        Partida: '',
        Pax: 0,
        PlanoDeManutencao: false,
        PorDoSol: new Date(),
        Pouso: '',
        PousoNoturno: false,
        PousoOffshore: false,
        Pousos: 0,
        PrimeiroOficial: { Id: '' },
        QuantidadeAbastecida: 0,
        Sincronizacao: new Date(),
        TipoDeOperacao: {},
        VooIFR: false,
        total: this.formatTime(null),
        vfr: ''
      });
    }
    return resultLinhas;
  }
}
