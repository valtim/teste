import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from '../api.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vencimento-carteira',
  templateUrl: './vencimento-carteira.component.html',
  styleUrls: ['./vencimento-carteira.component.css']
})
export class VencimentoCarteiraComponent implements OnInit {

  constructor(private api: ApiService
    , private app: AppComponent
    , private router: Router) { }

  public tripulantes: any;
  public certificados: any;
  public vencimentos: any;
  public loading = true;
  public ultimosVoos: any;
  public vencimentoListToSave = [];

  readonly DATE_FMT = 'dd/MMM/yyyy';

  ngOnInit() {

    this.app.setTitle('FOR-OPE-011 - Quadro de Tripulantes');
    this.api.getTripulantes().then(result => {
      console.log('result: ', result);
      this.tripulantes = result.Tripulantes;
      this.vencimentos = result.Vencimentos;
      this.montarCertificados(result.Certificados);
      this.montarDatas();
      this.loading = false;
    });

    // this.api.getVencimento().then(result => {
    //   this.vencimentos = result;
    //   this.loading = false;
    //   this.montarDatas();
    // });
  }

  onClickDiario(diario: any) {
    const texto = diario.NumeroDoDiario.split('/').join('-');
    const link = `/relatorio-voo/${texto}/${diario.NumeroDaFolha}`;
    this.router.navigate([]).then(result => {  window.open(link, '_blank'); });
    // this.router.navigate([`/relatorio-voo/${texto}/${diario.NumeroDaFolha}`]);
  }

  montarCertificados(certificados: Array<any>) {
    const novoCertificados = [];
    while (certificados.length) {
      const titles = [];
      const nomeGrupo = certificados[0].Grupo.Nome;
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
    }
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

  getDataVencimento(IdTripulante: string, IdCertificado: string, Grupo: string): string {
    if (!this.vencimentos) {
      return '';
    }

    const vencimento = this.getVencimento(IdTripulante, IdCertificado);
    if (vencimento.NaoControlado) {
      return 'n/a';
    }

    if (!vencimento.DataDeVencimento) {
      if (vencimento.Certificado.Grupo.Id === '54d12aff-307b-4299-956b-5be9f114868e') {
        if (vencimento.NaoAtende) {
          return 'Sem dados';
        }
        return `${vencimento.UltimosVoos.length} Ocorrência(s)`;
      }
    }
    // return vencimento.DataDeVencimento;
    return vencimento.DataDeVencimento;
  }

  getVencimento(IdTripulante: string, IdCertificado: string) {
    if (!this.vencimentos) {
      return null;
    }
    return this.vencimentos.filter(({ Certificado, Tripulante }) => {
      return Certificado.Id === IdCertificado && Tripulante.Id === IdTripulante;
    })[0];
  }

  showPopUp({ target }) {

    this.someTudo();

    if (target.offsetParent && target.offsetParent.id === 'Experiência') {
      const div = Array.from(document.getElementById('Experiência').querySelectorAll('.ultimo-voo'))
        .filter((divUltimo: HTMLElement) => {
          return divUltimo.style.display === 'block';
        })[0] as HTMLElement;

      if (div) {
        div.style.display = 'none';
      }

      if (target.querySelector('.ultimo-voo')) {
        if (target.querySelector('.ultimo-voo').style.display === 'none' ||
          target.querySelector('.ultimo-voo').style.display === '') {
          target.querySelector('.ultimo-voo').style.display = 'block';
        } else {
          target.querySelector('.ultimo-voo').style.display = 'none';
        }
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
    const { DataDeVencimento } = this.getVencimento(IdTripulante, IdCertificado);

    if (!DataDeVencimento) {
      return '';
    }

    const diasVencimento = this.diffDaysDate(new Date(DataDeVencimento), hoje);
    if (diasVencimento > 30 && diasVencimento <= 60) {
      return '#bdd6ee';
    }
    if (diasVencimento > 15 && diasVencimento <= 30) {
      return '#ffff00';
    }
    if (diasVencimento > 0 && diasVencimento <= 15) {
      return '#f7caac';
    }
    if (diasVencimento <= 0) {
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


  someTudo() {
    Array.from(document.querySelectorAll('.ultimo-voo')).forEach(function (divUltimo: HTMLElement) {
      divUltimo.style.display = 'none';
    });
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if ( event.target.tagName !== 'TD' ) {
      this.someTudo();
    }
  }

  exportExcel() {
    const html = document.querySelector('.table-response');
    const result = html.cloneNode(true) as HTMLElement;
    // Array.from(result.querySelector('#cursos').querySelectorAll('td.flatpickr-input')).forEach(function (element: HTMLElement) {
    //   element.removeChild(element.lastChild);
    //   element.innerHTML = element.innerText;
    // });
    Array.from(result.querySelectorAll('.ultimo-voo')).forEach(function (element) {
      element.remove();
    });
    const tabela = result.querySelectorAll('table')[0];
    Array.from(result.querySelectorAll('table')).forEach(function (element, index) {
      if (index !== 0) {
        Array.from(element.querySelector('thead').querySelector('tr').querySelectorAll('td')).forEach(function (td) {
          tabela.querySelector('thead').querySelector('tr').appendChild(td);
        });
        Array.from(element.querySelector('thead').querySelectorAll('tr')[1].querySelectorAll('td')).forEach(function (td) {
          tabela.querySelector('thead').querySelectorAll('tr')[1].appendChild(td);
        });
        Array.from(element.querySelector('tbody').querySelectorAll('tr')).forEach(function (row, i) {
          Array.from(row.querySelectorAll('td')).forEach(function (cell) {
            tabela.querySelector('tbody').querySelectorAll('tr')[i].appendChild(cell);
          });
        });
      }
    });
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"'
      + 'xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><?xml version="1.0" encoding="UTF-8" standalone="yes"?'
      + '><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}'
      + '</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>'
      + '</x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
    const base64 = function (s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    };
    const format = function (s, c) {
      return s.replace(/{(\w+)}/g, function (m, p) {
        return c[p];
      });
    };
    const ctx = {
      worksheet: name || '',
      table: result.innerHTML
    };
    window.open(uri + base64(format(template, ctx)));
  }
}
