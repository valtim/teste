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
    // this.data = {
    //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //   datasets: [
    //     {
    //       label: 'First Dataset',
    //       data: [65, 59, 80, 81, 56, 55, 40],
    //       fill: false,
    //       borderColor: '#42A5F5'
    //     },
    //     {
    //       label: 'Vermelho',
    //       data: [70, 70, 70, 70, 70, 70, 70],
    //       fill: true,
    //       borderColor: 'red',
    //       backgroundColor: 'red'
    //     },
    //     {
    //       label: 'Amarelo',
    //       data: [80, 80, 80, 80, 80, 80, 80],
    //       fill: true,
    //       borderColor: 'yellow',
    //       backgroundColor: 'yellow'
    //     },
    //     {
    //       label: 'Laranja',
    //       data: [85, 85, 85, 85, 85, 85, 85],
    //       fill: true,
    //       borderColor: 'orange',
    //       backgroundColor: 'orange'
    //     },
    //   ]
    // }

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
    //event.dataset = Selected dataset
    //event.element = Selected element
    //event.element._datasetIndex = Index of the dataset in data
    //event.element._index = Index of the data in dataset
  }

  ngOnInit(): void {
    this.api.getListaTripulanteCombo().then(x => {
      this.tripulantes = x;
    })

  }


  
  rodarRelatorio() {

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
