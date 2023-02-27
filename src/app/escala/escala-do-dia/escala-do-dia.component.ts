import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  extras: any = {
    Data : Date,
    Ativo : Boolean,
  }
  urlLogo: string;


  elaborado;
  divulgado;
  observacoes;

  escalaDoDia: any;

  constructor(private api: ApiService,
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.api.getClienteLogado().then(x => this.urlLogo = `${this.api.getServer()}assets/img/${x}.png`);
    this.locale_pt = this.api.getLocale('pt');
    this.data = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
    this.rodarRelatorio();

  }

  numeroDeColunas = 0;
  colunas = [];

  valorColspan = 1;

  getColunas(numero) {
    this.colunas = [];
    for (let i = 0; i < numero; i++)
      this.colunas.push(`evento`);

    return this.colunas;
  }


  email() {
    this.tudoPronto = false;
    this.api.postEscalaPorEmail(this.data, this.extras).then(x => {
      this.tudoPronto = true;
      this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Escala Enviada!' });
    });
  }

  getPosicao(trato, evento) {
    let retorno = "LHS";
    if ((trato == evento.SIC && evento.PosicaoInvertida) || (trato == evento.PIC && !evento.PosicaoInvertida))
      retorno = "RHS";
    return retorno;
  }

  salvar() {
    this.tudoPronto = false;
    this.api.postEscalaNova(this.extras).then(x => {
      this.tudoPronto = true;
      this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Escala Salva!' });
    });

  }

  rodarRelatorio() {
    this.relatorio = null;
    this.tripulacoes = null;
    this.tudoPronto = false;

    if (!this.data)
      return;

    this.api.getEscalaDiaria(this.data).then(x => {
      this.tudoPronto = true;
      this.escalaDoDia = x.HTML;
      //this.relatorio = x.logs;
      this.tripulacoes = x.Tripulacoes;
      this.todosOsTrilhos = x.TodosOsTrilhos;
      this.turmas = x.Turmas;
      this.extras = x.Extras;
      this.extras.Anexos = [];
      this.getColunas(x.Colunas);
      this.valorColspan = 7 + x.Colunas;
    })
      .catch(x => {
        this.tudoPronto = true;
        this.messageService.add({ severity: 'error', summary: 'SOL Sistemas', detail: 'Escala não pode ser executada!' });
      })

  }

}
