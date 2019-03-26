import { Component, OnInit } from '@angular/core';
import { AutorizacaoService } from '../autorizacao.service';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public loading: boolean;

  constructor(
    private autorizacao: AutorizacaoService,
    private api: ApiService,
    private router: Router) { }

  ngOnInit() {
  }

  isEnable(name: string) {
    return !this.autorizacao.getRotas().includes(name);
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
      localStorage.removeItem('Token');
      localStorage.removeItem('Rotas');
      localStorage.removeItem('Certificado');
      this.loading = false;
      this.router.navigate(['/']);
    });
  }

}
