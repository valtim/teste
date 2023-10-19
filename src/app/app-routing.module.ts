import { LoginLdapComponent } from './login-ldap/login-ldap.component';
import { RelVencimentoTreinamentoComponent } from './relatorios/rel-vencimento-treinamento/rel-vencimento-treinamento.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuardService } from "./shared/guards/auth-guard.service";

import { HomeComponent } from "./home/home.component";
import { LogoffComponent } from "./logoff/logoff.component";
import { LoginComponent } from "./seguranca/login/login.component";
import { TrocaSenhaComponent } from "./seguranca/troca-senha/troca-senha.component";

import { VoosRealizadosComponent } from "./relatorios/voos-realizados/voos-realizados.component";
import { RelListaRdvComponent } from "./relatorios/rel-lista-rdv/rel-lista-rdv.component";
import { RelRdvComponent } from "./relatorios/rel-rdv/rel-rdv.component";
import { RelBocaComponent } from "./relatorios/rel-boca/rel-boca.component";
import { HorasVoadasTripulanteComponent } from "./relatorios/horas-voadas-tripulante/horas-voadas-tripulante.component";
import { HorasVoadasQuinzenaComponent } from "./relatorios/horas-voadas-quinzena/horas-voadas-quinzena.component";
import { RelConsCombComponent } from "./relatorios/rel-cons-comb/rel-cons-comb.component";
import { RelPousoComponent } from "./relatorios/rel-pouso/rel-pouso.component";
import { PaxTransportadosComponent } from "./relatorios/pax-transportados/pax-transportados.component";
import { DocumentoImpressoComponent } from "./documento-impresso/documento-impresso.component";
import { AnaliseDeRiscoComponent } from "./relatorios/analise-de-risco/analise-de-risco.component";
import { TratamentoDaFadigaComponent } from "./controle-da-fadiga/tratamento-da-fadiga/tratamento-da-fadiga.component";
import { ComunicarTripulantesComponent } from "./controle-da-fadiga/comunicar-tripulantes/comunicar-tripulantes.component";
import { FadigaComponent } from "./controle-da-fadiga/fadiga/fadiga.component";
import { VencimentoCarteiraComponent } from "./relatorios/vencimento-carteira/vencimento-carteira.component";
import { MotivoDaIndisponibilidadeComponent } from "./cadastro/motivo-da-indisponibilidade/motivo-da-indisponibilidade.component";
import { MotivoDoErroNoPreenchimentoComponent } from "./cadastro/motivo-do-erro-no-preenchimento/motivo-do-erro-no-preenchimento.component";
import { ObservacaoDbComponent } from "./cadastro/observacao-db/observacao-db.component";
import { TipoDeOcorrenciaComponent } from "./cadastro/tipo-de-ocorrencia/tipo-de-ocorrencia.component";
import { EscalaMensalComponent } from "./escala/escala-mensal/escala-mensal.component";
import { ListarJornadaComponent } from "./administracao/listar-jornada/listar-jornada.component";
import { GerenciarTripulantesComponent } from "./administracao/gerenciar-tripulantes/gerenciar-tripulantes.component";
import { QuinzenaComponent } from "./cadastro/quinzena/quinzena.component";
import { TrilhoComponent } from "./escala/trilho/trilho.component";
import { EscalaDoDiaComponent } from "./escala/escala-do-dia/escala-do-dia.component";
import { DuplaComponent } from "./escala/dupla/dupla.component";
import { EscalaSemanalComponent } from "./escala/escala-semanal/escala-semanal.component";
import { ErrosNoDbComponent } from "./relatorios/erros-no-db/erros-no-db.component";
import { ListaInformativoComponent } from "./cadastro/lista-informativo/lista-informativo.component";
import { IncompatibilidadeComponent } from "./cadastro/incompatibilidade/incompatibilidade.component";
import { AgendaComponent } from "./treinamento/agenda/agenda.component";
import { TurmaListComponent } from "./treinamento/turma-list/turma-list.component";
import { TreinamentoListComponent } from "./treinamento/treinamento-list/treinamento-list.component";
import { BuscaBiComponent } from "./bi/busca-bi/busca-bi.component";
import { DeslocamentoComponent } from "./cadastro/deslocamento/deslocamento.component";
import { ModificadorComponent } from "./cadastro/modificador/modificador.component";
import { GraficoFadigaComponent } from "./grafico-fadiga/grafico-fadiga.component";
import { ControleDeAcessoEditComponent } from "./cadastro/controle-de-acesso-edit/controle-de-acesso-edit.component";
import { RelStatusDaFrotaComponent } from "./relatorios/rel-status-da-frota/rel-status-da-frota.component";
import { RelDiarioHorasVoadasComponent } from "./relatorios/rel-diario-horas-voadas/rel-diario-horas-voadas.component";
import { ControleDeTripulantesComponent } from "./relatorios/controle-de-tripulantes/controle-de-tripulantes.component";
import { RelEscalaPtbrComponent } from "./relatorios/rel-escala-ptbr/rel-escala-ptbr.component";
import { RelControleSpotComponent } from "./relatorios/rel-controle-spot/rel-controle-spot.component";
import { CrudComponent } from "./cadastro/crud/crud.component";
import { MotivoDoAtrasoComponent } from "./cadastro/motivo-do-atraso/motivo-do-atraso.component";
import { RelPontualidadeComponent } from "./relatorios/rel-pontualidade/rel-pontualidade.component";
import { RelIndisponibilidadeComponent } from "./relatorios/rel-indisponibilidade/rel-indisponibilidade.component";
import { RelCdoComponent } from "./relatorios/rel-cdo/rel-cdo.component";
import { CadastroDeEmailReporteComponent } from "./controle-da-fadiga/cadastro-de-email-reporte/cadastro-de-email-reporte.component";
import { IndisponibilidadeComponent } from "./cadastro/indisponibilidade/indisponibilidade.component";
import { ContratoComponent } from "./cadastro/contrato/contrato.component";
import { ImprimirJornadaNovoComponent } from "./administracao/validar-jornada/validar-jornada.component";
import { ControleDeAcessoComponent } from "./cadastro/controle-de-acesso/controle-de-acesso.component";
import { GrupoDePerguntaComponent } from "./cadastro/grupo-de-pergunta/grupo-de-pergunta.component";
import { FichaDeAvaliacaoComponent } from "./cadastro/ficha-de-avaliacao/ficha-de-avaliacao.component";
import { FichaDeAvaliacaoEditComponent } from "./cadastro/ficha-de-avaliacao-edit/ficha-de-avaliacao-edit.component";
import { FichaDeAvaliacaoItemComponent } from "./cadastro/ficha-de-avaliacao-item/ficha-de-avaliacao-item.component";
import { InstrutorComponent } from "./treinamento/instrutor/instrutor.component";
import { DuplaAdmComponent } from "./escala/dupla-adm/dupla-adm.component";
import { BlocoComponent } from "./cadastro/bloco/bloco.component";
import { RelMedicaoComponent } from "./relatorios/rel-medicao/rel-medicao.component";
import { BaseDoTripulanteComponent } from './cadastro/base-do-tripulante/base-do-tripulante.component';
import { CadastroEmailCdoComponent } from './cadastro/cadastro-email-cdo/cadastro-email-cdo.component';
import { ApontamentoComponent } from "./relatorios/apontamento/apontamento.component";
import { OrdenarCertificadoComponent } from './treinamento/ordenar-certificado/ordenar-certificado.component';
import { EmailEscalaComponent } from './escala/email-escala/email-escala.component';
import { EmailDiarioFadigaComponent } from './cadastro/email-diario-fadiga/email-diario-fadiga.component';
import { CcoComponent } from './painel/cco/cco.component';
import { LoggingComponent } from './seguranca/logging/logging.component';
import { JornadaDiariaComponent } from './escala/jornada-diaria/jornada-diaria.component';
import { RelatorioAlunoComponent } from './treinamento/relatorio-aluno/relatorio-aluno.component';

