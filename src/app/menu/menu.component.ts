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

  public menuOperacoes : boolean = false;
  public menuEscalas : boolean = false;
  public menuCadastrosBasicos : boolean = false;
  public menuFadiga : boolean = false;
  public menuFerramentas : boolean = true;

  constructor(
    private autorizacao: AutorizacaoService,
    private api: ApiService,
    private router: Router) { }

  ngOnInit() {
    this.api.getListasPMS()
      .then(result => {         
          localStorage.setItem('Abastecedora', JSON.stringify(result.Abastecedora));
          localStorage.setItem('Cliente', JSON.stringify(result.Cliente));
          localStorage.setItem('FuncaoBordo', JSON.stringify(result.FuncaoBordo));
          localStorage.setItem('Natureza', JSON.stringify(result.Natureza));
          localStorage.setItem('Prefixo', JSON.stringify(result.Prefixo));
          localStorage.setItem('TipoDeOperacao', JSON.stringify(result.TipoDeOperacao));
          localStorage.setItem('TipoDeProcedimento', JSON.stringify(result.TipoDeProcedimento));
          localStorage.setItem('Tripulante', JSON.stringify(result.Tripulante));
          console.log('ok');
          this.checarMenu();
       });
  }

  checarMenu(){
    this.menuOperacoes = this.isEnable('relatorio-voo') || this.isEnable('relatorio-voo-periodo') || this.isEnable('vencimento-carteira') || this.isEnable('papeleta') || this.isEnable('relatorio-pagamento');
    this.menuEscalas = this.isEnable('escala-prevista') || this.isEnable('escala-trabalho');
    this.menuCadastrosBasicos = this.isEnable('tripulantes') || this.isEnable('usuario') || this.isEnable('bloco') || this.isEnable('localidade') || this.isEnable('certificado');
    this.menuFadiga = this.isEnable('fadiga') || this.isEnable('tipo-pergunta') || this.isEnable('pergunta');
  }

  isEnable(name: string) {
    return this.autorizacao.getRotas().includes(name);
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
