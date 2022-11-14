import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from "primeng/api";
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-gerenciar-tripulantes',
  templateUrl: './gerenciar-tripulantes.component.html',
  styleUrls: ['./gerenciar-tripulantes.component.css'],
  providers: [MessageService]
})
export class GerenciarTripulantesComponent implements OnInit {

  carregando;
  locale_pt;
  tripulantes;
  cacheTripulantes;
  colunas;
  exibirDialogo;
  tripulanteSelecionado;

  filtro;
  bolinhaCinza;
  bolinhaVermelha;
  bolinhaAmarela;
  bolinhaVerde;

  constructor(private api: ApiService, private router: Router, private messageService: MessageService) {
    this.locale_pt = this.api.getLocale('pt');
  }

  ngOnInit(): void {
    this.carregando = true;
    this.colunas = ['Trato', 'ANAC', 'Status', 'Ações'];
    this.filtro = '';
    this.exibirDialogo = false;
    this.tripulanteSelecionado = null;    

    this.obterTripulantesDoServidor();
  }

  obterTripulantesDoServidor(): void {
    this.api.getTripulantes().then(tripulantes => {
      this.carregando = false;
      this.cacheTripulantes = tripulantes.map(t => ({ ...t, Cor: (t.Bolinha != null) ? t.Bolinha : 'cinza' }));
      this.tripulantes = this.cacheTripulantes;      
    });
  }

  filtrarTripulantes(): void {
    this.tripulantes = this.cacheTripulantes.filter(
      t => (t.Trato.includes(this.filtro) || String(t.CodigoANAC).includes(this.filtro)) &&
      ( (this.bolinhaCinza && t.Cor == 'cinza') || !this.bolinhaCinza ) &&
      ( (this.bolinhaVermelha && t.Cor == 'vermelha') || !this.bolinhaVermelha ) &&
      ( (this.bolinhaAmarela && t.Cor == 'amarela') || !this.bolinhaAmarela ) &&
      ( (this.bolinhaVerde && t.Cor == 'verde') || !this.bolinhaVerde )
    );
  }

  filtrar(e) {
    this.filtrarTripulantes();
  }

  filtrarBolinhas() {
    this.filtrarTripulantes();
  }

  exibirDialogoExclusao(tripulante): void {
    this.exibirDialogo = true;
    this.tripulanteSelecionado = tripulante;
  }

  ocultarDialogoExclusao(): void {
    this.exibirDialogo = false;    
  }

  excluirTripulante(): void {
    this.ocultarDialogoExclusao();
    this.carregando = true;

    this.tripulanteSelecionado.Ativo = false;

    this.api.postNTripulantes([this.tripulanteSelecionado]).then(x => {      
      
      this.obterTripulantesDoServidor();
      this.filtrarTripulantes();

      this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Excluído com sucesso!' });
    
      this.tripulanteSelecionado = null;
      this.carregando = false;      
    }).catch((x) => {
      console.error(x);
      this.messageService.add({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao excluir o Tripulante!",
      });
    });
  }

  tratoTripulanteSelecionado(): String {
    return this.tripulanteSelecionado == null ? '' : this.tripulanteSelecionado.Trato;
  }

}
