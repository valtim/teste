import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-tripulante',
  templateUrl: './tripulante.component.html',
  styleUrls: ['./tripulante.component.css']
})
export class TripulanteComponent implements OnInit {

  constructor(private app: AppComponent, private api: ApiService) {
    this.app.setTitle('Tripulante');
  }

  tripulantes: Array<any>;

  ngOnInit() {
    this.api.getNTripulante().then(response => {
      this.tripulantes = response;
      console.log(this.tripulantes);
    });
  }

}
