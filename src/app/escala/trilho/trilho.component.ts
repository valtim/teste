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

  tudoPronto = false;
  public trilhos = [];
  linhasSelecionadas = [];
  prefixos = [];
  localidades = [];
  clientes: any;

  resultsLocal = [];
  resultsPrefixo = [];
  resultsCliente: any[];
  locale_pt: any;
  dataIni = new Date();
  dataFim = new Date();
  tripulantes: any;
  resultsTrip: any;

  constructor(private api: ApiService,
    private apiGenerico: ApiGenericoService,
    private messageService: MessageService) {
    this.locale_pt = this.api.getLocale('pt');
  }

  ngOnInit(): void {

    this.api.getListasTrilho().then(x => {
      this.listasProntas = true;
      this.localidades = x.Localidades;
      this.prefixos = x.Prefixos;
      this.clientes = x.Clientes;
      this.tripulantes = x.Tripulantes;
      this.tudoPronto = this.tabelaPronta && this.listasProntas;
    })


    this.dataIni = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
    this.dataFim = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);

    this.rodarRelatorio();

  }

  editInit(e){
    console.log('passou');
    
  }

  searchTrip(event) {
    this.resultsTrip = this.tripulantes.filter(x => x.Trato.indexOf(event.query.toUpperCase()) > -1);
  }

  rodarRelatorio() {
    this.tabelaPronta = false;
    this.trilhos = [];

    this.tudoPronto = this.tabelaPronta && this.listasProntas;

    this.api.getTrilho(this.dataIni, this.dataFim).then(x => {
      this.tabelaPronta = true;
      if ( x == null ){
        this.tudoPronto = this.tabelaPronta && this.listasProntas;
        return;  
      }
      this.trilhos = x;

      this.trilhos.forEach(x => {
        x.Data = new Date(x.Data);
      })

      this.tudoPronto = this.tabelaPronta && this.listasProntas;
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
      Date: dt,
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
