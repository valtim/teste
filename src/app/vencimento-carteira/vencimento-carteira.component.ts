import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-vencimento-carteira',
  templateUrl: './vencimento-carteira.component.html',
  styleUrls: ['./vencimento-carteira.component.css']
})
export class VencimentoCarteiraComponent implements OnInit {

  constructor(private api: ApiService, private app: AppComponent) { }
  private tripulantes: any;
  private certificados: any;
  private vencimentos: any;
  private loading = true;

  ngOnInit() {
    this.app.setTitle('Controle de Vencimento');
    this.tripulantes = this.api.getTripulantes();
    this.api.getCertificado().then(result => {
      this.certificados = result;
      this.montarCertificados();
    });
    this.api.getVencimento().then(result => {
      this.vencimentos = result;
      this.loading = false;
      console.log(this.vencimentos);
    });
  }

  montarCertificados() {
    const novoCertificados = [];
    this.certificados.forEach(cert => {
      const titles = [];
      const nomeGrupo = cert.Grupo.Nome;
      const grupo = this.certificados.filter((elemt) => {
        return elemt.Grupo.Nome === nomeGrupo;
      });

      grupo.forEach(element => {
        titles.push({
          Id: element.Id,
          Nome: element.Nome
        });
        const index = this.certificados.indexOf(element);
        this.certificados.splice(index, 1);
      });

      novoCertificados.push({ Grupo: nomeGrupo, Titles: titles });
    });
    this.certificados = novoCertificados;
  }

  formatData(data: string) {
    const result = new Date(data);
    const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    const month = months[result.getMonth()];
    const days = result.getDate() < 10 ? '0' + result.getDate() : result.getDate();
    return days + '-' + month + '-' + result.getFullYear();
  }

  getDataVencimento(IdTripulante: string, IdCertificado: string): string {
    if (!this.vencimentos) {
      return '';
    }

    const vencimento = this.vencimentos.filter((element) => {
      return element.Certificado.Id === IdCertificado && element.Tripulante.Id === IdTripulante;
    })[0];

    if (!vencimento || !vencimento.DataDeVencimento) {
      return 'n/a';
    }

    return this.formatData(vencimento.DataDeVencimento);
  }

  getUltimosVoos(IdTripulante: string, IdCertificado: string) {
    if (!this.vencimentos) {
      return false;
    }

    const vencimento = this.vencimentos.filter((element) => {
      return element.Certificado.Id === IdCertificado && element.Tripulante.Id === IdTripulante;
    })[0];

    if (!vencimento || !vencimento.DataDeVencimento) {
      return false;
    }

    return vencimento.UltimosVoos;
  }

  showUltimoVoo(element) {
    if (element.target.querySelector('.ultimo-voo')) {
      if (element.target.querySelector('.ultimo-voo').style.display === 'none' ||
        element.target.querySelector('.ultimo-voo').style.display === '') {
        element.target.querySelector('.ultimo-voo').style.display = 'block';
      } else {
        element.target.querySelector('.ultimo-voo').style.display = 'none';
      }
    }
  }

  diffDaysDate(data1: Date, data2: Date): number {
    const timeDiff = data1.getTime() - data2.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDiff;
  }

  colorBackgroundVencimento(IdTripulante: string, IdCertificado: string): string {
    const hoje = new Date();
    if (!this.vencimentos) {
      return '';
    }
    const vencimento = this.vencimentos.filter((element) => {
      return element.Certificado.Id === IdCertificado && element.Tripulante.Id === IdTripulante;
    })[0];

    const diasVencimento = this.diffDaysDate(new Date(vencimento.DataDeVencimento), hoje);
    if (diasVencimento > 30 && diasVencimento <= 60 && vencimento.Certificado.DiasAntesDoVencimento >= 60) {
      return '#bdd6ee';
    }
    if (diasVencimento > 15 && diasVencimento <= 30 && vencimento.Certificado.DiasAntesDoVencimento >= 30) {
      return '#ffff00';
    }
    if (diasVencimento > 0 && diasVencimento <= 15 && vencimento.Certificado.DiasAntesDoVencimento >= 15) {
      return '#f7caac';
    }
    if (diasVencimento < 0 && vencimento.Certificado.DiasAntesDoVencimento >= 15) {
      return '#ff0000';
    }
    return '';
  }
}
