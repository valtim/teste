import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-escala-prevista-diaria',
  templateUrl: './escala-prevista-diaria.component.html',
  styleUrls: ['./escala-prevista-diaria.component.css']
})
export class EscalaPrevistaDiariaComponent implements OnInit {

  loading: boolean;
  dataEscalaTrabalho: string;
  escala: any;
  clientes: any;
  tripulantes: any;
  bases: any;

  constructor(private app: AppComponent, private api: ApiService) {
    this.escala = {
      Coordenador: '',
      Comentario: '',
      ListaDeEmails: '',
      Escalas: []
    };
    this.clientes = [];
  }

  ngOnInit() {
    this.app.setTitle('Escala de Trabalho');
    this.dataEscalaTrabalho = '2018/11/10';
    this.loading = true;

    this.clientes = this.api.getClientes();
    this.tripulantes = this.api.getTripulantes();
    this.api.getBase().then(response => {
      this.bases = response;
      console.log(this.bases);
    });

    this.api.getEscala(this.dataEscalaTrabalho)
      .then((response) => {
        if (response) {
          this.escala = response;
        }
        this.escala.Escalas.forEach(escala => {
          escala.Escalas.forEach(trip => {
            if (!trip.Tripulante) {
              trip.Tripulante = { Id: '' };
            }
          });

          if (!escala.Escalas[1]) {
            escala.Escalas[1] = {
              Tripulante: { Id: '' },
              umeroDoTripulante: 2
            };
          }

          escala.HoraDaApresentacao = escala.HoraDaApresentacao.split('T')[1];
        });
        console.log('Resposta: ', this.escala);
        this.loading = false;
      }).catch(error => {
        console.log('Error: ', error);
        this.loading = false;
      });
  }

}
