import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-curriculos',
  templateUrl: './curriculos.component.html',
  styleUrls: ['./curriculos.component.css']
})
export class CurriculosComponent implements OnInit {

  carregando: boolean = true;
  locale_pt: string;
  curriculos: any[] = [];
  cacheCurriculos: any[] = [];
  curriculosMarcados: any[] = [];
  curriculoSelecionado: any;

  filtroSemCurriculo: boolean = false;
  filtro: string;
  exibirEdicao: boolean = false;

  constructor(private api: ApiService) {
    this.locale_pt = this.api.getLocale('pt');
  }

  ngOnInit(): void {
    this.api.getCurriculos().then((x) => {
      this.curriculos = x;
      this.cacheCurriculos = this.curriculos;
      this.carregando = false;      
    });
  }

  filtrarCurriculos(): void {
    if ((this.cacheCurriculos != undefined) && (this.cacheCurriculos != null)) {      

      if ((this.filtro != undefined) && (this.filtro != null) && (this.filtro != '')) {        
        this.curriculos = this.cacheCurriculos.filter(
          t => (
              t.Tripulante.Trato.includes(this.filtro) || 
              String(t.Tripulante.CodigoANAC).includes(this.filtro) ||
              String(t.Tripulante.Matricula).includes(this.filtro)
            ) &&
          ((this.filtroSemCurriculo && t.CurriculoIncompleto) || (!this.filtroSemCurriculo))
        );
      } else {
        this.curriculos = this.cacheCurriculos.filter(
          t => ((this.filtroSemCurriculo && t.CurriculoIncompleto) || (!this.filtroSemCurriculo))
        );
      }      
    }
  }

  marcarCheckboxCurriculo(evento,curriculo): void {
    let marcado = evento.target.checked;
    if (marcado) {
      this.curriculosMarcados.push(curriculo);
    } else {
      let index = this.curriculosMarcados.findIndex(x => x["Id"] === curriculo["Id"]);
      if (index > -1) {
        this.curriculosMarcados.splice(index, 1);
      }
    }
    
    // this.botaoExcluir = (this.tripulantesMarcadosCheckbox.length > 0);
  }

  exibirDialogoEdicao(curriculo): void {
    this.curriculoSelecionado = curriculo;
    this.exibirEdicao = true;
  }

  filtrar(e) {
    this.filtrarCurriculos();
  }

  filtrarCurriculo() {
    this.filtrarCurriculos();
  }

  ocultarDialogoEdicao(): void {
    this.curriculoSelecionado = null;
    this.exibirEdicao = false;    
  }

}
