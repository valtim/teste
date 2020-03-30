// import { AppModule } from './../app.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormataDataPipe } from './pipe/formata-data.pipe';
import { ConfirmacaoComponent } from './confirmacao/confirmacao.component';
import { TituloComponent } from './titulo/titulo.component';
// import { ListboxModule } from 'primeng/listbox';

@NgModule({
  declarations: [
    TituloComponent,
    ConfirmacaoComponent,
    FormataDataPipe, 
    // TituloComponent
  ],
  exports: [
    TituloComponent,
    ConfirmacaoComponent,
    FormataDataPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    // AppModule,
    // ListboxModule
  ],
})
export class SharedModule { }
