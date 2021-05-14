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

  constructor(private api: ApiService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.locale_pt = this.api.getLocale('pt');
    this.data = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
    this.rodarRelatorio();
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
      //this.relatorio = x.logs;
      this.tripulacoes = x.Tripulacoes;
      this.getColunas(x.colunas);
      this.tudoPronto = true;
    })

  }

}
