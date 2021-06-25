import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
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


  elaborado;
  divulgado;
  observacoes;



  @ViewChild('escala') escala: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  constructor(private api: ApiService,
    private messageService: MessageService) { }

  ngOnInit(): void {



    this.api.getClienteLogado().then(x=> this.urlLogo = `${this.api.getServer()}assets/img/${x}.png`);
    this.locale_pt = this.api.getLocale('pt');
    this.data = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
    this.rodarRelatorio();

  }


  imprimir(){
    

    html2canvas(this.escala.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('file/png');
      this.downloadLink.nativeElement.download = 'marble-diagram.png';
      this.downloadLink.nativeElement.click();
    });

    
    alert(this.escala.nativeElement.innerHTML);

    this.api.postEscalaNova(this.extras).then(x=>{

    })
    
    print();



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
      this.valorColspan = 7 + x.colunas;
    })
    .catch(x=>{
      this.tudoPronto = true;
      this.messageService.add({ severity: 'error', summary: 'SOL Sistemas', detail: 'Escala não pode ser executada!' });
    })

  }

}
