import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-grafico',
    templateUrl: './grafico.component.html',
    styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {
    options: any;
    data: any;

    constructor() {

        // this.data = {
        //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        //     datasets: [
        //         {
        //             label: 'First Dataset',
        //             data: [65, 59, 80, 81, 56, 55, 40]
        //         },
        //         {
        //             label: 'Second Dataset',
        //             data: [28, 48, 40, 19, 86, 27, 90]
        //         }
        //     ]
        // }

        // this.options = {
        //     title: {
        //         display: true,
        //         text: 'My Title',
        //         fontSize: 16
        //     },
        //     legend: {
        //         position: 'bottom'
        //     }
        // };

    }

    ngOnInit(): void {

    }

}
