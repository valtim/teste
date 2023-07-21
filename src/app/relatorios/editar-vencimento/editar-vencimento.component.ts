import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-editar-vencimento',
  templateUrl: './editar-vencimento.component.html',
  styleUrls: ['./editar-vencimento.component.css']
})
export class EditarVencimentoComponent implements OnInit {



  @Input() podeEditar;
  @Input() dados;

  @Output() retorno = new EventEmitter();

  locale_pt: any;
  naoControlado: boolean = false;
  valorExibido: string;
  mascara: string;

  constructor() {



  }

  ngOnInit(): void {

    this.mascara = "99/99/9999";
    if (this.dados.Certificado.SomenteMes)
      this.mascara = "99/9999";

    this.naoControlado = this.dados.NaoControlado;

    if (this.dados.ValorExibido == "---" || this.dados.NaoControlado)
      return;

    this.valorExibido = this.dados.ValorExibido;
  }

  editarData(e) {
    this.naoControlado = (e.target.value.length != this.mascara.length);
    if(!this.naoControlado)
    this.valorExibido = e.target.value;
  }

  clique(e) {
    if (e.checked)
      this.valorExibido = '';
  }

  salvar() {

    if (this.valorExibido.length == 0 && !this.naoControlado) {
      alert('Deve ser preenchido um valor válido ou marcar N/A caso esta data não seja controlada');
      return;
    }

    if (this.valorExibido.length != 0 && this.naoControlado) {
      alert('Deve ser preenchido um valor válido ou marcar N/A caso esta data não seja controlada');
      return;
    }

    let novoValor = Object.assign(this.dados);


    let dia = 0;
    let mes = 0;
    let ano = 0;
    novoValor.ValorExibido = this.valorExibido;
    novoValor.NaoControlado = this.naoControlado;
    this.retorno.emit({ Confirmado: true, Certificado: novoValor });
  }

  cancelar() {
    // this.vencimento.Linha[this.vencimento.Campo].Display = false;
    this.dados.Display = false;
    this.retorno.emit({ Confirmado: false });
  }

}
