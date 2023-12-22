import { HoraTurma } from "./HoraTurma";
import { TurmaAluno } from "./TurmaAluno";


export class Turma {
  DatasDeDeslocamento: any;
  constructor(dados: Turma = null) {
    if (dados == null)
      return;
    this.Novo = dados.Novo;
    this.Id = dados.Id;
    this.Local = dados.Local;
    this.LocalReservado = dados.LocalReservado;
    this.Datas = dados.Datas;
    this.Concluido = dados.Concluido;
    this.Instrutor = dados.Instrutor;
    this.InstrutorExterno = dados.InstrutorExterno;
    this.Treinamento = dados.Treinamento;
    this.Equipamento = dados.Equipamento;
    //    this.Alunos = dados.Alunos;
    this.TurmasComentarios = dados.TurmasComentarios;
    this.HorasTurma = dados.HorasTurma.map(x => new HoraTurma(x));
    this.TurmaAluno = dados.TurmaAluno.map(x => new TurmaAluno(x));
    this.PeriodosDeCurso = dados.PeriodosDeCurso;
    this.Cancelado = dados.Cancelado;
    this.Deslocamentos = dados.Deslocamentos;
    this.DataDeInicio = dados.DataDeInicio;
    this.DataDeFim = dados.DataDeFim;
    this.TempoDeCurso = dados.TempoDeCurso;
    this.TempoDeCursoNoturno = dados.TempoDeCursoNoturno;

    this.Anexos = dados.Anexos;
    this.NRTs = dados.NRTs;
    this.SAEs = dados.SAEs;
    this.NECs = dados.NECs;


  }

  public get Status(): number {


    if (this.Concluido)
      return 5;

    if (this.NRTs.length > 0)
      return 4;

    if (this.TurmaAluno != null && this.TurmaAluno.filter(x => x.Notificado).length > 0)
      return 3;

    if (this.TurmaAluno != null && this.TurmaAluno.length > 0)
      return 2;

    if (this.Instrutor != null || this.InstrutorExterno)
      return 1;

    return 0;
  }

  public Novo: boolean = false;
  public Id: string = "";
  public Local: string = "";
  public LocalReservado: boolean = false;
  public Datas: any[] = [];
  public Concluido: boolean = false;
  public Instrutor: any;
  public InstrutorExterno: boolean = false;
  public Treinamento: any;
  public Equipamento: any;
  public Alunos: any[] = [];
  public TurmaAluno: TurmaAluno[] = [];
  public TurmasComentarios: any[] = [];
  public HorasTurma: HoraTurma[] = [];
  public PeriodosDeCurso: any[] = [];
  public Cancelado: boolean = false;
  public Deslocamentos: any[] = [];
  public Avanco: number = 0;
  public DataDeInicio: Date;
  public DataDeFim: Date;
  public TempoDeCurso: String = "";
  public TempoDeCursoNoturno: String = "";
  public Anexos: any[] = [];
  public NRTs: any[] = [];
  public SAEs: any[] = [];
  public NECs: any[] = [];
  public CargaHoraria: any;

  public Display: boolean = false;
  public TurmaStatus: any[] = [
    {
      Ordem: 1,
      Nome: 'Treinamento Agendado',
      DataEvento: null,
      Efetivada: false
    },
    {
      Ordem: 2,
      Nome: 'Instrutor Designado',
      DataEvento: null,
      Efetivada: false
    },
    {
      Ordem: 3,
      Nome: 'Alunos Matriculados',
      DataEvento: null,
      Efetivada: false
    },
    {
      Ordem: 4,
      Nome: 'Envolvidos Notificados',
      DataEvento: null,
      Efetivada: false
    },
    {
      Ordem: 5,
      Nome: 'NRT Cadastrada',
      DataEvento: null,
      Efetivada: false
    },
    {
      Ordem: 6,
      Nome: 'Treinamento Concluído',
      DataEvento: null,
      Efetivada: false
    }
  ];


  get Envolvidos() {
    var envolvidos = this.TurmaAluno.map(x => ({ Id: x.Aluno.Id, Trato: x.Aluno.Trato }));

    if (this.Instrutor != null) {
      const instrutor = { Id: this.Instrutor.Id, Trato: this.Instrutor.Trato };
      envolvidos.push(instrutor);
    }
    return envolvidos;
  }


  get ListaDeAlunos(): string {
    if (this.TurmaAluno == null)
      return "";
    if (this.TurmaAluno.length == 0)
      return "";
    return this.TurmaAluno.map(x => x.Aluno.Trato).join(', ');
  }

  get Filtro(): string {
    var itens = [];
    itens.push(this.Treinamento.Nome);
    if (this.Instrutor != null)
      itens.push(this.Instrutor.Trato);
    itens = itens.concat(this.TurmaAluno.map(y => y.Aluno.Trato));
    return itens.join(', ').toUpperCase();
  }


  getTurma() {
    return this;
  }

}