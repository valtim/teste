import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';
import { AutorizacaoService } from '../shared/autorizacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public urlLogo: string;
  public exibir = false;
  public menu = [];

  public loading: boolean;

  constructor(
    private router: Router,
    private autorizacao: AutorizacaoService) { }

   ngOnInit() {    

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
}
