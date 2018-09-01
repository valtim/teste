import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { GerenciamentoComponent } from './gerenciamento/gerenciamento.component';
import { SonoComponent } from './pesquisa/sono/sono.component';
import { QuestionarioComponent } from './pesquisa/questionario/questionario.component';
import { IntensidadeSonoComponent } from './pesquisa/intensidade-sono/intensidade-sono.component';
import { ReporteVoluntarioComponent } from './reporte/reporte-voluntario/reporte-voluntario.component';
import { ContribuiramFadigaComponent } from './reporte/contribuiram-fadiga/contribuiram-fadiga.component';
import { SinaisFisiologicosComponent } from './reporte/sinais-fisiologicos/sinais-fisiologicos.component';
import { SinaisCognitivosComponent } from './reporte/sinais-cognitivos/sinais-cognitivos.component';
import { ContramedidasComponent } from './reporte/contramedidas/contramedidas.component';
import { ConsideracoesFinaisComponent } from './reporte/consideracoes-finais/consideracoes-finais.component';


const routes: Routes = [
  { path: 'resultado', component: ResultadoComponent },
  { path: 'sono', component: SonoComponent },
  { path: 'questionario', component: QuestionarioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'intensidade-sono', component: IntensidadeSonoComponent },
  { path: 'reporte-voluntario', component: ReporteVoluntarioComponent },
  { path: 'contribuiram-fadiga', component: ContribuiramFadigaComponent },
  { path: 'sinais-fisiologicos', component: SinaisFisiologicosComponent },
  { path: 'sinais-cognitivos', component: SinaisCognitivosComponent },
  { path: 'contramedidas', component: ContramedidasComponent },
  { path: 'consideracoes-finais', component: ConsideracoesFinaisComponent },
  { path: '', component: GerenciamentoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
