import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-teste-grafico',
  templateUrl: './teste-grafico.component.html',
  styleUrls: ['./teste-grafico.component.css']
})
export class TesteGraficoComponent implements OnInit {


  tripulantes;
  selectedValues : any[] = [];


  hoje = new Date();

  dataIni = new Date();
  dataFim = new Date();

  data: any;

  options: any;
  resultado: any;

  constructor(private api: ApiService) {
    this.dataIni = new Date(this.hoje.getFullYear(), this.hoje.getMonth(), 1);
    this.dataFim = new Date(this.hoje.getFullYear(), this.hoje.getMonth() + 1, 1);
    this.dataFim.setDate(this.dataFim.getDate() - 1);
    this.options = {
      title: {
        display: true,
        text: 'My Title',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  }

  selectData(event) {
    
  }

  ngOnInit(): void {
    this.api.getListaTripulanteCombo().then(x => {
      this.tripulantes = x;
    })

  }


  
  rodarRelatorio() {

    this.data = undefined;
    this.resultado = undefined;

    let filtro = {
      inicio: this.dataIni.toISOString().split('T')[0],
      termino: this.dataFim.toISOString().split('T')[0],
      tripulantes: this.selectedValues.map(x=>x.Id),
    }

    this.api.postAnaliseDeFadiga(filtro).then(x => {
      this.data = x.data;
      this.resultado = x.resultado;
    })
  }

}
