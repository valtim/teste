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
  IdTripulante: any;

  filtroSemCurriculo: boolean = false;
  filtroComCurriculo: boolean = false;
  filtro: string;
  exibirEdicao: boolean = false;
  exibirBotaoExportar: boolean = false;
  todosMarcados: boolean = false;

  selectedItems : any[] = [];

  constructor(private api: ApiService) {
    this.locale_pt = this.api.getLocale('pt');
  }

  gerarNomeArquivo(curriculo: any): string {
    let nome = `Curriculo_${curriculo.Tripulante.Trato.toUpperCase().replace(" ", "-")}.pdf`;
    return nome;
  }

  ngOnInit(): void {    
    this.api.getCurriculos().then((x) => {      
      this.curriculos = x;      
      this.curriculos = this.curriculos.map(obj => ({
            ...obj,
            Marcado: false,
            NomeArquivo: this.gerarNomeArquivo(obj)
        }));

        this.cacheCurriculos = this.curriculos;
        this.carregando = false;
    });
  }

  filtrarCurriculos(): void {
    if ((this.cacheCurriculos != undefined) && (this.cacheCurriculos != null)) {      

      if ((this.filtro != undefined) && (this.filtro != null) && (this.filtro != '')) {        
        this.curriculos = this.cacheCurriculos.filter(
          t => (
              t.Tripulante.Trato.toUpperCase().includes(this.filtro.toUpperCase()) || 
              String(t.Tripulante.CodigoANAC).includes(this.filtro.toUpperCase()) ||
              String(t.Tripulante.Matricula).includes(this.filtro.toUpperCase())
            ) && (
            (this.filtroSemCurriculo && t.CurriculoIncompleto) ||
            (this.filtroComCurriculo && !t.CurriculoIncompleto) ||
            (!this.filtroSemCurriculo && !this.filtroComCurriculo)
          )
        ).map(obj => ({
            ...obj,
            Marcado: false
        }));
      } else {
        this.curriculos = this.cacheCurriculos.filter(
          t => (
            (this.filtroSemCurriculo && t.CurriculoIncompleto) ||
            (this.filtroComCurriculo && !t.CurriculoIncompleto) ||
            (!this.filtroSemCurriculo && !this.filtroComCurriculo)
          )
        ).map(obj => ({
            ...obj,
            Marcado: false
        }));
      }      
    }
  }

  marcarCheckboxCurriculo(): void {    
    this.exibirBotaoExportar = (this.curriculos.filter(t => t.Marcado).length > 0);    
  }

  marcarTodos() {
    this.exibirBotaoExportar = false;
    if ( this.selectedItems.length == 0 )
    {
      this.exibirBotaoExportar = true;
      this.selectedItems = this.curriculos.map(x=>x.Tripulante.Id);
      return;
    }

    this.selectedItems = [];

    // this.curriculos = this.curriculos.map(obj => ({
    //     ...obj,
    //     Marcado: this.todosMarcados
    // }));

    //this.exibirBotaoExportar = (this.curriculos.filter(t => t.Marcado).length > 0);
  }

  downloadResponse(res) {    
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute('style','display: none');
    let url = URL.createObjectURL(res.blob);
    a.href = url;
    a.download = res.fileName;
    a.click();
    window.URL.revokeObjectURL(url);

    this.carregando = false;
    this.exibirBotaoExportar = (this.curriculos.filter(t => t.Marcado).length > 0);
  }

  exportar(): void {    
    this.exibirBotaoExportar = false;
    this.carregando = true;
    
    let exportar = this.curriculos.filter(t => t.Marcado);    
    this.api.obterCurriculosPDF(this.selectedItems, undefined).then((x) => {
        this.downloadResponse(x);
    });
  }

  exibirDialogoEdicao(trip): void {
    this.IdTripulante = trip;
    // this.curriculoSelecionado = curriculo;
    this.exibirEdicao = true;
  }

  filtrar(e) {
    this.filtrarCurriculos();
  }

  filtrarCurriculo() {
    this.filtrarCurriculos();
  }

  ocultarDialogoEdicao(): void {
    // this.curriculoSelecionado = null;
    this.exibirEdicao = false;    
  }

  ocultarDialogoEdicaoRetorno(incompleto: any): void {    
    this.IdTripulante = undefined;
    // this.curriculoSelecionado.CurriculoIncompleto = incompleto;    
  }

}
