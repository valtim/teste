import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Vencimento } from './vencimento-model';

@Component({
  selector: 'app-editar-vencimento',
  templateUrl: './editar-vencimento.component.html',
  styleUrls: ['./editar-vencimento.component.css']
})
export class EditarVencimentoComponent implements OnInit {



  @Input() podeEditar;
  @Input() dados: Vencimento;

  @Output() retorno = new EventEmitter();

  dadosLocal : Vencimento;
  

  locale_pt: any;
  
  constructor() {



  }

  ngOnInit(): void {
    this.dadosLocal = Object.assign(new Vencimento(this.dados));
  
  
    // this.dados = new Vencimento(this.dados);

  
  }

  // editarData(e) {
  //   this.naoControlado = (e.target.value.length != this.mascara.length);
  //   if (!this.naoControlado)
  //     this.valorExibido = e.target.value;
  // }

  // clique(e) {
  //   if (e.checked)
  //     this.valorExibido = '';
  // }

  salvar() {

    // if (this.valorExibido.length == 0 && !this.naoControlado) {
    //   alert('Deve ser preenchido um valor válido ou marcar N/A caso esta data não seja controlada');
    //   return;
    // }

    // if (this.valorExibido.length != 0 && this.naoControlado) {
    //   alert('Deve ser preenchido um valor válido ou marcar N/A caso esta data não seja controlada');
    //   return;
    // }

    // let novoValor = Object.assign(this.dados);


    // let dia = 0;
    // let mes = 0;
    // let ano = 0;
    // novoValor.ValorExibido = this.valorExibido;
    // novoValor.NaoControlado = this.naoControlado;
    this.retorno.emit({ Confirmado: true, Certificado:  this.dadosLocal  });
  }

  cancelar() {
    // this.vencimento.Linha[this.vencimento.Campo].Display = false;
    this.dados.Display = false;
    this.retorno.emit({ Confirmado: false });
  }

}
