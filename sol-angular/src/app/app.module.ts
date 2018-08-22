import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SonoComponent } from './sono/sono.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { QuestionarioComponent } from './questionario/questionario.component';
import { QuestaoComponent } from './questao/questao.component';
import { ResultadoComponent } from './resultado/resultado.component';

@NgModule({
  declarations: [
    AppComponent,
    SonoComponent,
    LoginComponent,
    QuestaoComponent,
    QuestionarioComponent,
    ResultadoComponent
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
