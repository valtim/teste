import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  anac
  user

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'token': '24bdd443-0570-40cc-bcde-b3edc401f49f'
    })
  };

  constructor(private data: DataService, private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://teste.sistemasol.com.br/api/tripulante', this.httpOptions).subscribe(data => {
      this.anac = data;
    });
  }

  ngOnDestroy() {
    this.data.user = this.user;
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
    let input = document.querySelector('input');
    input.value = '';
    input.focus();
  }

}
