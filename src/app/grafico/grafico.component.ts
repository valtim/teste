import { Component, OnInit } from '@angular/core';
import {ChartModule} from 'primeng/chart';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  data: any;
  options : any;

  constructor() {


this.options = {
  responsive: true,
  title: {
      display: true,
      position: "top",
      text: 'anything',
      fontSize: 18,
      fontColor: "#111"
  },
  tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
              label: function(tooltipItems, data) { 
                 var multistringText = [tooltipItems.yLabel];
                     multistringText.push('Another Item');
                     multistringText.push(tooltipItems.index+1);
                     multistringText.push('One more Item');
                  return multistringText;
              }
          }
      },
  legend: {
      display: true,
      position: "bottom",
      labels: {
          fontColor: "#333",
          fontSize: 16
      }
  },
  scales:{
      yAxes:[{
          ticks:{
              min:0

          }
      }]

  }
};

      this.data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
                  label: 'My First dataset',
                  backgroundColor: '#42A5F5',
                  borderColor: '#1E88E5',
                  data: [65, 59, 80, 81, 56, 55, 40]
              },
              // {
              //     label: 'My Second dataset',
              //     backgroundColor: '#9CCC65',
              //     borderColor: '#7CB342',
              //     data: [28, 48, 40, 19, 86, 27, 90]
              // }
          ]
      }

  }

  ngOnInit() {
  }

}
