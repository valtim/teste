import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { PesquisaService } from '../pesquisa.service';

@Component({
  selector: 'app-sono',
  templateUrl: './sono.component.html',
  styleUrls: ['./sono.component.css']
})
export class SonoComponent implements OnInit, OnDestroy {

  user: any;
  oportunidadeSono: number;
  qualidadeSono: number;
  quantidadeSono: number;

  constructor(private data: DataService, private pesquisa: PesquisaService, private route: Router) { }

  ngOnInit() {
    this.user = this.data.user;
    this.oportunidadeSono = this.pesquisa.oportunidadeSono;
    this.qualidadeSono = this.pesquisa.qualidadeSono;
    this.quantidadeSono = this.pesquisa.quantidadeSono;

    if (this.user === undefined) {
      this.route.navigate(['/']);
    }
  }

  onChangeQualidadeSono(e) {
    if (!(this.oportunidadeSono && this.oportunidadeSono >= Number(e.target.value))) {
      e.target.checked = false;
      this.quantidadeSono = null;
    }
  }

  onChangeOportunidade(e) {
    if (this.quantidadeSono > Number(e.target.value)) {
      this.quantidadeSono = null;
    }
  }

  onClickProximo() {
    if (this.user && this.oportunidadeSono && this.qualidadeSono && this.quantidadeSono) {
      this.route.navigate(['/questionario']);
    }
  }

  ngOnDestroy() {
    this.data.user = this.user;
    this.pesquisa.oportunidadeSono = this.oportunidadeSono;
    this.pesquisa.qualidadeSono = this.qualidadeSono;
    this.pesquisa.quantidadeSono = this.quantidadeSono;
  }
}
