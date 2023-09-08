import { Component, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormArray } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

import { DataUtil } from './../../shared/DataUtil';


@Component({
  selector: 'app-editar-indisponibilidade',
  templateUrl: './editar-indisponibilidade.component.html',
  styleUrls: ['./editar-indisponibilidade.component.css']
})
export class EditarIndisponibilidadeComponent implements AfterViewInit {

  fg: UntypedFormGroup;

  fg2: UntypedFormGroup;

  fg3: UntypedFormGroup;


  @Input() indisponibilidade;
  @Input() contrato;
  @Input() prefixo;
  @Input() base;
  @Input() motivosIndisponibilidade;
  locale_pt: any;

  @Output() retorno = new EventEmitter();

  grupos: UntypedFormGroup[];

  constructor(private api: ApiService, private fb: UntypedFormBuilder) { }
  ngAfterViewInit(): void {
    this.locale_pt = this.api.getLocale('pt');
    this.createForm();
  }

  createMemberGroup(member: any): UntypedFormGroup {
    return this.fb.group({
      ...member,
    });
  }



  private createForm(): void {



    this.fg = this.createMemberGroup(this.indisponibilidade);

    this.indisponibilidade.Ocorrencias.forEach(element => {
      let grupo = this.createMemberGroup(element);
      element.Grupo = grupo;
    });


    this.fg2 = this.fb.group({
      tbIndisponibilidades: this.fb.array([])
    });


    this.fg3 = this.fb.group({
      tbObs: this.fb.array([])
    });


    this.indisponibilidade.Ocorrencias.forEach(element => {

      let grupo = this.createMemberGroup(element);

      this.tbIndisponibilidades.push(grupo);
    })

    this.indisponibilidade.Observacoes.forEach(element => {

      let grupo = this.createMemberGroup(element);

      this.tbObs.push(grupo);
    })
  }

  get tbIndisponibilidades(): UntypedFormArray {
    return this.fg2.get('tbIndisponibilidades') as UntypedFormArray;
  }

  get tbObs(): UntypedFormArray {
    return this.fg3.get('tbObs') as UntypedFormArray;
  }

  addNewRow(tabela: string): void {

    if (tabela == 'tbIndisponibilidades') {
      this.tbIndisponibilidades.push(this.createMemberGroup({
        Atualizacao: null,
        BaseDeOperacao: null,
        Inicio: null,
        Penaliza: false,
        Substituto: null,
        Termino: null,
        Id: null,
      }));
      return;
    }

    this.tbObs.push(this.createMemberGroup({
      Atualizacao: null,
      Motivo: null,
      Observacoes: null,
      Id: null,
    }));


  }

  onDeleteRow(tabela: string, rowIndex: number): void {
    let item = this["tbIndisponibilidades"].controls[rowIndex].value;
    item.Ativo = false;
    this.tbIndisponibilidades.removeAt(rowIndex);
  }

  cancelar() {
    var ret = { Salvar: false, Excluir : false };
    this.retorno.emit(ret);
  }

  excluir() {
    var ret = { Indisponibilidade: this.indisponibilidade, Salvar: false, Excluir : true, };
    this.retorno.emit(ret);
  }


  salvar(excluir: boolean) {
    let postagem = Object.assign({}, this.fg.value);
    postagem.Ativo = !excluir;
    postagem.Inicio = DataUtil.ParaDataISO(this.fg.value.Inicio);
    postagem.Fim = DataUtil.ParaDataISO(this.fg.value.Fim);

    postagem.Ocorrencias = [];
    this.tbIndisponibilidades.controls.forEach(x => {
      let item = Object.assign({}, x.value);
      item.Inicio = DataUtil.ParaDataISO(item.Inicio);
      item.Termino = DataUtil.ParaDataISO(item.Termino);
      postagem.Ocorrencias.push(item);
    });

    postagem.Observacoes = [];
    this.tbObs.controls.forEach(x => {
      let item = Object.assign({}, x.value);
      //item.Inicio = DataUtil.ParaDataISO(item.Inicio);
      item.Motivo = { Id: item.Motivo.Id };
      postagem.Observacoes.push(item);
    });




    this.api.postCrudIndisponibilidade(postagem).then(x => {
      this.indisponibilidade.Exibir = false;
      this.indisponibilidade = x;

      var ret = { Indisponibilidade: this.indisponibilidade, Salvar: true, Excluir : false };
      this.retorno.emit(ret);
    })

  }

}