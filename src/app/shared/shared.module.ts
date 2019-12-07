import { FormataDataPipe } from './pipe/formata-data.pipe';
import { ConfirmacaoComponent } from './confirmacao/confirmacao.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TituloComponent } from './titulo/titulo.component';
@NgModule({
  declarations: [
    TituloComponent, 
    ConfirmacaoComponent, 
    FormataDataPipe
  ],
  exports:[
    TituloComponent, 
    ConfirmacaoComponent, 
    FormataDataPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
})
export class SharedModule { }
