import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiGenericoService } from 'src/app/shared/api.generico.service';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-email-escala',
  templateUrl: './email-escala.component.html',
  styleUrls: ['./email-escala.component.css'],
  providers: [MessageService]
})
export class EmailEscalaComponent implements OnInit {
  tripulantes: any;
  carregando: boolean = true;
  selectedValues;
  dataIni;
  dataFim;
  hoje: Date = new Date();

  html;

  ngOnInit(): void {
    this.api.GetListasPick("tripulante")
      .then(x => {
        this.tripulantes = x.tripulante;
        this.carregando = false;
      })
      .catch(() => this.messageService.add({ severity: 'warning', summary: 'SOL Sistemas', detail: 'Erro ao carregar tripulantes' }));
    //this.rodarRelatorio();
  }

  constructor(private api: ApiService,
    private messageService: MessageService) {


    this.dataIni = new Date(this.hoje.getFullYear(), this.hoje.getMonth() + 1, 1);
    this.dataFim = new Date(this.hoje.getFullYear(), this.hoje.getMonth() + 2, 1);
    this.dataFim.setDate(this.dataFim.getDate() - 1);
  }

  rodarRelatorio(email: boolean = false) {
    this.carregando = true;
    this.html = undefined;
    var filtro = { ini: this.dataIni, fim: this.dataFim, tripulantes: this.selectedValues, email }
    this.api.emailEscalaMensal(filtro).then(x => {
      this.carregando = false;
      if ( email){
        this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'emails enviados' })
        return;
      }
        
      this.html = x.html;

      this.carregando = false;
      // var win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=1024,height=768,top=0,left=0");
      // win.document.body.innerHTML = x.html;
    })
      .catch((e) => {
        this.carregando = false;
        this.messageService.add({ severity: 'warning', summary: 'SOL Sistemas', detail: 'Erro ao carregar tripulantes' })
      });
  }

}
