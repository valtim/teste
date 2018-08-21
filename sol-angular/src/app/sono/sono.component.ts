import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sono',
  templateUrl: './sono.component.html',
  styleUrls: ['./sono.component.css']
})
export class SonoComponent implements OnInit, OnDestroy {

  user: any
  oportunidadeSono: number
  qualidadeSono: number

  constructor(private data: DataService, private route: Router) { }

  ngOnInit() {
    this.user = this.data.user;
    this.oportunidadeSono = this.data.oportunidadeSono;
    this.qualidadeSono = this.data.qualidadeSono;

    if (typeof this.user === 'undefined') {
      this.route.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.data.user = this.user;
    this.data.oportunidadeSono = this.oportunidadeSono;
    this.data.qualidadeSono = this.qualidadeSono;
  }
}
