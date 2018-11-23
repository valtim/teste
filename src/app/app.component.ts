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

  constructor(private router: Router, private _location: Location) {
  }

  setTitle(title: string) {
    this.title = title;
  }

  backClicked() {
    if (this._location.path() === '/relatorio-voo/editar' || this._location.path() === '/relatorio-voo/novo') {
      this.router.navigate(['/relatorio-voo']);
    }
    if (this._location.path().includes('/tripulante/')) {
      this.router.navigate(['/tripulantes']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
