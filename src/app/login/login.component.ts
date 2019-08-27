import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public api: ApiService) { }
  public username: string;
  public password: string;
  public loading = false;

  ngOnInit() {
  }

  login() {
    if (this.username && this.password) {
      this.loading = true;
      this.api.postLogin(this.username, this.password)
        .then(() => {
          this.loading = false;
          this.api.username = this.username;
          this.router.navigate(['home']);
        })
        .catch((error) => {
          this.api.error = 'Usuário ou senha incorreto';
          this.loading = false;
        });
    } else {
      this.api.error = 'Usuário ou senha obrigatórios';
    }
  }

  hideError() {
    this.api.error = '';
  }

}
