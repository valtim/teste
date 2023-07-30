import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { ApiTurmasService } from 'src/app/shared/api.turmas.service';

@Component({
  selector: 'app-editar-treinamento',
  templateUrl: './editar-treinamento.component.html',
  styleUrls: ['./editar-treinamento.component.css']
})
export class EditarTreinamentoComponent implements OnInit {

  // fg : FormGroup;

  @Input() treinamento: any;
  @Input() tipos: any[];
  @Input() equipamentos: any[];
  @Input() instrutores: any[];

  @Output() newItemEvent = new EventEmitter<boolean>();

  @Output() retorno = new EventEmitter<any>();

  // treinamentoInterno;

  constructor(
    private api: ApiTurmasService) {

  }



  ngOnInit(): void {

    // this.treinamentoInterno = Object.assign({}, this.treinamento);
    // this.treinamentoInterno.TiposTreinamento = this.treinamentoInterno.TiposTreinamento.map(a => ({ Id: a.Id, Nome: a.Nome }))
    // this.treinamentoInterno.TiposDeEquipamento = this.treinamentoInterno.TiposDeEquipamento.map(a => ({ Id: a.Id, Nome: a.Nome }))
    // this.treinamentoInterno.Instrutores = this.treinamentoInterno.Instrutores.map(a => ({ Id: a.Id, Trato: a.Trato }))

  }


  addConteudoProgramatico() {
    let novo = { "Nome": "", CargaHorariaTexto: "00:00" };

    if (this.treinamento.Conteudos == null)
      this.treinamento.Conteudos = [];

    this.treinamento.Conteudos.push(novo)
  }

  rmConteudoProgramatico(i) {

  }

  cancelar() {
    let ret = { "Salvar": false};

    this.retorno.emit(ret);
  }




  enviar(obj) {
    //Object.assign(this.treinamento, this.fg.value);


    // this.treinamentoInterno.TiposTreinamento = this.treinamentoInterno.TiposTreinamento.map(a => ({ Id: a.Id }))
    // this.treinamentoInterno.TiposDeEquipamento = this.treinamentoInterno.TiposDeEquipamento.map(a => ({ Id: a.Id }))
    // this.treinamentoInterno.Instrutores = this.treinamentoInterno.Instrutores.map(a => ({ Id: a.Id }))
    //this.treinamentoInterno.Anexos = this.treinamentoInterno.Anexos.map(a => ({ Id: a.Id }))


    // this.treinamento.Conteudos.forEach(x => {
    //   x.CargaHoraria2 = x.CargaHoraria2 + ":00.0000000"
    // });

    let ret = { "Salvar": true, "Treinamento": this.treinamento };

    this.retorno.emit(ret);

    // this.api.postTreinamento(this.treinamentoInterno).then(x => {
    //   Object.assign(this.treinamento, x);
    //   this.treinamento.Display = false;
    //   this.newItemEvent.emit(false);
    //   alert('Salvo com sucesso!');
    // }
    // );
  }

}
