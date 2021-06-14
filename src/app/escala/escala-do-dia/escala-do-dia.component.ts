import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/shared/api.service';


@Component({
  selector: 'app-escala-do-dia',
  templateUrl: './escala-do-dia.component.html',
  styleUrls: ['./escala-do-dia.component.css'],
  providers: [MessageService]
})
export class EscalaDoDiaComponent implements OnInit {
  tudoPronto: any;
  data: Date;
  locale_pt: any;
  relatorio: any;
  tripulacoes: any;
  todosOsTrilhos: any;
  turmas: any;
  extras: any;
  urlLogo: string;


  constructor(private api: ApiService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.locale_pt = this.api.getLocale('pt');
    this.data = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
    this.rodarRelatorio();

    this.urlLogo = this.api.getLogo();
  }

  numeroDeColunas = 0;
  colunas = [];

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

    this.api.getEscalaDiaria(this.data).then(x => {
      this.tudoPronto = true;
      //this.relatorio = x.logs;
      this.tripulacoes = x.Tripulacoes;
      this.todosOsTrilhos = x.todosOsTrilhos;
      this.turmas = x.turmas;
      this.extras = x.extras;
      this.getColunas(x.colunas);
    })
    .catch(x=>{
      this.tudoPronto = true;
      this.messageService.add({ severity: 'error', summary: 'SOL Sistemas', detail: 'Escala não pode ser executada!' });
    })

  }

}
