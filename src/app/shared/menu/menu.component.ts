import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { AutorizacaoService } from '../autorizacao.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public urlLogo: string;
  clienteLogado = "teste";
  public menu = [];

  public loading: boolean;


  @Input() exibir = false;


  exibirmenu(e) {
    this.exibir = !this.exibir;
  }
  constructor(
    private api: ApiService,
    private router: Router,
    private autorizacao: AutorizacaoService) { }

  ngOnInit() {
    this.urlLogo = this.api.getLogo();
    this.menu = this.autorizacao.getMenus();
    this.exibir = this.router.url === '/home';
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

}
