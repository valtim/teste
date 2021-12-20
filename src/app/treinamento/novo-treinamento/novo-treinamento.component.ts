import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { ApiTurmasService } from 'src/app/shared/api.turmas.service';

@Component({
  selector: 'app-novo-treinamento',
  templateUrl: './novo-treinamento.component.html',
  styleUrls: ['./novo-treinamento.component.css']
})
export class NovoTreinamentoComponent implements OnInit {

  // fg : FormGroup;

  @Input() treinamento: any;
  @Input() tipos: any[];
  @Input() equipamentos: any[];
  @Input() instrutores: any[];

  @Output() newItemEvent = new EventEmitter<boolean>();

  treinamentoInterno;

  constructor(
    private api: ApiTurmasService) { 

    }



  ngOnInit(): void {

    this.treinamentoInterno = Object.assign({}, this.treinamento);
    this.treinamentoInterno.TiposTreinamento = this.treinamentoInterno.TiposTreinamento.map(a => ({ Id: a.Id, Nome: a.Nome }))
    this.treinamentoInterno.TiposDeEquipamento = this.treinamentoInterno.TiposDeEquipamento.map(a => ({ Id: a.Id, Nome: a.Nome }))
    this.treinamentoInterno.Instrutores = this.treinamentoInterno.Instrutores.map(a => ({ Id: a.Id, Trato: a.Trato }))

  }


  addConteudoProgramatico() {
    let novo = { "Nome": "", CargaHorariaTexto: "00:00" };

    if ( this.treinamentoInterno.Conteudos == null )
      this.treinamentoInterno.Conteudos = [];

    this.treinamentoInterno.Conteudos.push(novo)
  }

  rmConteudoProgramatico(i) {

  }

  cancelar() {
    this.newItemEvent.emit(false);
    this.treinamento.Display = false;
  }

  enviar(obj) {
    //Object.assign(this.treinamento, this.fg.value);


    this.treinamentoInterno.TiposTreinamento = this.treinamentoInterno.TiposTreinamento.map(a => ({ Id: a.Id }))
    this.treinamentoInterno.TiposDeEquipamento = this.treinamentoInterno.TiposDeEquipamento.map(a => ({ Id: a.Id }))
    this.treinamentoInterno.Instrutores = this.treinamentoInterno.Instrutores.map(a => ({ Id: a.Id }))
    //this.treinamentoInterno.Anexos = this.treinamentoInterno.Anexos.map(a => ({ Id: a.Id }))


    this.treinamento.Conteudos.forEach(x => {
      x.CargaHoraria2 = x.CargaHoraria2 + ":00.0000000"
    });

    this.api.postTreinamento(this.treinamentoInterno).then(x => {
      Object.assign(this.treinamento, x);
      this.treinamento.Display = false;
      this.newItemEvent.emit(false);
      alert('Salvo com sucesso!');
    }
    );
  }

}
