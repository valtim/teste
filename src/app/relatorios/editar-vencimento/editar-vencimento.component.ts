import { DataUtil } from './../../shared/DataUtil';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-editar-vencimento',
  templateUrl: './editar-vencimento.component.html',
  styleUrls: ['./editar-vencimento.component.css']
})
export class EditarVencimentoComponent implements OnInit {


  @Input() dados;

  @Output() retorno = new EventEmitter();
  
  locale_pt: any;
  na;
  data;

  constructor(private api : ApiService) { }

  ngOnInit(): void {
    // this.trato = this.vencimento.Dados['Trato'];
     this.data = this.dados.ValorExibido;
    // this.id = this.vencimento.Dados[this.vencimento.Campo].Id;
    // this.locale_pt = this.api.getLocale('pt');


    // this.curso = this.vencimento.Dados[this.vencimento.Campo];

    // this.tripulante_id = this.curso["Tripulante_Id"];
    // this.curso_id = this.curso["Certificado_Id"];


  }

  salvar(){
    let novoValor = Object.assign(this.dados);
    novoValor.ValorExibido = this.data;
    this.retorno.emit({ Confirmado: true, Certificado : novoValor });
  }

  cancelar(){
    // this.vencimento.Linha[this.vencimento.Campo].Display = false;
    this.dados.Display = false;
    this.retorno.emit({ Confirmado: false});
  }

}
