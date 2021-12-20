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

  constructor(private broadcastService: MsalBroadcastService, private authService: MsalService, private api: ApiService) { }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;

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

    if (this.authService.instance.getAllAccounts().length > 0 && !localStorage.getItem('Authorization'))
    {
      this.loadingDisplay = true;
      this.api.postLoginAD(this.authService.instance.getAllAccounts()[0].username).then(x => {
        // this.api.setBearer(x.Authorization);
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
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
