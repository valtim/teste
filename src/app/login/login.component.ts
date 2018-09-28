import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private api: ApiService) { }
  private username: string;
  private password: string;
  private loading = false;
  private error: string;

  ngOnInit() {
  }

  login() {
    if (this.username && this.password) {
      this.loading = true;
      this.api.postLogin(this.username, this.password)
        .then(() => {
          this.loading = false;
          this.router.navigate(['home']);
        })
        .catch((error) => {
          this.error = 'Usuário ou senha incorreto';
          this.loading = false;
        });
    } else {
      this.error = 'Usuário ou senha obrigatórios';
    }
  }

  hideError() {
    this.error = '';
  }

}
