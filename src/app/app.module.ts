import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { DiarioBordoComponent } from './diario/diario-bordo/diario-bordo.component';
import { LoadingComponent } from './loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
import { DiarioEditarComponent } from './diario/diario-editar/diario-editar.component';
import { BibliotecaComponent } from './gerenciar/biblioteca/biblioteca.component';
import { PapeletaComponent } from './papeleta/papeleta/papeleta.component';
import { PagamentoComponent } from './pagamento/pagamento/pagamento.component';
import { TrocaSenhaComponent } from './troca-senha/troca-senha.component';
import { VencimentoCarteiraComponent } from './vencimento-carteira/vencimento-carteira.component';
import { EscalaPrevistaDiariaComponent } from './escala-prevista-diaria/escala-prevista-diaria.component';
import { MenssageComponent } from './menssage/menssage.component';
import { TripulanteListaComponent } from './tripulante/tripulante-lista/tripulanteLista.component';
import { TripulanteComponent } from './tripulante/tripulante/tripulante.component';
import { LocalidadeComponent } from './localidade/localidade.component';
import { MaskLatitudeLongitudeDirective } from './directive/mask-latitude-longitude.directive';
import { PaginacaoComponent } from './paginacao/paginacao.component';

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
    MenssageComponent,
    TripulanteListaComponent,
    TripulanteComponent,
    LocalidadeComponent,
    MaskLatitudeLongitudeDirective,
    PaginacaoComponent
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
