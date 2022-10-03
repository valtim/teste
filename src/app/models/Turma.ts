import { HoraTurma } from "./HoraTurma";
import { TurmaAluno } from "./TurmaAluno";


export class Turma {
  DatasDeDeslocamento: any;
  constructor() {
    //this.HorasTurma = this.HorasTurma.map(x=> Object.assign(new HoraTurma, x));
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
  public HorasTurma: Array<HoraTurma> = [];
  public TurmaStatus: any[];  
  public PeriodosDeCurso: any[] = [];
  public Cancelado: boolean = false;

  public Deslocamentos: any[] = [];

  public Avanco: number = 0;
  public DataDeInicio: Date;

  /*
  get diferenca(): number {

      if ( this.HorasTurma == undefined ) return 0;

      if ( this.HorasTurma.length == 0)
          return 0;

      var lista : Array<HoraTurma> = this.HorasTurma.map(x=> Object.assign(new HoraTurma, x));


      return lista.map(x=>x.diferenca).reduce((a, b) => a + b, 0)                
    }
    */

  //public TurmaStatus : any;
  public Anexos: any[] = [];
  public NRTs: any[] = [];
  public SAEs: any[] = [];
  public NECs: any[] = [];
  public CargaHoraria: any;

  public Display: boolean = false;


  /*public virtual string Local { get; set; }
          public virtual bool LocalReservado { get; set; }
          public virtual IList<DataTurma> Datas { get; set; }   
          public virtual DateTime InicioTreinamento { get; set; }
          public virtual DateTime FimTreinamento { get; set; }
          public virtual bool Concluido { get; set; } = false;
          //public virtual string Nrt { get; set; }
  
          public virtual Tripulante Instrutor { get; set; }
          public virtual Certificado Treinamento { get; set; }
          public virtual TipoDeAeronave TipoEquipamento { get; set; }  
          public virtual IList<Tripulante> Alunos { get; set; }
          public virtual IList<TurmasComentarios> TurmasComentarios { get; set; }
          public virtual IList<HoraTurma> HorasTurma { get; set; }
          public virtual IList<TurmaStatus> TurmaStatus { get; set; }
          public virtual IList<ArquivoTurma> Anexos { get; set; }
          public virtual IList<ArquivoNRT> NRTs { get; set; }
          */

  // setTurma(turma: any) {
  //     this = turma;
  //   }

  getTurma() {
    return this;
  }

}