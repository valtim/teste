import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  trato: string

  constructor(private data: DataService, private route: Router) { }

  ngOnInit() {
    if (typeof this.data.user === 'undefined') {
      this.route.navigate(['/']);
    } else {
      this.trato = this.data.user.Trato
    }
  }

  onClickFechar() {
    this.data.user = null;
    this.route.navigate(['/']);
  }

}
