import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-fadiga',
  templateUrl: './fadiga.component.html',
  styleUrls: ['./fadiga.component.css']
})
export class FadigaComponent implements OnInit {

  public loading = false;
  public data: string;
  public fadigas = [];

  constructor(private app: AppComponent, private api: ApiService) { }

  ngOnInit() {
    this.app.setTitle('Fadiga');
    this.data = new Date().toISOString().split('T')[0];
    this.searchFadiga();
  }

  searchFadiga() {
    this.loading = true;
    this.api.getGerenciaFadiga(this.data).then((response) => {
      this.fadigas = response;
      this.loading = false;
    }).catch(error => {
      this.loading = false;
    });
  }
}
