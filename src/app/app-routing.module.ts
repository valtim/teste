import { ContratoComponent } from './cadastro/contrato/contrato.component';
import { IndisponibilidadeComponent } from './cadastro/indisponibilidade/indisponibilidade.component';
import { CadastroDeEmailReporteComponent } from './controle-da-fadiga/cadastro-de-email-reporte/cadastro-de-email-reporte.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelControleDiarioDeOperacoesComponent } from './relatorios/rel-controle-diario-de-operacoes/rel-controle-diario-de-operacoes.component';
import { RelIndisponibilidadeComponent } from './relatorios/rel-indisponibilidade/rel-indisponibilidade.component';
import { RelAtrasoComponent } from './relatorios/rel-atraso/rel-atraso.component';
import { MotivoDoAtrasoComponent } from './cadastro/motivo-do-atraso/motivo-do-atraso.component';
import { RelControleSpotComponent } from './relatorios/rel-controle-spot/rel-controle-spot.component';
import { CrudComponent } from './crud/crud.component';
import { RelOperacaoDeSoloComponent } from './relatorios/rel-operacao-de-solo/rel-operacao-de-solo.component';
import { LogoffComponent } from './logoff/logoff.component';
import { RelEscalaPtbrComponent } from './relatorios/rel-escala-ptbr/rel-escala-ptbr.component';
import { ControleDeTripulantesComponent } from './relatorios/controle-de-tripulantes/controle-de-tripulantes.component';
import { RelDiarioHorasVoadasComponent } from './relatorios/rel-diario-horas-voadas/rel-diario-horas-voadas.component';
import { RelStatusDaFrotaComponent } from './relatorios/rel-status-da-frota/rel-status-da-frota.component';

import { VoosRealizadosComponent } from './relatorios/voos-realizados/voos-realizados.component';
import { RelListaRdvComponent } from './relatorios/rel-lista-rdv/rel-lista-rdv.component';
import { RelRdvComponent } from './relatorios/rel-rdv/rel-rdv.component';
import { RelBocaComponent } from './relatorios/rel-boca/rel-boca.component';
import { HorasVoadasTripulanteComponent } from './relatorios/horas-voadas-tripulante/horas-voadas-tripulante.component';
import { HorasVoadasQuinzenaComponent } from './relatorios/horas-voadas-quinzena/horas-voadas-quinzena.component';
import { RelConsCombComponent } from './relatorios/rel-cons-comb/rel-cons-comb.component';
import { RelPousoComponent } from './relatorios/rel-pouso/rel-pouso.component';
import { PaxTransportadosComponent } from './relatorios/pax-transportados/pax-transportados.component';
import { DocumentoImpressoComponent } from './documento-impresso/documento-impresso.component';
import { AnaliseDeRiscoComponent } from './relatorios/analise-de-risco/analise-de-risco.component';
import { GraficoComponent } from './grafico/grafico.component';
import { TratamentoDaFadigaComponent } from './controle-da-fadiga/tratamento-da-fadiga/tratamento-da-fadiga.component';
import { ComunicarTripulantesComponent } from './controle-da-fadiga/comunicar-tripulantes/comunicar-tripulantes.component';
import { TrocaSenhaComponent } from './seguranca/troca-senha/troca-senha.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './seguranca/login/login.component';
import { FadigaComponent } from './controle-da-fadiga/fadiga/fadiga.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';
import { VencimentoCarteiraComponent } from './relatorios/vencimento-carteira/vencimento-carteira.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'quadro-de-tripulantes', component: VencimentoCarteiraComponent, canActivate: [AuthGuardService] }, {
    path: 'fadiga',
    component: FadigaComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'troca-senha', component: TrocaSenhaComponent }, {
    path: 'fadiga',
    component: FadigaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'fadiga/:data',
    component: FadigaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'comunicar-tripulantes/:data',
    component: ComunicarTripulantesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tratamento-da-fadiga/:id',
    component: TratamentoDaFadigaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'grafico',
    component: GraficoComponent,
  },
  {
    path: 'analise-de-risco',
    component: AnaliseDeRiscoComponent,
  },
  {
    path: 'visualizar-analise-de-risco/:id',
    component: AnaliseDeRiscoComponent,
  },
  {
    path: 'documento-impresso',
    component: DocumentoImpressoComponent,
  },
  {
    path: 'pax-transportados',
    component: PaxTransportadosComponent,
  },
  {
    path: 'total-de-pousos',
    component: RelPousoComponent,
  },
  {
    path: 'rel-cons-comb',
    component: RelConsCombComponent,
  },
  {
    path: 'rel-horas-quinzena',
    component: HorasVoadasQuinzenaComponent,
  },
  {
    path: 'rel-horas-tripulante',
    component: HorasVoadasTripulanteComponent,
  },
  {
    path: 'rel-boca',
    component: RelBocaComponent,
  },
  {
    path: 'rel-rdv',
    component: RelListaRdvComponent,
  },
  {
    path: 'rel-rdv/:id',
    component: RelRdvComponent,
  },
  {
    path: 'voos-realizados',
    component: VoosRealizadosComponent,
  },
  {
    path: 'status-da-frota',
    component: RelStatusDaFrotaComponent,
  },
  {
    path: 'rel-diario-horas-voadas',
    component: RelDiarioHorasVoadasComponent,
  },
  {
    path: 'controle-de-tripulantes',
    component: ControleDeTripulantesComponent,
  },
  {
    path: 'rel-escala-ptbr',
    component: RelEscalaPtbrComponent,
  },
  {
    path: 'logoff',
    component: LogoffComponent,
  },
  {
    path: 'rel-operacao-de-solo',
    component: RelOperacaoDeSoloComponent,
  },
  {
    path: 'rel-controle-spot',
    component: RelControleSpotComponent,
  },
  {
    path: 'crud/:tipo',
    component: CrudComponent,
  },
  {
    path: 'motivo-do-atraso',
    component: MotivoDoAtrasoComponent,
  },
  {
    path: 'rel-pontualidade',
    component: RelAtrasoComponent,
  },
  {
    path: 'rel-indisponibilidade',
    component: RelIndisponibilidadeComponent,
  },
  {
    path: 'rel-cdo',
    component: RelControleDiarioDeOperacoesComponent,
  },
  {
    path: 'cad-email-reporte',
    component: CadastroDeEmailReporteComponent,
  },
  {
    path: 'indisponibilidade',
    component: IndisponibilidadeComponent,
  },
  {
    path: 'contrato',
    component: ContratoComponent,
  },

  //rel-horas-tripulante
  // {
  //   path: 'tripulante',
  //   component: TripulanteComponent,
  //   canActivate: [AuthGuardService]
  // },
  // {
  //   path: 'tripulante',
  //   component: TripulanteComponent,
  //   canActivate: [AuthGuardService]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
