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
  private ultimosVoos: any;
  private vencimentoListToSave = [];

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
      this.montarDatas();
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


  montarDatas() {
    const data = {};
    this.tripulantes.forEach(tripulente => {
      this.certificados.forEach(certificado => {
        certificado.Titles.forEach(title => {
          const vencimento = this.getVencimento(tripulente.Id, title.Id);
          if (vencimento.UltimosVoos && vencimento.UltimosVoos.length) {
            data[tripulente.Id + title.Id] = {
              Data: this.getDataVencimento(tripulente.Id, title.Id, certificado.Grupo),
              Voo: vencimento.UltimosVoos
            };
          } else {
            data[tripulente.Id + title.Id] = {
              Data: this.getDataVencimento(tripulente.Id, title.Id, certificado.Grupo),
              Voo: []
            };
          }
        });
      });
    });
    this.ultimosVoos = data;
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
        if (vencimento.NaoAtende) {
          return 'Sem dados';
        }
        return 'Não atende';
      } else {
        return 'n/a';
      }
    }

    return this.formatData(vencimento.DataDeVencimento);
  }

  getVencimento(IdTripulante: string, IdCertificado: string) {
    if (!this.vencimentos) {
      return null;
    }
    return this.vencimentos.filter((element) => {
      return element.Certificado.Id === IdCertificado && element.Tripulante.Id === IdTripulante;
    })[0];
  }

  showPopUp(element) {
    if (element.target.offsetParent && element.target.offsetParent.id === 'Experiência') {
      const div = Array.from(document.getElementById('Experiência').querySelectorAll('.ultimo-voo'))
        .filter((divUltimo: HTMLElement) => {
          return divUltimo.style.display === 'block';
        })[0] as HTMLElement;

      if (element.target.querySelector('.ultimo-voo')) {
        if (element.target.querySelector('.ultimo-voo').style.display === 'none' ||
          element.target.querySelector('.ultimo-voo').style.display === '') {
          if (div) {
            div.style.display = 'none';
          }
          element.target.querySelector('.ultimo-voo').style.display = 'block';
        } else {
          element.target.querySelector('.ultimo-voo').style.display = 'none';
        }
      }
    } else {
      const cell = element.target;
      const vencimento = this.getVencimento(cell.dataset.tripulanteId, cell.dataset.vencimentoId);
      let fp = cell._flatpickr;
      if (!fp) {
        fp = (flatpickr(cell, {
          onChange: (selectedDates, dateStr, instance) => {
            cell.innerText = this.formatData(dateStr + 'T00:00:00');
            vencimento.DataDeVencimento = dateStr + 'T00:00:00';
            vencimento.NaoControlado = false;
            const existVencimentoToSave = !this.vencimentoListToSave || !this.vencimentoListToSave.filter((venc) => {
              return venc.Id === vencimento.Id;
            })[0];
            if (existVencimentoToSave) {
              this.vencimentoListToSave.push(vencimento);
              document.getElementById('salvar').style.fill = '#157dfb';
            }
          },
          onOpen: (selectedDates, dateStr, instance) => {
            if (!instance.calendarContainer.querySelector('button')) {
              const btn = document.createElement('button');
              btn.innerText = 'Cancelar';
              btn.className = 'cancelar';
              btn.onclick = () => {
                vencimento.NaoControlado = true;
                vencimento.DataDeVencimento = null;
                cell.style.backgroundColor = '';
                cell.innerText = 'n/a';
                const existVencimentoToSave = !this.vencimentoListToSave || !this.vencimentoListToSave.filter((venc) => {
                  return venc.Id === vencimento.Id;
                })[0];
                if (existVencimentoToSave) {
                  this.vencimentoListToSave.push(vencimento);
                  document.getElementById('salvar').style.fill = '#157dfb';
                }
                instance.close();
              };
              instance.calendarContainer.appendChild(btn);
            }
          },
          disableMobile: true
        }) as any).toggle();
      } else {
        fp.open();
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
    const vencimento = this.getVencimento(IdTripulante, IdCertificado);

    if (!this.vencimentos || !vencimento.DataDeVencimento) {
      return '';
    }

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

  salvarVencimento() {
    if (this.vencimentoListToSave.length) {
      this.api.postVencimento(this.vencimentoListToSave).then((response) => {
        this.vencimentoListToSave = [];
        document.getElementById('salvar').style.fill = '#000000';
      });
    }
  }
}
