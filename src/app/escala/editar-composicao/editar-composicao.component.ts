import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


interface Tripulante {
  Id: string,
  Trato: string
}

@Component({
  selector: 'app-editar-composicao',
  templateUrl: './editar-composicao.component.html',
  styleUrls: ['./editar-composicao.component.css']
})
export class EditarComposicaoComponent implements OnInit {

  @Input() Escala;
  @Input() Tripulantes;
  @Input() Clientes;
  @Input() Bases;

  

  @Output() retorno = new EventEmitter();


  todosOsTripulantes;
  somentePIC;

  constructor() { }

  ngOnInit(): void {
//this.TipoDeOcorrencias.map(x=> ({'TipoDeOcorrencia': x, 'Descricao' : null}));
    this.todosOsTripulantes = this.Tripulantes.map(x=>({'Id' : x.Id, 'Trato': x.Trato }));
    this.somentePIC = this.Tripulantes.filter(x=>x.EhCMT).map(x=>({'Id' : x.Id, 'Trato': x.Trato }));

    this.Escala.Lista.forEach(x => {
      x.PIC = x.PIC == null ? null : { Id : x.PIC.Id, Trato : x.PIC.Trato} 
      x.SIC = x.SIC == null ? null : { Id : x.SIC.Id, Trato : x.SIC.Trato} 
      x.Cliente = x.Cliente == null ? null : { Id : x.Cliente.Id, Nome : x.Cliente.Nome }
      x.BaseDoTripulante = x.BaseDoTripulante == null ? null : { Id : x.BaseDoTripulante.Id, ICAO : x.BaseDoTripulante.ICAO }
    });
  }

  salvar(){

  }

  cancelar(){
      this.retorno.emit(null);
  }

}
