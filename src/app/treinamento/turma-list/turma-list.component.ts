import { Component, OnInit, isDevMode } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Turma } from 'src/app/models/Turma';
import { TurmaAluno } from 'src/app/models/TurmaAluno';
import { _ClasseBasica } from 'src/app/models/_ClasseBasica';
import { ApiTurmasService } from 'src/app/shared/api.turmas.service';

@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.css'],
  providers: [MessageService]
})
export class TurmaListComponent implements OnInit {
  treinamentos: any;
  equipamentos: any;
  instrutores: any;
  deslocamentos: any;
  tripulantes: any;


  turmaSelecionada: Turma;

  displayModal = false;
  paraExcluir = [];

  dataIni: Date;
  dataFim: Date;

  loading:boolean = false;
  locale_pt: any;
  loadingListas: boolean = true;
  tiposDeAnexo: any[];

  constructor(private api: ApiTurmasService,
    private messageService: MessageService) {
    this.locale_pt = this.api.getLocale('pt');
  }

  turmas: Array<Turma>;

  turmasFiltro: Array<Turma>;

  ngOnInit(): void {

    this.dataIni = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    this.dataFim = new Date(new Date().getFullYear(), new Date().getMonth() + 3, 1);
    this.dataFim.setDate(this.dataFim.getDate() - 1);

    if (isDevMode()) {
      this.dataIni = new Date(2023, 3, 1);
      this.dataFim = new Date(2023, 3, 30);
    }


    this.api.getTurmasListas().then(x => {
      this.treinamentos = x.Treinamentos;
      this.equipamentos = x.Equipamentos;
      this.instrutores = x.Instrutores;
      this.tripulantes = x.Tripulantes.map(x => new TurmaAluno(x));
      this.deslocamentos = x.Deslocamentos;
      this.tiposDeAnexo = x.TiposDeAnexo;
      this.loadingListas = false;
    })

    //this.rodarRelatorio();
  }

  filtro = '';

  get Totais() {
    let totais = { TempoDeCurso: 0, TempoDeCursoNoturno: 0 };
    this.turmasFiltro.forEach(x => {
      totais.TempoDeCurso += parseInt(x.TempoDeCurso.split(':')[0])
      totais.TempoDeCursoNoturno += parseInt(x.TempoDeCursoNoturno.split(':')[0])
    })
    return totais;
  }

  filtrar() {
    this.turmasFiltro = this.turmas.filter(x => x.Filtro.indexOf(this.filtro.toUpperCase()) > -1);
  }



  rodarRelatorio() {
    this.loading = true;
    this.api.getTurmasByData(this.dataIni, this.dataFim).then(x => {

      this.turmas = [];

      x.Turmas.forEach((turma, index_turma) => {
        let dataFinal = '';
        turma.PeriodosDeCurso.forEach((periodo, index_periodo) => {
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

              this.turmas = x.Turmas.map(x => new Turma(x));
              this.turmasFiltro = x.Turmas.map(x => new Turma(x));
            }
          }
        });
      });

      this.turmasFiltro = this.turmasFiltro.map(x => new Turma(x));

      this.loading = false;
    })
      .catch((e) => {
        this.treinamentos = null;
        this.loading = false;
        alert('Erro ao Rodar Consulta no Banco\n' + e.message);
      })
  }

  novaTurma() {
    let turma = new Turma(null);
    turma.Id = this.api.newGuid();
    turma.Novo = true;
    this.editar(turma);
    //this.displayModal = true;
  }

  excluir() {
    this.api.deleteTurmas(this.paraExcluir).then(x => {
      alert('Turmas Excluídas com sucesso');
    })
  }

  editar(turma) {
    this.turmaSelecionada = turma;
  }

  ocultar(e) {

    if (e.Cancelar) { return; }
    // if (e.Salvo)
    //   this.messageService.add({ severity: 'success', summary: 'SOl', detail: `A turma foi salva com sucesso!` });

    if ( e.Salvar && e.Turma.Novo){
      this.turmas.splice(0, 0, e.Turma);
    }

    if (e.Salvar) {
      let idx = this.turmas.findIndex(x => x.Id == e.Turma.Id);
      this.turmas = this.turmas.filter(x => x.Id != e.Turma.Id);
      this.turmas.splice(idx, 0, e.Turma);
      this.filtrar();
    }

    if (!e.Fechar) { return; }

    this.turmaSelecionada = undefined;
  }

}
