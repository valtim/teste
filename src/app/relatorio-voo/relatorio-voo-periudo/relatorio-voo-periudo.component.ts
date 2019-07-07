import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { DiarioService } from '../diario.service';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-relatorio-voo-periudo',
  templateUrl: './relatorio-voo-periudo.component.html',
  styleUrls: ['./relatorio-voo-periudo.component.css']
})
export class RelatorioVooPeriudoComponent implements OnInit {

  constructor(
    private appComponent: AppComponent,
    private api: ApiService,
    private router: Router,
    private diario: DiarioService) { }

  public loading = true;
  public prefixos = [];
  public fechado = false;
  public dataInicio: Date;
  public dataFim: Date;
  public plataforma: Array<string>;
  public relatorios: Array<any>;

  ngOnInit() {
    this.appComponent.setTitle('Relatório de Voo por Período');
    this.prefixos = this.api.getPrefixos();
    this.loading = false;
  }

  pesquisar() {
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

  novoRelatorioVoo() {
    this.router.navigate(['/relatorio-voo/novo']);
  }
}
