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

  constructor(private route: Router, private diario: DiarioService, private api: ApiService) { }

  dataDiario: any;
  linha = 0;
  prefixos: any;
  nDiarios: any;
  tipoDeOperacoes: any;
  abastecedoras: any;
  tripulantes: any;
  funcaoBordos: any;
  clientes: any;
  naturezas: any;

  ngOnInit() {
    // if (!this.diario.diario) {
    //   this.route.navigate(['/diario-bordo']);
    // }
    this.dataDiario = this.diario.diario;
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

  changeLine(linha: number) {
    this.linha = linha;
  }

  sumHours(hour1: string, hour2: string): string {
    let minutos: string | number;
    let hours: string | number;
    minutos = parseInt(hour1.split(':')[1], 10) + parseInt(hour2.split(':')[1], 10);
    hours = parseInt(hour1.split(':')[0], 10) + parseInt(hour2.split(':')[0], 10);
    if (minutos > 59) {
      hours += (minutos % 60);
      minutos /= 60;
    }

    hours = hours > 9 ? hours : '0' + hours;
    minutos = minutos > 9 ? minutos : '0' + minutos;
    return hours + ':' + minutos;
  }

  fewerHours(hour1: string, hour2: string): string {
    let hours = 0;
    let minutos = 0;
    if (parseInt(hour1.split(':')[0], 10) >= parseInt(hour2.split(':')[0], 10)) {
      hours = parseInt(hour1.split(':')[0], 10) - parseInt(hour2.split(':')[0], 10);
      minutos = parseInt(hour1.split(':')[1], 10) - parseInt(hour2.split(':')[1], 10);
    } else {
      hours = parseInt(hour2.split(':')[0], 10) - parseInt(hour1.split(':')[0], 10);
      minutos = parseInt(hour2.split(':')[1], 10) - parseInt(hour1.split(':')[1], 10);
    }

    if (minutos < 0) {
      minutos = 60 + minutos;
      hours -= 1;
    }
    return hours + ':' + minutos;
  }

  totalLinha(Decolagem: string, Partida: string, Pouso: string, Corte: string): string {
    // (vDecolagem - vPartida) + (vPouso - vDecolagem) + (vCorte - vPouso)
    let total = this.fewerHours(Decolagem, Partida);
    total = this.sumHours(total, this.fewerHours(Pouso, Decolagem));
    total = this.sumHours(total, this.fewerHours(Corte, Pouso));
    return total;
  }
}
