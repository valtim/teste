import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-papeleta',
  templateUrl: './papeleta.component.html',
  styleUrls: ['./papeleta.component.css']
})
export class PapeletaComponent implements OnInit {

  constructor(private api: ApiService) { }
  private tripulantes;
  private loading = true;

  ngOnInit() {
    this.api.getTripulantes()
      .then((result) => {
        this.tripulantes = result;
        this.loading = false;
      }).catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  showPapeleta(id) {
    console.log('Click', id);
  }
}
