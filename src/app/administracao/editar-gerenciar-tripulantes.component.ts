import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from "primeng/api";
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-editar-gerenciar-tripulantes',
  templateUrl: './editar-gerenciar-tripulantes.component.html',
  styleUrls: ['./editar-gerenciar-tripulantes.component.css'],
  providers: [MessageService]
})
export class EditarGerenciarTripulantesComponent implements OnInit {

  @Input() tripulante: any;
  @Output() retorno = new EventEmitter();

  bolinhaCinza;
  bolinhaVermelha;
  bolinhaAmarela;
  bolinhaVerde;

  dataNascimento: Date;
  dataAdmissao: Date;

  cargos: [];
  basesTripulante: [];

  ultimoPesoLb;
  ultimoPesoKg;

  constructor(private api: ApiService, private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {
    console.log(this.tripulante);

    this.api.getCombos().then((x) => {
      this.cargos = x.Cargo;
      this.basesTripulante = x.BaseDoTripulante;

      if (this.tripulante.Bolinha == 'vermelha') this.bolinhaVermelha = true;
      else if (this.tripulante.Bolinha == 'amarela') this.bolinhaAmarela = true;
      else if (this.tripulante.Bolinha == 'verde') this.bolinhaVerde = true;
      else this.bolinhaCinza = true;
    
      this.dataNascimento = this.converterDataBancoParaTela(this.tripulante.Nascimento);
      this.dataAdmissao = this.converterDataBancoParaTela(this.tripulante.Admissao);
      this.ultimoPesoLb = this.converterPesoBancoParaTela(this.tripulante.UltimoPeso);
      this.ultimoPesoKg = this.convertPoundsToKilograms(this.tripulante.UltimoPeso);      
    });
  }

  converterDataBancoParaTela(dataBanco: string): Date {
    if ((dataBanco != null) && (dataBanco != '')) {
      let partes = dataBanco.substring(0,10).split('-');
      return new Date(parseInt(partes[0]),parseInt(partes[1])-1,parseInt(partes[2]));
    } else {
      return null;
    }
  }

  converterDataTelaParaBanco(data: Date): String {    
    if (data != null) {
      return data.getFullYear() + '-' + ("0" + (data.getMonth()+1)).slice(-2) + '-' + ("0" + data.getDate()).slice(-2) + 'T00:00:00';
    } else {
      return '';
    }
  }

  converterPesoBancoParaTela(UltimoPeso: any): String {
    if (UltimoPeso != null) {
      return String(UltimoPeso).replace('.',',');
    } else {
      return '';
    }
  }

  converterPesoTelaParaBanco(peso: string): number {
    if ((peso != null) && (peso != '')) {
      return parseFloat(peso.replace(',','.'));
    } else {
      return 0;
    }
  }

  convertPoundsToKilograms(pounds: any): String {
    if (pounds != null) {
      let kilograms = String(pounds * 0.453592);      
      return this.converterPesoBancoParaTela(parseFloat(kilograms).toFixed(2));
    } else {
      return '';
    }   
  }

  ajustarValorQuilos(): void {
    let peso = this.converterPesoTelaParaBanco(this.ultimoPesoLb);
    this.ultimoPesoKg = this.convertPoundsToKilograms(peso);
  }

  marcarBolinhas(marcado: String): void {
    this.bolinhaCinza = (marcado == 'bolinhaCinza');
    this.bolinhaVermelha = (marcado == 'bolinhaVermelha');
    this.bolinhaAmarela = (marcado == 'bolinhaAmarela');
    this.bolinhaVerde = (marcado == 'bolinhaVerde');
  }

  salvar(): void {
    let cor = 'cinza';
    if (this.bolinhaVermelha) cor = 'vermelha';
    if (this.bolinhaAmarela) cor = 'amarela';
    if (this.bolinhaVerde) cor = 'verde';
    this.tripulante.Bolinha = cor;
    this.tripulante.Cor = cor;

    this.tripulante.Nascimento = this.converterDataTelaParaBanco(this.dataNascimento);
    this.tripulante.Admissao = this.converterDataTelaParaBanco(this.dataAdmissao);

    this.tripulante.UltimoPeso = this.converterPesoTelaParaBanco(this.ultimoPesoLb);

    this.api.postNTripulantes([this.tripulante]).then(x => {              
      this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Tripulante atualizado com sucesso!' });          
      console.log('Tripulante salvo com sucesso!');
      this.retorno.emit();
    }).catch((x) => {
      console.error(x);
      this.messageService.add({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao atualizar o Tripulante!",
      });
    });
  }

}
