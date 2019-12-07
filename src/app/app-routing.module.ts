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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
