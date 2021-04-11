import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ApiService } from './shared/api.service';
import { AutorizacaoService } from './shared/autorizacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public urlLogo: string;
  public exibir = true;
  clienteLogado = "teste";
  public menu = [];

  public loading: boolean;

  exibirmenu(){
    this.exibir = !this.exibir;
  }
  
  constructor(
    private api: ApiService,
    private router: Router,
    private autorizacao: AutorizacaoService) { }

  ngOnInit() {

    this.urlLogo = this.api.getLogo();
    this.menu = this.autorizacao.getMenus();
    this.exibir = true;
  }

  isEnable(name: string) {
    return this.autorizacao.getRotas().includes(name);
  }

  logoff(): void {
    this.loading = true;
    localStorage.clear();
    this.loading = false;
    this.router.navigate(['/']);
  }


  title = 'sol';
}
