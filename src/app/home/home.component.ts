import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private loading: boolean;

  constructor(private app: AppComponent, private api: ApiService, private router: Router) { }

  async ngOnInit() {
    this.app.setTitle('Sol');
    if (!this.api.getPermission()) {
      this.loading = true;
      this.api.getMenuPermission();
    }
    this.api.getListas(() => { });
    this.loading = false;
  }

  logoff(): void {
    this.loading = true;
    this.api.getLogoff().then((result) => {
      localStorage.removeItem('Abastecedora');
      localStorage.removeItem('Cliente');
      localStorage.removeItem('FuncaoBordo');
      localStorage.removeItem('Natureza');
      localStorage.removeItem('Prefixo');
      localStorage.removeItem('TipoDeOperacao');
      localStorage.removeItem('TipoDeProcedimento');
      localStorage.removeItem('Tripulante');
      localStorage.removeItem('token');
      localStorage.removeItem('Certificado');
      this.loading = false;
      this.router.navigate(['/']);
    });
  }
}
