import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SonoComponent } from './sono/sono.component';
import { LoginComponent } from './login/login.component';
import { QuestionarioComponent } from './questionario/questionario.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { GerenciamentoComponent } from './gerenciamento/gerenciamento.component';

const routes: Routes = [
  { path: 'resultado', component: ResultadoComponent },
  { path: 'sono', component: SonoComponent },
  { path: 'questionario', component: QuestionarioComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: GerenciamentoComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
