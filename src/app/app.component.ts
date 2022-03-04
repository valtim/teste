import { Component, OnInit, OnDestroy } from '@angular/core';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'msal-angular-tutorial';
  isIframe = false;
  loginDisplay = false;
  loadingDisplay = false;
  private readonly _destroying$ = new Subject<void>();
  ExibirLoginLocal: any;

  constructor(private broadcastService: MsalBroadcastService, private authService: MsalService, private api: ApiService) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

    this.ExibirLoginLocal = (!this.api.EhProducao && localStorage.getItem('Authorization') == null);

    if (this.ExibirLoginLocal && window.location.href.indexOf('login') > -1)
      return;

    if (this.ExibirLoginLocal) {
      window.location.href = window.location.origin + '/login';
      return;
    }


    this.broadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      })
  }

  login() {
    this.authService.loginRedirect();
  }

  setLoginDisplay() {

    if (this.authService.instance.getAllAccounts().length > 0 && !localStorage.getItem('Authorization')) {
      this.loadingDisplay = true;
      let login = "";


      for (let i = 0; i < localStorage.length; i++) {
        let item = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if (!(item.secret && item.credentialType == "AccessToken"))
          continue;
        login = item.secret;
      }

      this.api.postLoginAD(login).then(x => {
        // this.api.setBearer(x.Authorization);
        //localStorage.clear();
        localStorage.setItem('Authorization', x.Authorization);
        localStorage.setItem('Rotas', JSON.stringify(x.Rotas));
        localStorage.setItem('Menu', JSON.stringify(x.Menu));
        this.loadingDisplay = false;
        this.loginDisplay = true;
        if (localStorage.getItem('beforeLogin') != null) {
          var url = localStorage.getItem('beforeLogin');
          localStorage.removeItem('beforeLogin');
          window.location.href = url;
          return;
        }

        window.location.href = "/";

      })
    }

    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0 && localStorage.getItem('Authorization') != null;


    if (this.loginDisplay)
      return;


    if (window.location.href != window.location.origin + '/')
      window.location.href = window.location.origin;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
