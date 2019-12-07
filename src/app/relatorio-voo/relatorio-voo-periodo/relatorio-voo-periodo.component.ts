import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { DiarioService } from '../diario.service';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-relatorio-voo-periodo',
  templateUrl: './relatorio-voo-periodo.component.html',
  styleUrls: ['./relatorio-voo-periodo.component.css']
})
export class RelatorioVooPeriodoComponent implements OnInit {

  constructor(
    // private appComponent: AppComponent,
    private api: ApiService,
    private router: Router,
    private diario: DiarioService) { }

  public loading = true;
  public prefixos = [];
  public fechado = true;
  public dataInicio = new Date(new Date().getFullYear(), new Date().getDay() - 7, new Date().getDate()).toISOString().split('T')[0];
  public dataFim = new Date().toISOString().split('T')[0];
  public plataforma: Array<string> = [];
  public relatorios: Array<any>;

  ngOnInit() {
    // this.appComponent.setTitle('Relatório de Voo por Período');
    this.prefixos = this.api.getPrefixos();
    this.plataforma = [];
    this.loading = false;
    //this.dataIniciosetDate( this.dataInicio.getDate() - 7 );


    

    var data = new Date();
    data.setDate(data.getDate() - 7);

    this.dataInicio = data.toISOString().split('T')[0];

    //console.log(data.toISOString().split('T')[0]);


    //console.log("asdlkasjkldjalkjdklasjdljka");


    this.pesquisar();


  }

  pesquisar() {
    if (this.dataInicio && this.dataFim) {
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


  onClickDiario(diario: any) {
    if ( diario.Bloqueado )
      this.router.navigate([`/relatorio-voo-bloqueado/${diario.Id}`]);
    else
      this.router.navigate([`/relatorio-voo/${diario.Id}`]);
  }
  
  novoRelatorioVoo() {
    this.router.navigate(['/relatorio-voo/novo']);
  }
}
