import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/shared/api.service';
import { AutorizacaoService } from 'src/app/shared/autorizacao.service';
import { MenuItem } from 'primeng/api';
import { TurmaStatusComponent } from '../turma-status/turma-status.component';
import { Turma } from 'src/app/models/Turma';
import { ApiTurmasService } from 'src/app/shared/api.turmas.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  private autorizacao: AutorizacaoService;
  items: MenuItem[];
  calendario: [{
    'label': '',
    'turmas': Turma[]
  }];
  mensagem: string = 'Carregando cursos...';
  usuarioLogado: any;

  constructor(private api: ApiTurmasService, private auth: AutorizacaoService) {
    this.autorizacao = auth;
    this.calendario = [{
      'label': '',
      'turmas': []
    }];
  }

  obterMes(data) {
    const meses = [
      'JAN',
      'FEV',
      'MAR',
      'ABR',
      'MAI',
      'JUN',
      'JUL',
      'AGO',
      'SET',
      'OUT',
      'NOV',
      'DEZ'
    ];
    if ((data != null) && (data != undefined) && (data != '')) {
      let mes = parseInt(data.split("/")[1]);
      return meses[mes - 1];
    } else {
      return ''
    }
  }

  formatarData(data) {
    if ((data != null) && (data != undefined) && (data != '') && (data != '0001-01-01T00:00:00')) {

      let dataStr = '';
      if (data instanceof Date) {
        dataStr = data.toISOString().split("T")[0];
      } else {
        dataStr = data.split("T")[0];
      }

      return dataStr.split("-")[2] + '/' + dataStr.split("-")[1] + '/' + dataStr.split("-")[0];
    }
    return 'Data não informada!'
  }

  ngOnInit(): void {
    this.api.getUsuarioLogadoComPermissoes(resp => {
      this.usuarioLogado = resp;

      this.api.getTurmasPorUsuario().then(x => {

        if (x.Turmas.length == 0) {
          this.mensagem = 'Não há turmas registradas!';
        }

        x.Turmas.forEach((turma, index) => {
          turma.indexStatus = 'index' + index;
          turma.dataFormatada = this.formatarData(turma.DataDeInicio);
          turma.Carregada = true;
          turma.mes = this.obterMes(turma.dataFormatada);
          turma.indexMes = this.calendario.length - 1;
          if (this.calendario[0]['label'] == '') {
            this.calendario[turma.indexMes]['label'] = turma.mes;
            this.calendario[turma.indexMes]['turmas'].push(turma);
          } else if ((this.calendario.length > 0) && (this.calendario[turma.indexMes]['label'] == turma.mes)) {
            this.calendario[turma.indexMes]['turmas'].push(turma);
          } else {
            this.calendario.push({
              'label': turma.mes,
              'turmas': [turma]
            });
          }

          if (index == (x.Turmas.length - 1)) {
            // Esta mensagem só aparece se não houver turmas          
            this.mensagem = 'Não há turmas registradas!';
          }
        });

      });

    });

  }

}
