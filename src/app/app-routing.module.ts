import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DiarioBordoComponent } from './diario/diario-bordo/diario-bordo.component';
import { DiarioEditarComponent } from './diario/diario-editar/diario-editar.component';
import { BibliotecaComponent } from './gerenciar/biblioteca/biblioteca.component';
import { PapeletaComponent } from './papeleta/papeleta/papeleta.component';
import { PagamentoComponent } from './pagamento/pagamento/pagamento.component';
import { VencimentoCarteiraComponent } from './vencimento-carteira/vencimento-carteira.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { EscalaPrevistaDiariaComponent } from './escala-prevista-diaria/escala-prevista-diaria.component';
import { TripulanteComponent } from './tripulante/tripulante.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'publicacao',
    component: BibliotecaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'papeleta',
    component: PapeletaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'relatorio-pagamento',
    component: PagamentoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'relatorio-voo',
    component: DiarioBordoComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'relatorio-voo/novo',
    component: DiarioEditarComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'relatorio-voo/editar',
    component: DiarioEditarComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'vencimento-carteira',
    component: VencimentoCarteiraComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'escala-prevista',
    component: EscalaPrevistaDiariaComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'tripulante',
    component: TripulanteComponent,
    canActivate: [AuthGuardService]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuardService
  ]
})
export class AppRoutingModule { }
