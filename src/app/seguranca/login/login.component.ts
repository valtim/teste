import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AutorizacaoService } from './../../shared/autorizacao.service';

import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  ehProducao = true;

  constructor(private router: Router, public api: ApiService, private auth: AutorizacaoService) { }
  public username: string;
  public password: string;
  public loading = false;

  jaLogouRemoto = localStorage.length == 4;

  ngOnInit() {
    
    this.api.EhProducao().then(x=>{
      this.ehProducao = x;
      if (localStorage.length == 4) {
        this.loginRemoto();
        return;
      }
      
      if (localStorage.getItem["Authorization"] != null && localStorage.length >= 4)
        return;



    })


    

    //localStorage.clear();
  }

  login() {
    if (this.username && this.password) {
      this.loading = true;
      this.api.postLogin(this.username, this.password)
        .then((x) => {
          // 
          this.api.username = this.username;

          this.api.getCombos().then(
            () => {
              
              this.auth.setAuthorization(x.Authorization);
              this.auth.setRotas(x.Rotas);
              this.auth.setMenus(x.Menu);              
              //this.api.updateAuthorization();


              if (localStorage.getItem('beforeLogin') != null) {
                var url = localStorage.getItem('beforeLogin');
                localStorage.removeItem('beforeLogin');
                this.router.navigate([url]);
                return;
              }
              //this.router.navigateByUrl('/quadro-de-tripulantes')
              this.loading = false;
              this.router.navigate(['home']);                  

            }
          );


          // this.router.navigateByUrl('/quadro-de-tripulantes')


        })
        .catch((error) => {

          console.log(error);

          this.loading = false;
          switch (error.status) {
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
        });
    } else {
      this.api.error = 'Usuário ou senha obrigatórios';
    }
  }

  hideError() {
    this.api.error = '';
  }

  loginRemoto() {

    //this.loadingDisplay = true;
    let login = "";

    for (let i = 0; i < localStorage.length; i++) {
      let item = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (!(item.secret && item.credentialType == "AccessToken"))
        continue;
      login = item.secret;
    }
    console.log(1);
    this.api.postLoginAD(login).then(x => {
      console.log(2);
      localStorage.setItem('Authorization', x.Authorization);
      localStorage.setItem('Rotas', JSON.stringify(x.Rotas));
      localStorage.setItem('Menu', JSON.stringify(x.Menu));
      if (localStorage.getItem('beforeLogin') != null) {
        var url = localStorage.getItem('beforeLogin');
        localStorage.removeItem('beforeLogin');
        window.location.href = url;
        return;
      }
      window.location.href = "/home";

    })
    console.log(3);

  }


}

