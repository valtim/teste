import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiarioService } from '../diario.service';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-diario-editar',
  templateUrl: './diario-editar.component.html',
  styleUrls: ['./diario-editar.component.css']
})
export class DiarioEditarComponent implements OnInit {

  constructor(
    private route: Router,
    private diario: DiarioService,
    private api: ApiService) { }

  public dataDiario: any;
  public prefixos: any;
  public blocos: any;
  nDiarios: any;
  tipoDeOperacoes: any;
  abastecedoras: any;
  tripulantes: any;
  funcaoBordos: any;
  clientes: any;
  naturezas: any;

  ngOnInit() {
    if (!this.diario.diario) {
      this.route.navigate(['/relatorio-voo']);
    }

    this.dataDiario = this.diario.diario;

    if (this.dataDiario) {
      if (this.dataDiario.Prefixo.Id) {
        this.api.getBloco(this.dataDiario.Prefixo.Id).then(result => {
          this.blocos = result;
        });
      }

      if (!this.dataDiario.Trip1) {
        this.dataDiario.Trip1 = {};
        this.dataDiario.Trip1.Trato = '';
      }
      if (!this.dataDiario.Trip2) {
        this.dataDiario.Trip2 = {};
        this.dataDiario.Trip2.Trato = '';
      }
      if (!this.dataDiario.Trip3) {
        this.dataDiario.Trip3 = {};
        this.dataDiario.Trip3.Trato = '';
      }
      if (!this.dataDiario.Trip4) {
        this.dataDiario.Trip4 = {};
        this.dataDiario.Trip4.Trato = '';
      }

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

        if (!this.dataDiario.Linhas[index].Cliente) {
          this.dataDiario.Linhas[index].Cliente = {};
        }
        if (!this.dataDiario.Linhas[index].Comandante) {
          this.dataDiario.Linhas[index].Comandante = {};
        }
      }

      if (!this.dataDiario.NumeroDoDiario) {
        this.dataDiario.NumeroDoDiario = '';
        this.dataDiario.NumeroDaFolha = '';
      }

      this.prefixos = this.api.getProfixos();
      this.tipoDeOperacoes = this.api.getTipoDeOperacoes();
      this.abastecedoras = this.api.getAbastecedoras();
      this.tripulantes = this.api.getTripulantes();
      this.funcaoBordos = this.api.getFuncaoBordos();
      this.clientes = this.api.getClientes();
      this.naturezas = this.api.getNaturezas();
      console.log('dataDiario: ', this.dataDiario);
    }
  }

  formatData(data: string) {
    return data.match(/\d{4}-\d{2}-\d{2}/)[0];
  }

  formatTime(data: string) {
    if (!data) {
      return '00:00';
    }
    return data.match(/\d{2}:\d{2}/)[0];
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
    console.log(this.dataDiario);
    this.api.postDiarioVoo(this.dataDiario);
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
}
