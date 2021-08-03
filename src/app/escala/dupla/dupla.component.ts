import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GuidUtil } from 'src/app/shared/GuidUtil';
import { EscalaService } from 'src/app/shared/escala.service';

@Component({
  selector: 'app-dupla',
  templateUrl: './dupla.component.html',
  styleUrls: ['./dupla.component.css'],
  providers: [MessageService]
})
export class DuplaComponent implements OnInit {
  locale_pt: any;

  tudoPronto = false;

  linhasSelecionadas = [];

  dataInicio;
  dataFim;
  duplas = [];
  tripulantes: any;
  bases: any;
  prefixos: any;
  resultsTripulante: any;
  resultsBase: any;
  resultsPrefixo: any;
  cursos: any;

  constructor(private apiEscala: EscalaService,
    private messageService: MessageService) {
    //this.locale_pt = this.api.getLocale('pt');
    this.dataInicio = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
    this.dataFim = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);

    this.apiEscala.getListasDupla().then(x => {
      this.tripulantes = x.tripulantes;
      this.bases = x.bases;
      this.prefixos = x.prefixos;
    })

    this.rodarRelatorio();
  }

  searchTripulante(event) {
    this.resultsTripulante = this.tripulantes.filter(x => x.Trato.indexOf(event.query.toUpperCase()) > -1);
  }

  searchBase(event) {
    this.resultsBase = this.bases.filter(x => x.Nome.indexOf(event.query.toUpperCase()) > -1);
  }

  searchPrefixo(event) {
    this.resultsPrefixo = this.prefixos.filter(x => x.PrefixoCompleto.indexOf(event.query.toUpperCase()) > -1);
  }


  rodarRelatorio() {
    this.apiEscala.getDuplas(this.dataInicio, this.dataFim).then(x => {
      this.duplas = x.Duplas;
      this.cursos = x.Cursos;
      this.tudoPronto = true;

      this.duplas.forEach(x => {
        x.Data = new Date(x.Data);
      })
    });
  }

  ngOnInit(): void {
  }

  novaLinha() {
    this.duplas.push({ Id: GuidUtil.NewGuid(), Base: undefined, Data: undefined, PIC: undefined, SIC: undefined, Apresentacao: undefined, Observacao: undefined, RepeteAte: undefined });
  }

  salvar(teste) {


    let chaves = Object.keys(teste.editingRowKeys);

    let editado = this.duplas.filter(x => chaves.includes(x.Id))


    teste.editingRowKeys = [];

    this.apiEscala.postDuplas(editado).then(x => {
      // this.duplas = x;

      // this.duplas.forEach(x => {
      //   x.Data = new Date(x.Data.split("T")[0]);
      // })

      let novos = x;

      novos.forEach(x => {
        x.Data = new Date(x.Data);
      })

      this.duplas.push.apply(this.duplas, novos);

      this.duplas.forEach(x => x.RepeteAte = undefined);

      this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Salvo com sucesso!' });
    })
  }

  delete() {

    let editado = this.duplas.filter(x => this.linhasSelecionadas.includes(x.Id));

    editado.forEach(x => x.Ativo = false);

    this.apiEscala.postDuplas(editado).then(x => {

      this.duplas = this.duplas.filter(x => !this.linhasSelecionadas.includes(x.Id));

      this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Salvo com sucesso!' });
    })

  }

  onRowEditInit(linha: any) {
    //this.clonedProducts[product.id] = {...product};
  }

  onRowEditSave(linha: any) {

  }

  onRowEditCancel(linha: any, index: number) {

  }

}
