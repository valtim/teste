import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from "primeng/api";
import { ApiService } from 'src/app/shared/api.service';
import { v4 as uuidv4 } from 'uuid';

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
  exibirEdicao;
  tripulanteSelecionado;

  filtro;
  bolinhaCinza = true;
  bolinhaVermelha = true;
  bolinhaAmarela = true;
  bolinhaVerde = true;

  botaoExcluir = false;
  tripulantesMarcadosCheckbox = [];

  constructor(private api: ApiService, private router: Router, private messageService: MessageService) {
    this.locale_pt = this.api.getLocale('pt');
  }

  ngOnInit(): void {
    this.carregando = true;
    this.colunas = ['','Trato', 'ANAC', 'Matrícula', 'Email', 'Status'];
    this.filtro = '';
    this.exibirDialogo = false;
    this.exibirEdicao = false;
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
    if ((this.cacheTripulantes != undefined) && (this.cacheTripulantes != null)) {
      this.tripulantes = this.cacheTripulantes.filter(
        t => (
            t.Trato.toUpperCase().includes(this.filtro.toUpperCase()) || 
            String(t.CodigoANAC).includes(this.filtro) ||
            String(t.Matricula).includes(this.filtro)
          ) &&
        ( (!this.bolinhaCinza && t.Cor != 'cinza') || this.bolinhaCinza ) &&
        ( (!this.bolinhaVermelha && t.Cor != 'vermelha') || this.bolinhaVermelha ) &&
        ( (!this.bolinhaAmarela && t.Cor != 'amarela') || this.bolinhaAmarela ) &&
        ( (!this.bolinhaVerde && t.Cor != 'verde') || this.bolinhaVerde )
      );
    }
  }

  filtrar(e) {
    this.filtrarTripulantes();
  }

  filtrarBolinhas() {
    this.filtrarTripulantes();
  }

  exibirDialogoExclusao(): void {
    this.exibirDialogo = true;
  }

  marcarCheckboxTripulante(evento,tripulante): void {
    let marcado = evento.target.checked;
    if (marcado) {
      this.tripulantesMarcadosCheckbox.push(tripulante);
    } else {
      let index = this.tripulantesMarcadosCheckbox.findIndex(x => x["Id"] === tripulante["Id"]);
      if (index > -1) {
        this.tripulantesMarcadosCheckbox.splice(index, 1);
      }
    }
    
    this.botaoExcluir = (this.tripulantesMarcadosCheckbox.length > 0);
  }

  obterNovoTripulante(): any {
    let novo = {
      "Id": uuidv4(),
      "Ativo": true,
      "NomeCompleto": "",
      "Trato": "",
      "CodigoANAC": 0,
      "CargoStr": null,
      "Bolinha": "cinza",
      "Justificativa": null,
      "Matricula": null,
      "CodigoPetrobras": null,
      "CPF": "",
      "Nascimento": null,
      "Licenca": null,
      "Email": null,
      "Admissao": null,
      "UltimoPeso": 0,
      "Cargo": null,
      "Base": null,
      "Quinzena": null,
      "Cor": "cinza",
      "Usuario": null,
      MatriculaInterna : 0,
    };
    return novo;
  }

  exibirDialogoNovo(): void {
    this.tripulanteSelecionado = this.obterNovoTripulante();
    this.exibirEdicao = true;
  }

  exibirDialogoEdicao(tripulante): void {
    this.tripulanteSelecionado = tripulante;
    this.exibirEdicao = true;
  }

  ocultarDialogoExclusao(): void {
    this.exibirDialogo = false;    
  }

  ocultarDialogoEdicao(): void {
    this.tripulanteSelecionado = null;
    this.exibirEdicao = false;
    
    this.obterTripulantesDoServidor();
    this.filtrarTripulantes();
  }

  excluirTripulante(): void {
    this.ocultarDialogoExclusao();
    this.carregando = true;

    this.tripulantesMarcadosCheckbox.forEach((tripulante,index_tripulante)=>{      
      tripulante.Ativo = false;

      if (index_tripulante == (this.tripulantesMarcadosCheckbox.length - 1)) {
        this.carregando = false;
        
        this.api.postNTripulantes(this.tripulantesMarcadosCheckbox).then(x => {      
      
          this.tripulantesMarcadosCheckbox = [];
          this.botaoExcluir = false;
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
    });
  }

  tratoTripulanteSelecionado(): String {
    return this.tripulanteSelecionado == null ? '' : this.tripulanteSelecionado.Trato;
  }

}
