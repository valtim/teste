import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ReporteService } from '../reporte.service';

@Component({
  selector: 'app-reporte-voluntario',
  templateUrl: './reporte-voluntario.component.html',
  styleUrls: ['./reporte-voluntario.component.css']
})
export class ReporteVoluntarioComponent implements OnInit, OnDestroy {

  intervecao

  constructor(private route: Router, private reporte: ReporteService) { }

  ngOnInit() {
    if (this.reporte.intervecao) {
      this.intervecao = this.reporte.intervecao;
    }
  }

  onClickProximo() {
    this.route.navigate(['/contribuiram-fadiga']);
  }

  ngOnDestroy() {
    this.reporte.intervecao = this.intervecao;
  }
}
