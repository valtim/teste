import { Component, OnInit, isDevMode } from '@angular/core';
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

  turmasFiltro: Array<Turma> = [];

  ngOnInit(): void {

    this.dataIni = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.dataFim = new Date(new Date().getFullYear(), new Date().getMonth() + 3, 1);
    this.dataFim.setDate(this.dataFim.getDate() - 1);

    if (isDevMode()) {
      this.dataIni = new Date(2022, 0, 1);
      this.dataFim = new Date(2022, 0, 5);
    }

    this.rodarRelatorio();
  }

  filtro = '';

  filtrar(event) {
    this.turmasFiltro = this.turmas.filter(x => x.Filtro.indexOf(this.filtro.toUpperCase()) > -1);
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

      x.Turmas.forEach((turma,index_turma) => {
        let dataFinal = '';
        turma.PeriodosDeCurso.forEach((periodo,index_periodo) => {
          let dataStr = "";
  
          if (typeof periodo.Data == 'object')
            dataStr = periodo.Data.toISOString().split("T")[0];
          else
            dataStr = periodo.Data.split("T")[0];
  
          if (dataStr > dataFinal) {
            dataFinal = dataStr;
          }

          // promisse
          if (index_periodo == (turma.PeriodosDeCurso.length - 1)) {
            turma.DataDeFim = dataFinal;            
            if (index_turma == (x.Turmas.length - 1)) {
              
              this.turmas = x.Turmas;
              this.turmasFiltro = x.Turmas;
            }   
          }          
        });
      });
      
      this.loading = false;
    })
      .catch((e) => {
        this.treinamentos = null;
        this.loading = false;
        alert('Erro ao Rodar Consulta no Banco\n' + e.message);
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
    // if (e.Novo == true) {
    //   this.turmas = this.turmas.filter(x => x.Id != e.Id);
    // }
  }

}
