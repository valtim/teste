import { SharedModule } from './../shared/shared.module';
import { TrocaSenhaComponent } from './troca-senha/troca-senha.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    LoginComponent,
    TrocaSenhaComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    
    
  ],
})
export class SegurancaModule { }
