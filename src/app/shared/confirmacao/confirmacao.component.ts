import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrls: ['./confirmacao.component.css']
})
export class ConfirmacaoComponent implements OnInit {

  @Input() mensagem;
  @Input() caminho;
  @Output() retorno = new EventEmitter();
  constructor(
    private router: Router,) { }

  ngOnInit() {
  }

  public clickOK(){
    if ( this.caminho != undefined ){
      this.router.navigate([this.caminho]);
      return;
    }

    this.retorno.emit({ Confirmado: false });
  }

}
