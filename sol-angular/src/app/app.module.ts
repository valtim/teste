import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { GerenciamentoComponent } from './gerenciamento/gerenciamento.component';
import { ReporteVoluntarioComponent } from './reporte/reporte-voluntario/reporte-voluntario.component';
import { SonoComponent } from './pesquisa/sono/sono.component';
import { QuestaoComponent } from './pesquisa/questao/questao.component';
import { QuestionarioComponent } from './pesquisa/questionario/questionario.component';
import { IntensidadeSonoComponent } from './pesquisa/intensidade-sono/intensidade-sono.component';
import { QuestaoSonoComponent } from './pesquisa/questao-sono/questao-sono.component';
import { ContribuiramFadigaComponent } from './reporte/contribuiram-fadiga/contribuiram-fadiga.component';
import { SinaisFisiologicosComponent } from './reporte/sinais-fisiologicos/sinais-fisiologicos.component';
import { SinaisCognitivosComponent } from './reporte/sinais-cognitivos/sinais-cognitivos.component';
import { ContramedidasComponent } from './reporte/contramedidas/contramedidas.component';
import { ConsideracoesFinaisComponent } from './reporte/consideracoes-finais/consideracoes-finais.component';
import { LoginGerenciaComponent } from './gerencia/login-gerencia/login-gerencia.component';
import { StatusTripulanteComponent } from './gerencia/status-tripulante/status-tripulante.component';
import { InfoTripulanteComponent } from './gerencia/info-tripulante/info-tripulante.component';

@NgModule({
  declarations: [
    AppComponent,
    SonoComponent,
    LoginComponent,
    QuestaoComponent,
    QuestionarioComponent,
    ResultadoComponent,
    GerenciamentoComponent,
    IntensidadeSonoComponent,
    QuestaoSonoComponent,
    ReporteVoluntarioComponent,
    ContribuiramFadigaComponent,
    SinaisFisiologicosComponent,
    SinaisCognitivosComponent,
    ContramedidasComponent,
    ConsideracoesFinaisComponent,
    LoginGerenciaComponent,
    StatusTripulanteComponent,
    InfoTripulanteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
