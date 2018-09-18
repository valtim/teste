import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DiarioService } from '../diario.service';

@Component({
  selector: 'app-diario-editar',
  templateUrl: './diario-editar.component.html',
  styleUrls: ['./diario-editar.component.css']
})
export class DiarioEditarComponent implements OnInit {

  constructor(private route: Router, private diario: DiarioService) { }

  dataDiario: any;
  linha = 0;

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
    for (let index = 0; index < 8; index++) {
      this.dataDiario.Linhas[index].Partida = this.formatTime(this.dataDiario.Linhas[index].Partida);
      // this.dataDiario.Linhas[index].Partida = '00:0' + index;
      this.dataDiario.Linhas[index].Decolagem = this.formatTime(this.dataDiario.Linhas[index].Decolagem);
      this.dataDiario.Linhas[index].Pouso = this.formatTime(this.dataDiario.Linhas[index].Pouso);
      this.dataDiario.Linhas[index].Corte = this.formatTime(this.dataDiario.Linhas[index].Corte);
      this.dataDiario.Linhas[index].Diurno = this.formatTime(this.dataDiario.Linhas[index].Diurno);
      this.dataDiario.Linhas[index].Noturno = this.formatTime(this.dataDiario.Linhas[index].Noturno);
      this.dataDiario.Linhas[index].IFRC = this.formatTime(this.dataDiario.Linhas[index].IFRC);
      this.dataDiario.Linhas[index].IFRR = this.formatTime(this.dataDiario.Linhas[index].IFRR);
    }
    console.log('Diario: ', this.diario.diario);
  }

  formatData(data: string) {
    return data.split('T')[0];
  }

  formatTime(data: string) {
    if (!data) {
      return '00:00';
    }
    let time: any = data.split('T')[1];
    time = time.split(':');
    time.splice(2, 1);
    time = time.join(':');
    return time;
  }

  refeicaoTracker(index) {
    return this.dataDiario['Refeicao' + index];
  }

  changeLine(linha: number) {
    this.linha = linha;
  }

  onScroll(e) {
    console.log(e.target.value);
    console.log(this.dataDiario.Refeicao1);
  }
}
