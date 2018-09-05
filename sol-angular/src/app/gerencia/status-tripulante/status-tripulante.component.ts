import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { InfoTripulanteService } from '../infoTripulante.service';

@Component({
  selector: 'app-status-tripulante',
  templateUrl: './status-tripulante.component.html',
  styleUrls: ['./status-tripulante.component.css']
})
export class StatusTripulanteComponent implements OnInit, OnDestroy {

  constructor(private http: HttpClient, private route: Router, private info: InfoTripulanteService) { }
  private data: Date;
  private tripulantes: any;

  ngOnInit() {
    if (this.info.tripulantes) {
      this.tripulantes = this.info.tripulantes;
    }
  }

  onBuscarTripulante() {
    this.http.get('/api/pesquisa/pordata/' + this.data).subscribe((response) => {
      this.tripulantes = response;
    });
  }

  showInfoTripulante(tripulante) {
    this.info.tripulante = tripulante;
    this.route.navigate(['/gerencia/info-tripulante']);
  }

  ngOnDestroy() {
    this.info.tripulantes = this.tripulantes;
  }
}
