import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
// import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-papeleta',
  templateUrl: './papeleta.component.html',
  styleUrls: ['./papeleta.component.css']
})
export class PapeletaComponent implements OnInit {

  constructor(private api: ApiService) { }
  public tripulantes = [];
  public diario: any;
  public loading = true;
  public yearMonth: string;
  public dataDoDia: string;

  ngOnInit(): void {
    // this.app.setTitle('Papeleta');
    this.api.getTripulantes().then(response => {
      this.tripulantes = response.Tripulantes;
      this.loading = false;
    });
  }

  showPapeleta(id: string) {
    if (this.yearMonth) {
      this.loading = true;
      const year = this.yearMonth.split('-')[0];
      const month = this.yearMonth.split('-')[1];
      // const day = this.yearMonth.split('-')[2];

      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1; // January is 0!
      const yyyy = today.getFullYear();

      this.dataDoDia = dd + '/' + mm + '/' + yyyy;

      this.api.getDiarioTripulante(id, month, year)
        .then((data) => {
          this.diario = data;
          this.loading = false;
        }).catch((error) => {
          this.loading = false;
        });
    }
  }
}
