import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-escala-trabalho',
  templateUrl: './escala-trabalho.component.html',
  styleUrls: ['./escala-trabalho.component.css']
})
export class EscalaTrabalhoComponent implements OnInit {

  public data: string;
  public loading = false;
  public escalaTrabalhos = [];
  private tripulantes = [];
  private saveEscala = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    // this.app.setTitle('Escala de Trabalho Realizada');
    this.data = new Date().toISOString().split('T')[0];
    this.api.getNTripulanteLista().then((response: any) => {
      this.tripulantes = response;
    }).catch(error => {
      this.api.message = {
        show: true,
        type: 'error',
        title: 'Erro',
        message: error.error.Message
      };
    });
    this.getEscalaRealizada();
  }

  getEscalaRealizada() {
    this.loading = true;
    this.api.getEscalaRealizada(this.data).then((response: any) => {
      this.escalaTrabalhos = response;
      this.escalaTrabalhos.map((escala) => {
        escala.Apresentacao = this.formatTime(escala.Apresentacao);
        escala.Almoco = this.formatTime(escala.Almoco);
        escala.FimAlmoco = this.formatTime(escala.FimAlmoco);
        escala.FimDaJornada = this.formatTime(escala.FimDaJornada);
        escala.TempoAlmoco = this.calcTime(escala.Almoco, escala.FimAlmoco);
      });
      this.loading = false;
    }).catch(error => {
      this.api.message = {
        show: true,
        type: 'error',
        title: 'Erro',
        message: error.error.Message
      };
      this.loading = false;
    });
  }

  setTempoJornada(tempoAlmoco: string, apresentacao: string, fimJornada: string): string {
    return this.calcTime(tempoAlmoco, this.calcTime(apresentacao, fimJornada));
  }

  setTempoRepouso(tempo: string): string {
    const hora = parseInt(tempo.split(':')[0], 10);
    if (hora <= 12) {
      return '12:00';
    } else if (hora <= 15 && hora > 12) {
      return '16:00';
    } else {
      return '24:00';
    }
  }

  getTripulanteById(id: string) {
    return this.tripulantes.filter(tripulante => tripulante.Id === id)[0];
  }

  calcTime(timeStart: string, timeEnd: string): string {
    if (timeStart.split('T')[1]) {
      timeStart = timeStart.split('T')[1];
    }
    if (timeEnd.split('T')[1]) {
      timeEnd = timeEnd.split('T')[1];
    }
    const start = timeStart.split(':').map(t => parseInt(t, 10));
    const end = timeEnd.split(':').map(t => parseInt(t, 10));
    return `${this.formatNumber(end[0] - start[0])}:${this.formatNumber(end[1] - start[1])}`;
  }

  formatTime(date: string): string {
    if (date.split('T').length) {
      return date.split('T')[1].substring(0, 5);
    }
    return date;
  }

  formatNumber(valor: number) {
    return valor > 9 ? valor : '0' + valor;
  }

  novaEscala() {
    const novaEscala = {
      Data: this.data,
      Apresentacao: '00:00',
      Almoco: '00:00',
      FimAlmoco: '00:00',
      FimDaJornada: '00:00',
      Tripulante: { Id: '' },
      SemAlmoco: false,
      Fake: false,
      Tempo7Dias: null,
      Tempo30Dias: '00:00',
      Tempo365Dias: '00:00',
      Ativo: true,
      Atualizacao: new Date(),
      Sincronizacao: new Date()
    };
    this.escalaTrabalhos.unshift(novaEscala);
    this.saveEscala.push(novaEscala);
  }

  addChange(e: any) {
    if (e.target.id) {
      const id = e.target.id;
      if (!this.saveEscala.filter(et => et.Id === id).length) {
        const escala = this.escalaTrabalhos.filter(et => et.Id === id)[0];
        this.saveEscala.push(escala);
      }
    }
  }

  excluir(e: any) {
    const id = e.target.id;
    const escala = this.escalaTrabalhos.filter(et => et.Id === id)[0];

    if (e.target.checked) {
      escala.Ativo = false;
      this.saveEscala.push(escala);
    } else {
      escala.Ativo = true;
      const index = this.saveEscala.indexOf(escala);
      this.saveEscala.splice(index, 1);
    }
  }

  save() {
    if (this.saveEscala.length) {
      this.api.postEscalaRealizada(this.saveEscala).then((result) => {
        this.api.message = {
          show: true,
          type: 'success',
          title: 'Sucesso',
          message: 'Alteração realizadas com sucesso.'
        };
      }).catch((error) => {
        this.api.message = {
          show: true,
          type: 'error',
          title: 'Erro',
          message: error.error.Message
        };
      });
    }
  }

}
