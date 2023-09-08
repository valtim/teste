import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { MessageService } from 'primeng/api';
import { GuidUtil } from 'src/app/shared/GuidUtil';
import { ApiGenericoService } from 'src/app/shared/api.generico.service';

@Component({
  selector: 'app-trilho',
  templateUrl: './trilho.component.html',
  styleUrls: ['./trilho.component.css'],
  providers: [MessageService]
})
export class TrilhoComponent implements OnInit {

  listasProntas = false;
  tabelaPronta = false;

  // tudoPronto = false;
  public trilhos: any[];
  linhasSelecionadas = [];
  prefixos = [];
  localidades = [];
  clientes: any;

  resultsLocal = [];
  resultsPrefixo = [];
  resultsCliente: any[];
  locale_pt: any;
  tripulantes: any;
  resultsTrip: any;

  dataPesquisada;



  get tudoPronto() {
    return this.tabelaPronta && this.listasProntas;
  }

  get temDados() {
    return this.trilhos != undefined;
  }

  constructor(private api: ApiService,
    private apiGenerico: ApiGenericoService,
    private messageService: MessageService) {
    this.locale_pt = this.api.getLocale('pt');
  }

  ngOnInit(): void {

    this.api.getListasTrilho().then(x => {
      this.localidades = x.Localidades;
      this.prefixos = x.Prefixos;
      this.clientes = x.Clientes;
      this.tripulantes = x.Tripulantes;
      this.dataPesquisada = new Date(x.DataPesquisada);
      this.listasProntas = true;
      this.rodarRelatorio();
    })

  }

  editInit(e) {
    console.log('passou');

  }

  searchTrip(event) {
    this.resultsTrip = this.tripulantes.filter(x => x.Trato.indexOf(event.query.toUpperCase()) > -1);
  }

  rodarRelatorio() {
    this.trilhos = undefined;
    this.api.getTrilho(this.dataPesquisada, this.dataPesquisada).then(x => {
      this.tabelaPronta = true;
      this.trilhos = x;
      this.trilhos.forEach(x => {
        x.Data = new Date(x.Data);
      })
    })
  }

  
  mudeiAqui(e, dados) {
    dados.Modificado = true;
  }

  salvar() {

    this.trilhos.forEach(x => {
      x.Paradas = [];
      for (let i = 0; i < x.Rota.length; i++) {
        x.Paradas.push({ Ordem: i, Localidade: x.Rota[i] });
      }
    })

    let post = this.trilhos.filter(x => x.Modificado);

    this.trilhos = [];

    this.api.postTrilho(post).then(x => {
      this.rodarRelatorio();
      this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Salvo com sucesso!' });
    })
  }

  cancelar() {

  }




  novaLinha() {

    let dt = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);

    this.trilhos.push({
      Id: GuidUtil.NewGuid(),
      Date: this.dataPesquisada,
      Cliente: { Nome: '' },
      Hora: "06:00",
      Rota: [],
      Prefixo: { PrefixoCompleto: '' },
      Paradas: [],
      PosicaoInvertida: false,
      Modificado: true
    });
  }

  delete() {
    this.apiGenerico.deleteGenerico('Trilho', this.linhasSelecionadas).then(
      () => {
        this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Excluído com sucesso!' });
        this.rodarRelatorio();
      }
    )
  }

  searchCliente(event) {
    this.resultsCliente = this.clientes.filter(x => x.Nome.indexOf(event.query.toUpperCase()) > -1);
  }

  searchLocal(event) {
    this.resultsLocal = this.localidades.filter(x => x.Nome.indexOf(event.query.toUpperCase()) > -1 || x.NomeICAO.indexOf(event.query.toUpperCase()) > -1);
  }

  searchBase(event) {
    this.resultsLocal = this.localidades.filter(x => x.Nome.indexOf(event.query.toUpperCase()) > -1 || x.NomeICAO.indexOf(event.query.toUpperCase()) > -1);
  }

  searchPrefixo(event) {
    this.resultsPrefixo = this.prefixos.filter(x => x.PrefixoCompleto.indexOf(event.query.toUpperCase()) > -1);
  }

  onRowEditInit(linha: any) {
    //this.clonedProducts[product.id] = {...product};
  }

  onRowEditSave(linha: any) {

  }

  onRowEditCancel(linha: any, index: number) {

  }

}
