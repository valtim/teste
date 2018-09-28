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

  constructor(private app: AppComponent, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.app.setTitle('Sol');
    this.api.getListas();
  }

  logoff(): void {
    this.api.getLogoff().then((result) => {
      console.log('result', result);
      localStorage.removeItem('Abastecedora');
      localStorage.removeItem('Cliente');
      localStorage.removeItem('FuncaoBordo');
      localStorage.removeItem('Natureza');
      localStorage.removeItem('Prefixo');
      localStorage.removeItem('TipoDeOperacao');
      localStorage.removeItem('TipoDeProcedimento');
      localStorage.removeItem('Tripulante');
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    });
  }
}
