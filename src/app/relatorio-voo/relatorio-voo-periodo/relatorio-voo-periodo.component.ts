import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { DiarioService } from '../diario.service';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-relatorio-voo-periodo',
  templateUrl: './relatorio-voo-periodo.component.html',
  styleUrls: ['./relatorio-voo-periodo.component.css']
})
export class RelatorioVooPeriodoComponent implements OnInit {

  constructor(
    private appComponent: AppComponent,
    private api: ApiService,
    private router: Router,
    private diario: DiarioService) { }

  public loading = true;
  public prefixos = [];
  public fechado = false;
  public dataInicio = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate()).toISOString().split('T')[0];
  public dataFim = new Date().toISOString().split('T')[0];
  public plataforma: Array<string>;
  public relatorios: Array<any>;

  ngOnInit() {
    this.appComponent.setTitle('Relatório de Voo por Período');
    this.prefixos = this.api.getPrefixos();
    this.loading = false;
  }

  pesquisar() {
    if (this.dataInicio && this.dataFim && this.plataforma && this.plataforma.length > 0) {
      this.loading = true;
      this.api.getRelatorioVooPesquisa(this.fechado, this.dataInicio, this.dataFim, this.plataforma.join(',')).then((result: any) => {
        this.relatorios = result;
        this.loading = false;
      }).catch(error => {
        this.loading = false;
        this.api.message = {
          show: true,
          type: 'error',
          title: 'Erro',
          message: 'Problemas no servidor.'
        };
      });
    }
  }

  novoRelatorioVoo() {
    this.router.navigate(['/relatorio-voo/novo']);
  }
}
