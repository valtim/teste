import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Input() tripulanteSelecionado: any;
  @Output() retorno = new EventEmitter();

  tripulante: any;
  liberarBotaoSalvar = true;
  cpfEstaValido = true;
  mostrarLoading = false;

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
    /* Clonar tripulante para não afetar a lista original */
    this.tripulante = JSON.parse(JSON.stringify(this.tripulanteSelecionado));

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

  validarValores(): void {
    if ((this.tripulante.NomeCompleto != '') && (this.tripulante.Trato != '')) {
      if (this.cpfEstaValido) {
        this.liberarBotaoSalvar = true;
      } else {
        this.liberarBotaoSalvar = false;  
      }          
    } else {
      this.liberarBotaoSalvar = false;
    }
  }

  validarValorCPF(): void {
    if ((this.tripulante.CPF != '') && (this.tripulante.CPF != null)) {
      let cpf = document.getElementById('input_cpf_mask');
      if (this.validarCPF(this.tripulante.CPF)) {                            
        if (cpf.classList.contains('cpf-invalido')) {
          cpf.classList.remove('cpf-invalido');          
          this.cpfEstaValido = true;
          this.validarValores();
        }                  
      } else {          
        if (!cpf.classList.contains('cpf-invalido')) {
          cpf.classList.add('cpf-invalido');
          this.cpfEstaValido = false;
          this.validarValores();
        }
      }
    }
  }

  validarCPF(cpf: string): boolean {
    if (cpf == null) return true;
    cpf = cpf.replace(/[^\d]+/g,'');    	
    if(cpf == '') return true;	
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 || 
      cpf == "00000000000" || 
      cpf == "11111111111" || 
      cpf == "22222222222" || 
      cpf == "33333333333" || 
      cpf == "44444444444" || 
      cpf == "55555555555" || 
      cpf == "66666666666" || 
      cpf == "77777777777" || 
      cpf == "88888888888" || 
      cpf == "99999999999")
        return false;		
    // Valida 1o digito	
    let add = 0;	
    for (let i=0; i < 9; i ++)		
      add += parseInt(cpf.charAt(i)) * (10 - i);	
      let rev = 11 - (add % 11);	
      if (rev == 10 || rev == 11)		
        rev = 0;	
      if (rev != parseInt(cpf.charAt(9)))		
        return false;		
    // Valida 2o digito	
    add = 0;	
    for (let i = 0; i < 10; i ++)		
      add += parseInt(cpf.charAt(i)) * (11 - i);	
    rev = 11 - (add % 11);	
    if (rev == 10 || rev == 11)	
      rev = 0;	
    if (rev != parseInt(cpf.charAt(10)))
      return false;		
    return true;   
  }

  salvar(): void {
    this.mostrarLoading = true;
    this.liberarBotaoSalvar = false;

    if (isNaN(+this.tripulante.CodigoANAC)) {
      this.tripulante.CodigoANAC = 0;
    }

    if (isNaN(+this.tripulante.UltimoPeso)) {
      this.tripulante.UltimoPeso = 0;
    }

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
      this.mostrarLoading = false;
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
