import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editar-escala',
  templateUrl: './editar-escala.component.html',
  styleUrls: ['./editar-escala.component.css']
})
export class EditarEscalaComponent implements OnInit {

  @Input() Registro;
  @Input() TipoDeOcorrencias;

  TipoDeOcorrencias2 = [];

  @Output() retorno = new EventEmitter();

  constructor() { }
  ngOnInit(): void {
    this.list1 = this.TipoDeOcorrencias.map(x=> ({'TipoDeOcorrencia': x, 'Descricao' : null}));
    this.list2 = this.Registro.Detalhes;
  }

  list1: any[];

  list2: any[];

  lista: 'width:300px; height:300px;';

  // ngOnInit(): void {
  //   //this.list1 = this.tiposDeOcorrencia.find(x=>x.)
  // }

  salvar(){

  }

  cancelar(){
      this.retorno.emit(null);
  }

  funteste(evento){
    this.itemSelecionado = evento.items[0];
  }

  itemSelecionado;

}
