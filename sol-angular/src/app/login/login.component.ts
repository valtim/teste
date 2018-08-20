import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ANAC
  USER

  constructor() {
    this.ANAC = [
      {
        numero: 123456,
        nome: 'aluno 1'
      },
      {
        numero: 321456,
        nome: 'aluno 2'
      },
      {
        numero: 222333,
        nome: 'aluno 3'
      },
      {
        numero: 111222,
        nome: 'aluno 4'
      },
      {
        numero: 111111,
        nome: 'aluno 5'
      }
    ];
  }

  ngOnInit() {
  }

  onChange(event: any) {
    let result = null;
    this.USER = null;
    if (event.target.value.length === 6) {
      result = this.ANAC.filter(function (anac) {
        return anac.numero === Number(event.target.value);
      })[0];
      this.USER = result;
    }
  }

}
