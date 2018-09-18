import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private title: string;

  constructor(private router: Router, private _location: Location) {
  }

  setTitle(title: string) {
    this.title = title;
  }

  backClicked() {
    if (this._location.path() === '/diario-bordo/editar') {
      this.router.navigate(['/diario-bordo']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
