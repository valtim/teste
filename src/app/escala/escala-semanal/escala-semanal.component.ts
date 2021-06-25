import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-escala-semanal',
  templateUrl: './escala-semanal.component.html',
  styleUrls: ['./escala-semanal.component.css'],
  providers: [MessageService]
})
export class EscalaSemanalComponent implements OnInit {
  locale_pt: any;
  data: Date;
  urlLogo: string;
  colunas: any[];
  relatorio: any;
  tripulacoes: any;
  tudoPronto: boolean;
  todosOsTrilhos: any;
  turmas: any;
  extras: any;
  resposta: any;

  constructor(private api: ApiService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.locale_pt = this.api.getLocale('pt');
    this.data = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
    this.rodarRelatorio();

    this.api.getClienteLogado().then(x=> this.urlLogo = `${this.api.getServer()}assets/img/${x}.png`);
  }

  getColunas(numero) {
    this.colunas = [];
    for (let i = 0; i < numero; i++)
      this.colunas.push(`evento`);

    return this.colunas;
  }

  rodarRelatorio() {
    this.relatorio = null;
    this.tripulacoes = null;
    this.tudoPronto = false;

    this.api.getEscalaSemanal(this.data).then(x => {
      this.tudoPronto = true;
      this.resposta = x.resposta;
      //this.tripulacoes = x.Tripulacoes;
      this.todosOsTrilhos = x.todosOsTrilhos;
      this.getColunas(x.colunas);
    })
      .catch(x => {
        this.tudoPronto = true;
        this.messageService.add({ severity: 'error', summary: 'SOL Sistemas', detail: 'Escala não pode ser executada!' });
      })

  }

}
