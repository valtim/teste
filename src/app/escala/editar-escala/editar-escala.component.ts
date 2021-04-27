import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-editar-escala',
  templateUrl: './editar-escala.component.html',
  styleUrls: ['./editar-escala.component.css']
})
export class EditarEscalaComponent implements OnInit {

  @Input() Registro;
  @Input() TipoDeOcorrencias;
  @Input() Coluna;

  TipoDeOcorrencias2 = [];

  @Output() retorno = new EventEmitter();


  valorEditado : any = {};

  estilo = { height: '200px'};
  constructor() { }
  ngOnInit(): void {
    this.valorEditado = Object.assign({}, this.Registro);
    this.list1 = this.TipoDeOcorrencias.map(x=> ({'TipoDeOcorrencia': x, 'Descricao' : null}));
    this.list2 = this.valorEditado.Detalhes;
  }

  list1: any[];

  list2: any[];

  salvar(){
    this.valorEditado.DialogResult = 'OK';
    this.valorEditado.Siglas = this.valorEditado.Detalhes.map(x=>x.Sigla).join('/');
    this.retorno.emit(this.valorEditado);
  }

  cancelar(){
      this.retorno.emit(null);
  }

  funteste(evento){
    this.itemSelecionado = evento.items[0];
  }

  itemSelecionado;

}
