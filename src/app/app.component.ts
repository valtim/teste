import { Component, OnInit } from "@angular/core";
import { MsalService, MsalBroadcastService } from "@azure/msal-angular";
import { InteractionStatus } from "@azure/msal-browser";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { ApiService } from "./shared/api.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "SOL";
  private readonly _destroying$ = new Subject<void>();
  ExibirLoginLocal = false;

  localhost = window.location.href.indexOf('localhost') > -1 || window.location.href.indexOf('fastapi') > -1;
  usuarioLogado = localStorage.getItem('Authorization') != null;
  paginaDeLogin = window.location.href.indexOf('/login') > -1;
  jaLogouRemoto = false;

  public ExibirBotaoLogin =
    !this.usuarioLogado && !this.paginaDeLogin && !this.jaLogouRemoto;

  constructor(
    private broadcastService: MsalBroadcastService,
    private authService: MsalService,
    private api: ApiService
  ) {}

  sleep(ms): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // async function demo() {
  //     for (let i = 0; i < 5; i++) {
  //         console.log(`Waiting ${i} seconds...`);
  //         await sleep(i * 1000);
  //     }
  //     console.log('Done');
  // }

  ngOnInit() {
    this.sleep(2000).then(() => {
      this.jaLogouRemoto = localStorage.length == 4;

      console.log("pagina de login: " + this.paginaDeLogin);

      console.log(this.ExibirBotaoLogin);

      if (this.usuarioLogado)
        return;

      if (this.localhost && this.paginaDeLogin) return;

      if (
        (this.jaLogouRemoto && !this.paginaDeLogin) ||
        (!this.usuarioLogado && this.localhost && !this.paginaDeLogin)
      ) {
        window.location.href = window.location.origin + "/login";
        return;
      }

      if (this.localhost && this.jaLogouRemoto) return;

      this.ExibirLoginLocal =
        (this.localhost && this.usuarioLogado) || !this.localhost;
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
