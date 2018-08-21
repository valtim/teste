import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  anac
  user

  constructor(private data: DataService) {
    this.anac = [
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

  ngOnDestroy() {
    this.data.user = this.user;
  }

  onChange(event: any) {
    let result = null;
    this.user = null;
    if (event.target.value.length === 6) {
      result = this.anac.filter(function (anac) {
        return anac.numero === Number(event.target.value);
      })[0];
      this.user = result;
    }
  }

}
