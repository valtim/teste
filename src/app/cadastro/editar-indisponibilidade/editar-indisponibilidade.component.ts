import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { MessageService } from 'primeng-lts/api';

import { DataUtil } from './../../shared/DataUtil';
import { stringify } from 'querystring';


@Component({
  selector: 'app-editar-indisponibilidade',
  templateUrl: './editar-indisponibilidade.component.html',
  styleUrls: ['./editar-indisponibilidade.component.css']
})
export class EditarIndisponibilidadeComponent implements AfterViewInit {

  fg: FormGroup;

  fg2: FormGroup;


  @Input() indisponibilidade;
  @Input() contrato;
  @Input() prefixo;
  @Input() base;
  locale_pt: any;

  @Output() retorno = new EventEmitter();

  grupos: FormGroup[];

  constructor(private api: ApiService, private fb: FormBuilder) { }
  ngAfterViewInit(): void {
    this.locale_pt = this.api.getLocale('pt');
    this.createForm();
  }

  createMemberGroup(member: any): FormGroup {
    return this.fb.group({
      ...member,
    });
  }

  // ngOnInit(): void {

  // }



  private createForm(): void {



    this.fg = this.createMemberGroup(this.indisponibilidade);

    this.indisponibilidade.Ocorrencias.forEach(element => {
      let grupo = this.createMemberGroup(element);
      element.Grupo = grupo;
    });


    this.fg2 = this.fb.group({
      tableRowArray: this.fb.array([])
    });


    this.indisponibilidade.Ocorrencias.forEach(element => {

      let grupo = this.createMemberGroup(element);

      this.tableRowArray.push(grupo);
    })
  }

  get tableRowArray(): FormArray {
    return this.fg2.get('tableRowArray') as FormArray;
  }

  addNewRow(): void {
    this.tableRowArray.push(this.createMemberGroup(this.createTableRow()));
  }
  createTableRow(): Object {
    return {
      Atualizacao: null,
      BaseDeOperacao: null,
      Inicio: null,
      Penaliza: false,
      Substituto: null,
      Termino: null,
      Id: null,
    };
  }

  onDeleteRow(rowIndex: number): void {
    let item = this.tableRowArray.controls[rowIndex].value;
    item.Ativo = false;
    this.tableRowArray.removeAt(rowIndex);
  }

  cancelar() {
    this.indisponibilidade.Exibir = false;
  }

excluir(){
  this.salvar(true);
}


  salvar(excluir : boolean ) {
    let postagem =Object.assign({}, this.fg.value);
    postagem.Ativo = !excluir;
    //postagem.Contrato = this.fg.value.Contrato;
    postagem.Inicio = DataUtil.ParaDataISO(this.fg.value.Inicio);
    postagem.Fim = DataUtil.ParaDataISO(this.fg.value.Fim);

    postagem.Ocorrencias = [];
    this.tableRowArray.controls.forEach(x => {
      let item = Object.assign({}, x.value);

      item.Inicio = DataUtil.ParaDataISO(item.Inicio);
      item.Termino = DataUtil.ParaDataISO(item.Termino);
      item.Indisponibilidade = { Id : postagem.Id };

      postagem.Ocorrencias.push(item);
    });

    


    this.api.postCrudIndisponibilidade(postagem).then( x=> 
      {
        this.indisponibilidade.Exibir = false;
        this.indisponibilidade = x;
        this.retorno.emit("OK");    
      }
    )

  }

}