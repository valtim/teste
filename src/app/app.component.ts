import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title: string;
  public voltar: string;

  constructor(public router: Router, public _location: Location) {
  }

  setTitle(title: string) {
    this.title = title;
  }

  setVoltar(voltar: string) {
    this.voltar = voltar;
  }

  backClicked() {
    if (this.voltar) {
      this.router.navigate([this.voltar]);
    } else {
      if (this._location.path() === '/relatorio-voo/editar' ||
        this._location.path() === '/relatorio-voo/novo') {
        this.router.navigate(['/relatorio-voo']);
      }
      if (this._location.path().includes('/tripulante/')) {
        this.router.navigate(['/tripulantes']);
      } else {
        this.router.navigate(['/home']);
      }
    }
  }
}
