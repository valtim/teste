import { TrocaSenhaComponent } from './troca-senha/troca-senha.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WaitComponent } from './wait/wait.component';
import { SOLSharedModule } from '../shared/sol.shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    TrocaSenhaComponent,
    WaitComponent,],
  imports: [
    CommonModule,
    FormsModule,
    SOLSharedModule,
  ],
})
export class SegurancaModule { }
