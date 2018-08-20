import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SonoComponent } from './sono/sono.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { QuestionarioComponent } from './questionario/questionario.component';
import { QuestaoComponent } from './questao/questao.component';

@NgModule({
  declarations: [
    AppComponent,
    SonoComponent,
    LoginComponent,
    QuestaoComponent,
    QuestionarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
