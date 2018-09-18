import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { DiarioService } from '../diario.service';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-diario-bordo',
  templateUrl: './diario-bordo.component.html',
  styleUrls: ['./diario-bordo.component.css']
})
export class DiarioBordoComponent implements OnInit {

  constructor(
    private appComponent: AppComponent,
    private api: ApiService,
    private router: Router,
    private diario: DiarioService) { }


  private loading = true;
  private diarios;

  dataSearch: string;
  ngOnInit() {
    this.appComponent.setTitle('Diário de Bordo');
    this.dataSearch = new Date().toISOString().split('T')[0];

    this.api.getDiarioByDate(this.dataSearch).then((data) => {
      this.diarios = data;
      this.loading = false;
    }).catch((error) => {
      // TODO: erro mensagem
      this.loading = false;
    });
  }

  onChangeDate() {
    this.loading = true;
    this.api.getDiarioByDate(this.dataSearch).then((data) => {
      this.diarios = data;
      this.loading = false;
    }).catch((error) => {
      this.loading = false;
    });
  }

  onClickDiario(diario: any) {
    this.diario.diario = diario;
    this.router.navigate(['/diario-bordo/editar']);
  }
}
