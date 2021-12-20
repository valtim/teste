import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  tudoPronto: boolean = true;
  todosOsTrilhos: any;
  turmas: any;
  extras: any;
  resposta: any;
  htmlContent: any;
  emails: any;

  constructor(private api: ApiService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.locale_pt = this.api.getLocale('pt');
    this.data = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
    
    this.api.getClienteLogado().then(x => this.urlLogo = `${this.api.getServer()}assets/img/${x}.png`);
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

    this.api.getEscalaSemanal(this.data)
      .then(x => {
        this.tudoPronto = true;
        this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(x.HTML);
        this.emails = x.emails;
        this.extras = x.Extras;
      })
      .catch(x => {
        this.tudoPronto = true;
        this.messageService.add({ severity: 'error', summary: 'SOL Sistemas', detail: 'Escala não pode ser executada!' });
      })

  }

  email() {
    this.tudoPronto = false;
    this.api.postEscalaSemanal(this.data, this.extras).then(x => {
      this.tudoPronto = true;
      this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Escala Enviada!' });
    });
  }

}
