import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-tripulante',
  templateUrl: './tripulanteLista.component.html',
  styleUrls: ['./tripulanteLista.component.css']
})
export class TripulanteListaComponent implements OnInit {

  constructor(private app: AppComponent, private api: ApiService) {
    this.app.setTitle('Tripulante');
  }

  tripulantes: Array<any>;
  tripulantesFilter: Array<any>;
  nome = '';
  trato = '';
  anac = '';
  loading = true;

  ngOnInit() {
    this.api.getNTripulanteLista().then(response => {
      this.tripulantesFilter = this.tripulantes = response;
      this.loading = false;
    });
  }

  search() {
    this.tripulantes = this.tripulantesFilter.filter((trip) => {
      if (!this.nome && !this.trato && !this.anac) {
        return true;
      }
      return this.trato && trip.Trato.toLowerCase().includes(this.trato.toLowerCase()) ||
        this.nome && trip.NomeCompleto.toLowerCase().includes(this.nome.toLowerCase()) ||
        this.anac && trip.CodigoANAC.toString().includes(this.anac);
    });
  }

  saveTripulante() {
    console.log(this.tripulantesFilter);
  }

}
