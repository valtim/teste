import { PaxTransportadosComponent } from './relatorios/pax-transportados/pax-transportados.component';
import { DocumentoImpressoComponent } from './documento-impresso/documento-impresso.component';
import { AnaliseDeRiscoComponent } from './analise-de-risco/analise-de-risco.component';
import { GraficoComponent } from './grafico/grafico.component';
import { TripulanteComponent } from './reg-trip/tripulante/tripulante.component';
import { TratamentoDaFadigaComponent } from './controle-da-fadiga/tratamento-da-fadiga/tratamento-da-fadiga.component';
import { VencimentoCarteiraComponent } from './reg-trip/vencimento-carteira/vencimento-carteira.component';
import { ComunicarTripulantesComponent } from './controle-da-fadiga/comunicar-tripulantes/comunicar-tripulantes.component';
import { TrocaSenhaComponent } from './seguranca/troca-senha/troca-senha.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './seguranca/login/login.component';
import { FadigaComponent } from './controle-da-fadiga/fadiga/fadiga.component';
import { AuthGuardService } from './shared/guards/auth-guard.service';


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
