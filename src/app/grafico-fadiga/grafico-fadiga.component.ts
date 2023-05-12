import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-grafico-fadiga',
  templateUrl: './grafico-fadiga.component.html',
  styleUrls: ['./grafico-fadiga.component.css'],
  providers: [MessageService]
})
export class GraficoFadigaComponent implements OnInit {


  chartOptions = {
    plugins: {
      legend: {
        display: false
      }
    }
  };

  tripulantes;
  selectedValues: any[] = [];


  hoje = new Date();

  dataIni = new Date();
  dataFim = new Date();

  data: any;

  options: any;
  resultado: any;
  carregando: boolean;

  fadigaSelecionada: any;

  constructor(private api: ApiService,
    private messageService: MessageService) {
    this.dataIni = new Date(this.hoje.getFullYear(), this.hoje.getMonth(), 1);
    this.dataFim = new Date(this.hoje.getFullYear(), this.hoje.getMonth() + 1, 1);
    this.dataFim.setDate(this.dataFim.getDate() - 1);
    this.options = {
      title: {
        display: true,
        text: 'Fadiga',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  }

  selectData(event) {
    this.fadigaSelecionada = this.data.datasets[event.element.datasetIndex];
  }

  ngOnInit(): void {
    this.rodarRelatorio();
  }



  rodarRelatorio() {

    this.carregando = true;
    this.data = undefined;
    this.resultado = undefined;
    this.fadigaSelecionada = undefined;

    try {
      this.api.getAnaliseDeFadiga(this.dataIni, this.dataFim).then(x => {
        this.data = x.data;
        this.resultado = x.resultado;
        this.carregando = false;
      })

    }
    catch {
      this.messageService.add({ severity: 'warning', summary: 'SOL Sistemas', detail: 'Não foi possível carregar a fadiga, entre em contato com o suporte.' });
      this.carregando = false;
    }

  }

}
