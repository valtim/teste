import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  anac;
  user;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': '24bdd443-0570-40cc-bcde-b3edc401f49f'
    })
  };

  constructor(private data: DataService, private http: HttpClient, private route: Router) { }

  ngOnInit() {
    const URL = this.data.getURL();
    if (this.data.reporte === undefined) {
      this.route.navigate(['/']);
    } else {
      this.http.get(URL + 'api/tripulante', this.httpOptions).subscribe(data => {
        this.anac = data;
      });
    }
  }

  ngOnDestroy() {
    this.data.user = this.user;
    this.data.reporte = this.data.reporte;
  }

  onChange(event: any) {
    let result = null;
    this.user = null;
    if (event.target.value.length === 6) {
      result = this.anac.filter(function (anac) {
        return anac.CodigoANAC === Number(event.target.value);
      })[0];
      this.user = result;
    }
  }

  onClickNao() {
    this.user = null;
    const input = document.querySelector('input');
    input.value = '';
    input.focus();
  }

  onClickSim() {
    if (this.data.reporte) {
      this.route.navigate(['/reporte-voluntario']);
    } else {
      this.route.navigate(['/sono']);
    }
  }

}
