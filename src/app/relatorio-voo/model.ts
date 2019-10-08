export interface Prefixo {
  Id: string;
  PrefixoCompleto: string;
}

export interface OnlyId {
  Id: string;
}

export interface Linha {
  DiarioDeBordo: OnlyId;
  Origem?: any;
  Destino?: any;
  Abastecedora?: any;
  Comandante: OnlyId;
  PrimeiroOficial: OnlyId;
  Cliente: OnlyId;
  AeroportoDeOrigem?: any;
  FuncaoTrip1?: any;
  FuncaoTrip2?: any;
  TipoDeOperacao?: any;
  NascerDoSol: Date;
  PorDoSol: Date;
  OrigemDeclarada?: any;
  DestinoDeclarado?: any;
  Partida: string;
  Decolagem: string;
  Pouso: string;
  Corte: string;
  Pax: number;
  Carga: number;
  Natureza?: any;
  Pousos: number;
  Ciclos: number;
  FuelDec: number;
  FuelPou: number;
  QuantidadeAbastecida: number;
  NotaDeAbastecimento?: any;
  IFRC: string;
  IFRR: string;
  Noturno: string;
  ConsumoDeCombustivel: number;
  PlanoDeManutencao: boolean;
  OrdemDeExibicao: number;
  DecolagemNoturna: boolean;
  PousoNoturno: boolean;
  PousoOffshore: boolean;
  VooIFR: boolean;
  Ativo: boolean;
  Atualizacao: Date;
  Sincronizacao: Date;
  Id: string;
  Diurno: string;
  total: string;
  vfr: string;
}

export interface Procedimento {
  Diurno1p: number;
  Noturno1p: number;
  Diurno2p: number;
  Noturno2p: number;
  Diurno3p: number;
  Noturno3p: number;
  Diurno4p: number;
  Noturno4p: number;
}

export interface Diario {
  Prefixo: Prefixo;
  Trip1: OnlyId;
  Trip2: OnlyId;
  Trip3: OnlyId;
  Trip4: OnlyId;
  Linhas: Linha[];
  ProcedimentosExecutados?: any;
  Procedimentos: Procedimento[];
  PermiteAlteracao: boolean;
  NumeroDoDiario: string;
  NumeroDaFolha: string;
  Fechado: boolean;
  DataDoDiario: string;
  Cancelada: boolean;
  Ocorrencias?: any;
  Validado: boolean;
  Bloqueado: boolean;
  ComputadoCTM: boolean;
  OAT?: any;
  Q?: any;
  N1_1?: any;
  N1_2?: any;
  T5_1?: any;
  T5_2?: any;
  RPM?: any;
  TGT?: any;
  BaseDeOperacao?: any;
  Ativo: boolean;
  Atualizacao: Date;
  Sincronizacao: Date;
  Id: string;
  Refeicao1: string;
  HoraDeApresentacao1: string;
  Refeicao2: string;
  HoraDeApresentacao2: string;
  Refeicao3: string;
  HoraDeApresentacao3: string;
  Refeicao4: string;
  HoraDeApresentacao4: string;
}

export interface Bloco {
  Numero: string;
  FolhaInicial: number;
  FolhaFinal: number;
}

export interface RootObject {
  DiarioDeBordo: OnlyId;
  Origem?: any;
  Destino?: any;
  Abastecedora: OnlyId;
  Comandante: OnlyId;
  PrimeiroOficial: OnlyId;
  Cliente: OnlyId;
  AeroportoDeOrigem?: any;
  FuncaoTrip1: OnlyId;
  FuncaoTrip2: OnlyId;
  TipoDeOperacao: OnlyId;
  NascerDoSol: Date;
  PorDoSol: Date;
  OrigemDeclarada: string;
  DestinoDeclarado: string;
  Partida: Date;
  Decolagem: Date;
  Pouso: Date;
  Corte: Date;
  Pax: number;
  Carga: number;
  Natureza: string;
  Pousos: number;
  Ciclos: number;
  FuelDec: number;
  FuelPou: number;
  QuantidadeAbastecida: number;
  NotaDeAbastecimento: string;
  IFRC: Date;
  IFRR: Date;
  Noturno: Date;
  ConsumoDeCombustivel: number;
  PlanoDeManutencao: boolean;
  OrdemDeExibicao: number;
  DecolagemNoturna: boolean;
  PousoNoturno: boolean;
  PousoOffshore: boolean;
  VooIFR: boolean;
  Ativo: boolean;
  Atualizacao: Date;
  Sincronizacao: Date;
  Id: string;
}
