import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AppComponent } from '../app.component';
import flatpickr from 'flatpickr';

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
  private calendarOpen = false;

  ngOnInit() {
    this.app.setTitle('Controle de Vencimento');
    this.tripulantes = this.api.getTripulantes();
    if (!localStorage.getItem('Certificado')) {
      this.api.getCertificado().then(result => {
        localStorage.setItem('Certificado', JSON.stringify(result));
        this.montarCertificados(result);
      });
    } else {
      this.montarCertificados(JSON.parse(localStorage.getItem('Certificado')));
    }
    this.api.getVencimento().then(result => {
      this.vencimentos = result;
      this.loading = false;
    });
  }

  montarCertificados(certificados) {
    const novoCertificados = [];
    certificados.forEach(cert => {
      const titles = [];
      const nomeGrupo = cert.Grupo.Nome;
      const grupo = certificados.filter((elemt) => {
        return elemt.Grupo.Nome === nomeGrupo;
      });

      grupo.forEach(element => {
        titles.push({
          Id: element.Id,
          Nome: element.Nome
        });
        const index = certificados.indexOf(element);
        certificados.splice(index, 1);
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

  getDataVencimento(IdTripulante: string, IdCertificado: string, Grupo: string): string {
    if (!this.vencimentos) {
      return '';
    }

    const vencimento = this.getVencimento(IdTripulante, IdCertificado);
    if (!vencimento || !vencimento.DataDeVencimento) {
      if (Grupo === 'Experiência Recente') {
        return 'Não atende';
      } else {
        return 'n/a';
      }
    }

    return this.formatData(vencimento.DataDeVencimento);
  }

  getUltimosVoos(IdTripulante: string, IdCertificado: string) {
    if (!this.vencimentos) {
      return false;
    }

    const vencimento = this.getVencimento(IdTripulante, IdCertificado);
    if (!vencimento || !vencimento.DataDeVencimento) {
      return false;
    }

    return vencimento.UltimosVoos;
  }

  getVencimento(IdTripulante: string, IdCertificado: string) {
    return this.vencimentos.filter((element) => {
      return element.Certificado.Id === IdCertificado && element.Tripulante.Id === IdTripulante;
    })[0];
  }

  showUltimoVoo(element) {
    if (!this.calendarOpen) {
      if (element.target.offsetParent && element.target.offsetParent.id === 'Experiência') {
        const div = Array.from(document.getElementById('Experiência').querySelectorAll('.ultimo-voo'))
          .filter((divUltimo: HTMLElement) => {
            return divUltimo.style.display === 'block';
          })[0] as HTMLElement;
        if (div) {
          div.style.display = 'none';
        }
        if (element.target.querySelector('.ultimo-voo')) {
          if (element.target.querySelector('.ultimo-voo').style.display === 'none' ||
            element.target.querySelector('.ultimo-voo').style.display === '') {
            element.target.querySelector('.ultimo-voo').style.display = 'block';
          } else {
            element.target.querySelector('.ultimo-voo').style.display = 'none';
          }
        }
      } else {
        const cell = element.target;
        (flatpickr(cell, {
          onChange: (selectedDates, dateStr, instance) => {
            cell.innerText = this.formatData(dateStr + 'T00:00:00');
            const vencimento = this.getVencimento(cell.dataset.tripulanteId, cell.dataset.vencimentoId);
            vencimento.DataDeVencimento = dateStr + 'T00:00:00';
          },
          onOpen: () => {
            this.calendarOpen = true;
          },
          onClose: () => {
            this.calendarOpen = false;
          },
          disableMobile: true,
          appendTo: cell,
        }) as any).toggle();
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
    const vencimento = this.getVencimento(IdTripulante, IdCertificado);

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
    if (diasVencimento <= 0 && vencimento.Certificado.DiasAntesDoVencimento >= 15) {
      return '#ff0000';
    }
    return '';
  }
}
