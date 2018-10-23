import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-papeleta',
  templateUrl: './papeleta.component.html',
  styleUrls: ['./papeleta.component.css']
})
export class PapeletaComponent implements OnInit {

  constructor(private api: ApiService, private app: AppComponent) { }
  private tripulantes;
  private loading = true;
  private diario: any;
  private yearMonth: string;

  ngOnInit(): void {
    this.app.setTitle('Papeleta');
    if (!this.tripulantes) {
      this.tripulantes = this.api.getTripulantes();
      this.loading = false;
    }
    if (!localStorage.getItem('Tripulante')) {
      this.api.getListas(() => {
        this.tripulantes = this.api.getTripulantes();
        this.loading = false;
      });
    }
  }

  showPapeleta(id: string) {
    if (this.yearMonth) {
      this.loading = true;
      const year = this.yearMonth.split('-')[0];
      const month = this.yearMonth.split('-')[1];
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
