import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AutorizacaoService } from '../autorizacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public urlLogo : string;
  public exibir : boolean = false;

  public loading: boolean;

  constructor(
    private app: AppComponent,
    private api: ApiService,
    private router: Router,
    private autorizacao: AutorizacaoService) { }

  async ngOnInit() {
    this.app.setTitle('SOL Sistemas');
    // if (!this.api.getPermission()) {
    //   this.loading = true;
    //   this.api.getMenuPermission();
    // }
    this.api.getClienteLogado().then(result => {      
      this.urlLogo = `assets/img/${result}.png`;
      this.exibir = true;
    });
  }

  isEnable(name: string) {
    return !this.autorizacao.getRotas().includes(name);
  }
}
