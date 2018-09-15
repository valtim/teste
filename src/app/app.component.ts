import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private title: string;

  constructor(private router: Router) {
    this.router = router;
  }

  setTitle(title: string) {
    this.title = title;
  }
}
