import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-diario-bordo',
  templateUrl: './diario-bordo.component.html',
  styleUrls: ['./diario-bordo.component.css']
})
export class DiarioBordoComponent implements OnInit {

  constructor(private appComponent: AppComponent, private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': 'c2cf44fd-a828-4274-8125-26a574e36b46'
    })
  };

  private loading = true;
  private diarios;

  dataSearch: string;
  ngOnInit() {
    this.appComponent.setTitle('Diário de Bordo');
    this.dataSearch = new Date().toISOString().split('T')[0];

    this.http.get('https://teste.sistemasol.com.br/api/novodiario/' + this.dataSearch, this.httpOptions)
      .subscribe((data) => {
        this.diarios = data;
        this.loading = false;
      });
  }

  onChangeDate() {
    this.loading = true;
    this.http.get('https://teste.sistemasol.com.br/api/novodiario/' + this.dataSearch, this.httpOptions)
      .subscribe((data) => {
        this.diarios = data;
        this.loading = false;
      });
  }
}