const routes: Routes = [
  { path: "", component: LoginLdapComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  // { path: "home", component: HomeComponent },
  { path: "troca-senha", component: TrocaSenhaComponent },
  { path: "logoff", component: LogoffComponent },
  {
    path: "fadiga",
    component: FadigaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "observacao-db",
    component: ObservacaoDbComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "motivo-do-erro-no-preenchimento",
    component: MotivoDoErroNoPreenchimentoComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: "agenda-de-treinamento",
    component: AgendaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "turmas",
    component: TurmaListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "tipo-de-certificado",
    component: TreinamentoListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "quadro-de-tripulantes",
    component: VencimentoCarteiraComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "quadro-de-tripulantes-readonly",
    component: VencimentoCarteiraComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: "fadiga",
    component: FadigaComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: "fadiga/:data",
    component: FadigaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "comunicar-tripulantes/:data",
    component: ComunicarTripulantesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "tratamento-da-fadiga/:id",
    component: TratamentoDaFadigaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "deslocamento",
    component: DeslocamentoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "analise-de-risco",
    component: AnaliseDeRiscoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "visualizar-analise-de-risco/:id",
    component: AnaliseDeRiscoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "documento-impresso",
    component: DocumentoImpressoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "pax-transportados",
    component: PaxTransportadosComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "total-de-pousos",
    component: RelPousoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "rel-cons-comb",
    component: RelConsCombComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "rel-horas-quinzena",
    component: HorasVoadasQuinzenaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "rel-horas-tripulante",
    component: HorasVoadasTripulanteComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "rel-boca",
    component: RelBocaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "rel-rdv",
    component: RelListaRdvComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "rel-rdv/:id",
    component: RelRdvComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "voos-realizados",
    component: VoosRealizadosComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "status-da-frota",
    component: RelStatusDaFrotaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "rel-diario-horas-voadas",
    component: RelDiarioHorasVoadasComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "controle-de-tripulantes",
    component: ControleDeTripulantesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "rel-escala-ptbr",
    component: RelEscalaPtbrComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "rel-medicao",
    component: RelMedicaoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "apontamento",
    component: ApontamentoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "rel-controle-spot",
    component: RelControleSpotComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "crud/:tipo",
    component: CrudComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "motivo-do-atraso",
    component: MotivoDoAtrasoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "rel-pontualidade",
    component: RelPontualidadeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "rel-indisponibilidade",
    component: RelIndisponibilidadeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "rel-cdo",
    component: RelCdoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "cad-email-reporte",
    component: CadastroDeEmailReporteComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "cad-email-diario-fadiga",
    component: EmailDiarioFadigaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "cad-email-diario-cdo",
    component: CadastroEmailCdoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "cad-email-cdo",
    component: CadastroEmailCdoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "indisponibilidade",
    component: IndisponibilidadeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "motivo-da-indisponibilidade",
    component: MotivoDaIndisponibilidadeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "contrato",
    component: ContratoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "listar-jornada",
    component: ListarJornadaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "gerenciar-tripulantes",
    component: GerenciarTripulantesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "imprimir-jornada",
    component: ImprimirJornadaNovoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "escala-mensal",
    component: EscalaMensalComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "tipo-de-ocorrencia",
    component: TipoDeOcorrenciaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "quinzena",
    component: QuinzenaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "trilho",
    component: TrilhoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "escala-do-dia",
    component: EscalaDoDiaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "dupla",
    component: DuplaAdmComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "escala-semanal",
    component: EscalaSemanalComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "erros-no-db",
    component: ErrosNoDbComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "informativo",
    component: ListaInformativoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "incompatibilidade",
    component: IncompatibilidadeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "controle-de-acesso",
    component: ControleDeAcessoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "controle-de-acesso/:Id",
    component: ControleDeAcessoEditComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "controle-de-acesso/novo",
    component: ControleDeAcessoEditComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "modificador",
    component: ModificadorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "grafico-fadiga",
    component: GraficoFadigaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "email-escala",
    component: EmailEscalaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "grupo-de-pergunta",
    component: GrupoDePerguntaComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "ficha-de-avaliacao",
    component: FichaDeAvaliacaoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "ficha-de-avaliacao/novo",
    component: FichaDeAvaliacaoEditComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "ficha-de-avaliacao-edit",
    component: FichaDeAvaliacaoEditComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "ficha-de-avaliacao-item/:Id",
    component: FichaDeAvaliacaoItemComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'instrutor',
    component: InstrutorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'dupla-adm',
    component: DuplaAdmComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'bloco',
    component: BlocoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'vencimento-treinamento',
    component: RelVencimentoTreinamentoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'base-do-tripulante',
    component: BaseDoTripulanteComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'ordenar-certificado',
    component: OrdenarCertificadoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'occ-availability',
    component: CcoComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'busca-bi',
    component: BuscaBiComponent,
    canActivate: [AuthGuardService],
  },
  
  {
    path: 'registros-acesso',
    component: LoggingComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: "jornada-diaria",
    component: JornadaDiariaComponent,
    canActivate: [AuthGuardService],
  },
  
  {
    path: 'relatorio-aluno',
    component: RelatorioAlunoComponent,
    canActivate: [AuthGuardService],
  },
  
  {
    path: '**', pathMatch: 'full',
    component: LogoffComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
