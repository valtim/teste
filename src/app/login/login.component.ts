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

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.api.postLogin(this.username, this.password)
      .then(() => {
        this.loading = false;
        this.router.navigate(['home']);
      })
      .catch((error) => {
        this.loading = false;
      });
  }

}
