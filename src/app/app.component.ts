import { ApiService } from 'src/app/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public router: Router, public _location: Location, public api: ApiService) {
  }

  public title: string;
  public voltar: string;

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    // this.loading = false;
  }

  setTitle(title: string) {
    this.title = title;
  }

  backClicked() {
<<<<<<< HEAD
    if (this.voltar) {
      this.router.navigate([this.voltar]);
      this.voltar = null;
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
=======
    this._location.back();
>>>>>>> 8eb95fa455e3261d96cdc18dfdfcd9d01a3358a2
  }
}
