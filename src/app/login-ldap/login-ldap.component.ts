import { Component } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login-ldap',
  templateUrl: './login-ldap.component.html',
  styleUrls: ['./login-ldap.component.css']
})
export class LoginLdapComponent {

  private readonly _destroying$ = new Subject<void>();
  ExibirLoginLocal = false;

  constructor(
    private broadcastService: MsalBroadcastService,
    private authService: MsalService    
  ) { }

  sleep(ms): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  usuarioLogado = false;
  localhost = false;
  ExibirBotaoLogin = false;

  ngOnInit() {
    console.log('entrou ldap');
    this.sleep(2000).then(() => {


      var localhost = window.location.href.indexOf('localhost') > -1;
      var usuarioLogado = localStorage.getItem('Authorization') != null;
      var paginaDeLogin = window.location.href.indexOf('/login') > -1;
      var logouLDAP = localStorage.length >= 4;

      this.ExibirBotaoLogin =
        !usuarioLogado && !paginaDeLogin && !localhost && !logouLDAP;

      console.log("pagina de login: " + this);

      console.log(this.ExibirBotaoLogin);

      if (usuarioLogado)
      {        
        window.location.href = window.location.origin + "/home";
        return;
      }

      if (localhost && paginaDeLogin) return;

      if (this.ExibirBotaoLogin)
        return;

      if (
        (!paginaDeLogin) ||
        (!usuarioLogado && localhost && !paginaDeLogin)
      ) {
        window.location.href = window.location.origin + "/login";
        return;
      }

      if (localhost) return;

      this.ExibirLoginLocal =
        (localhost && usuarioLogado) || !localhost;
      this.broadcastService.inProgress$
        .pipe(
          filter(
            (status: InteractionStatus) => status === InteractionStatus.None
          ),
          takeUntil(this._destroying$)
        )
        .subscribe(() => {
          this.setLoginDisplay();
        });
    });
  }

  login() {
    this.authService.loginRedirect();
  }

  setLoginDisplay() {
    this.usuarioLogado = localStorage.getItem("Authorization") != null;

    if (!this.localhost) return;

    if (window.location.href != window.location.origin + "/")
      window.location.href = window.location.origin;
  }

}
