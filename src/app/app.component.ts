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
    this._location.back();
  }
}
