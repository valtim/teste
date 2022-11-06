import { Component, OnInit } from '@angular/core';
import { HoraTurma } from 'src/app/models/HoraTurma';
import { Turma } from 'src/app/models/Turma';
import { _ClasseBasica } from 'src/app/models/_ClasseBasica';
import { ApiTurmasService } from 'src/app/shared/api.turmas.service';

@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.css'],
})
export class TurmaListComponent implements OnInit {
  treinamentos: any;
  equipamentos: any;
  instrutores: any;
  deslocamentos: any;
  tripulantes: any;


  displayModal = false;
  paraExcluir = [];

  dataIni: Date;
  dataFim: Date;

  loading = true;
  locale_pt: any;

  constructor(private api: ApiTurmasService) {
    this.locale_pt = this.api.getLocale('pt');
  }

  turmas: Array<Turma> = [];

  ngOnInit(): void {

    this.dataIni = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.dataFim = new Date(new Date().getFullYear(), new Date().getMonth() + 3, 1);
    this.dataFim.setDate(this.dataFim.getDate() - 1);

    this.rodarRelatorio();
  }

  rodarRelatorio() {
    this.loading = true;
    this.api.getTurmasByData(this.dataIni, this.dataFim).then(x => {
      this.treinamentos = x.Treinamentos;
      this.equipamentos = x.Equipamentos;
      this.instrutores = x.Instrutores;
      this.tripulantes = x.Tripulantes;
      this.deslocamentos = x.Deslocamentos;

      this.turmas = [];
      this.turmas = x.Turmas;
      this.loading = false;


      // if (x.Turmas.length == 0) {
      //   this.loading = false;
      // } else {
      //   x.Turmas.forEach((turma, index) => {
      //     turma.indexStatus = 'index' + index;
      //     turma.Carregada = true;
      //     if (index == (x.Turmas.length - 1)) {
      //     }
      //   });
      // }
    })
  }

  novaTurma() {
    let turma = new Turma();
    turma.Id = this.api.newGuid()
    turma.Display = true;
    turma.Novo = true;

    this.turmas.push(turma);
    this.editar(turma.Id);
    //this.displayModal = true;
  }

  excluir() {
    this.api.deleteTurmas(this.paraExcluir).then(x => {
      alert('Turmas Excluídas com sucesso');
    })
  }

  editar(id) {
    this.turmas.find(x => x.Id == id).Display = true;
    this.displayModal = true;
  }

  ocultar(e) {
    let turma = this.turmas.find(x => x.Id == e.Id);
    Object.assign(turma, e);
    turma.Display = false;
    turma.Novo = false;
    this.displayModal = false;
    if (e.DialogResult == 'OK') {
      Object.assign(turma, e);
    }
    if (e.Novo == true) {
      this.turmas = this.turmas.filter(x => x.Id != e.Id);
    }
  }

}
