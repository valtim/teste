import { AutorizacaoService } from './../../shared/autorizacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public api: ApiService, private auth: AutorizacaoService) { }
  public username: string;
  public password: string;
  public loading = false;

  ngOnInit() {
    localStorage.clear();
  }

  login() {
    if (this.username && this.password) {
      this.loading = true;
      this.api.postLogin(this.username, this.password)
        .then((x) => {
          this.loading = false;
          this.api.username = this.username;
          



          this.auth.setAuthorization(x.Authorization);
          this.auth.setRotas(x.Rotas);
          this.api.updateAuthorization();
          

          if ( localStorage.getItem('beforeLogin') != null ){
            var url = localStorage.getItem('beforeLogin');
            localStorage.removeItem('beforeLogin');
              this.router.navigate([url]);
              return;
          }



          this.router.navigate(['home']);

        })
        .catch((error) => {

          switch ( error.status ) {
            case 0:
              this.api.error = 'Não foi possível acessar o servidor';
              break;

            case 403:
              this.api.error = 'Usuário ou senha incorretos';
              break;

            default:
              this.api.error = 'Não foi possível acessar o servidor';
              break;
          }
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
