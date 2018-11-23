import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-tripulante',
  templateUrl: './tripulante.component.html',
  styleUrls: ['./tripulante.component.css']
})
export class TripulanteComponent implements OnInit {

  tripulante: any;
  loading: boolean;
  bases: [{ Id: '', Nome: '' }];
  template: string;
  cargos: [{ Id: '', Nome: '' }];

  constructor(
    private route: ActivatedRoute,
    private app: AppComponent,
    private api: ApiService
  ) {

  }

  ngOnInit() {
    this.template = 'dados-pessoais';
    this.loading = true;
    this.api.getBase().then((resp) => {
      this.bases = resp;
    });
    this.api.getNTripulante(this.route.snapshot.paramMap.get('id')).then((resp) => {
      this.tripulante = resp;
      this.tripulante.Nascimento = this.tripulante.Nascimento.split('T')[0];
      this.tripulante.Admissao = this.tripulante.Admissao.split('T')[0];
      console.log(this.tripulante);
      this.app.setTitle('Tripulante - ' + this.tripulante.Trato);
      this.loading = false;
    });
  }

  onClickTabs(name: string) {
    this.template = name;
    console.log(this.template);
  }
}
