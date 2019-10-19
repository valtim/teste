import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { DiarioBordoComponent } from './relatorio-voo/relatorio-voo-search/diario-bordo.component';
import { LoadingComponent } from './loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
import { DiarioEditarComponent } from './relatorio-voo/relatorio-voo-editar/diario-editar.component';
import { BibliotecaComponent } from './gerenciar/biblioteca/biblioteca.component';
import { PapeletaComponent } from './papeleta/papeleta/papeleta.component';
import { PagamentoComponent } from './pagamento/pagamento/pagamento.component';
import { TrocaSenhaComponent } from './troca-senha/troca-senha.component';
import { VencimentoCarteiraComponent } from './vencimento-carteira/vencimento-carteira.component';
import { EscalaPrevistaDiariaComponent } from './escala-prevista-diaria/escala-prevista-diaria.component';
import { MessageComponent } from './message/message.component';
import { TripulanteListaComponent } from './tripulante/tripulante-lista/tripulanteLista.component';
import { TripulanteComponent } from './tripulante/tripulante/tripulante.component';
import { LocalidadeComponent } from './localidade/localidade.component';
import { PaginacaoComponent } from './paginacao/paginacao.component';
import { BlocoComponent } from './bloco/bloco.component';
import { SearchFilterPipe } from './pipe/SearchFilterPipe';
import { CertificadoComponent } from './certificado/certificado.component';
import { NovoTripulanteComponent } from './tripulante/novo-tripulante/novo-tripulante.component';
import { UsuarioListaComponent } from './usuario/usuario-lista/usuario-lista.component';
import { UsuarioComponent } from './usuario/usuario/usuario.component';
import { FadigaComponent } from './fadiga/fadiga.component';
import { EscalaTrabalhoComponent } from './escala-trabalho/escala-trabalho.component';
import { TipoPerguntaListComponent } from './tipo-pergunta/tipo-pergunta-list/tipo-pergunta-list.component';
import { PerguntaComponent } from './pergunta/pergunta.component';
import { RelatorioVooPeriodoComponent } from './relatorio-voo/relatorio-voo-periodo/relatorio-voo-periodo.component';
import { ControleDePendenciasComponent } from './controle-de-pendencias/controle-de-pendencias.component';
import { FormataDataPipe } from './formata-data.pipe';
import { TratamentoDaFadigaComponent } from './tratamento-da-fadiga/tratamento-da-fadiga.component';
import { RelatorioVooBloqueadoComponent } from './relatorio-voo/relatorio-voo-bloqueado/relatorio-voo-bloqueado.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DiarioBordoComponent,
    LoadingComponent,
    DiarioEditarComponent,
    BibliotecaComponent,
    PapeletaComponent,
    PagamentoComponent,
    TrocaSenhaComponent,
    VencimentoCarteiraComponent,
    EscalaPrevistaDiariaComponent,
    MessageComponent,
    TripulanteListaComponent,
    TripulanteComponent,
    LocalidadeComponent,
    PaginacaoComponent,
    BlocoComponent,
    SearchFilterPipe,
    CertificadoComponent,
    NovoTripulanteComponent,
    UsuarioListaComponent,
    UsuarioComponent,
    FadigaComponent,
    EscalaTrabalhoComponent,
    TipoPerguntaListComponent,
    PerguntaComponent,
    RelatorioVooPeriodoComponent,
    ControleDePendenciasComponent,
    FormataDataPipe,
    TratamentoDaFadigaComponent,
    RelatorioVooBloqueadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TextMaskModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
