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
    this.tripulantesFilter = this.tripulantes = [];
    this.api.getNTripulanteLista().then(response => {
      this.tripulantesFilter = this.tripulantes = response;
      this.tripulantesFilter = this.tripulantesFilter.map(tripulante => {
        tripulante.Excluir = !tripulante.Ativo;
        return tripulante;
      });
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

  private listaTripulantesParaExcluir() {
    return this.tripulantesFilter.filter(tripulante => tripulante.Excluir);
  }

  enableBtnSave(): boolean {
    return this.listaTripulantesParaExcluir().length > 0;
  }

  saveTripulante() {
    const nomes = [];
    const tripulantesParaEscluir = this.listaTripulantesParaExcluir().map((tripu) => {
      tripu.Ativo = !tripu.Excluir;
      return tripu;
    });
    this.listaTripulantesParaExcluir().forEach((tripulante) => {
      nomes.push(tripulante.Trato);
    });
    this.api.message = {
      show: true,
      type: 'alert',
      title: 'Tem certeza?',
      message: 'Você deseja deletar o(s) tripulante(s): ' + nomes.join(', '),
      callBack() {
        this.api.postNTripulantes(tripulantesParaEscluir)
          .then((response) => {
            console.log(response);
          }).catch((erro) => {
            console.log(erro);
          });
      }
    };
  }

}
