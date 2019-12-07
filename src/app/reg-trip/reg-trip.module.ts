import { SharedModule } from './../shared/shared.module';
import { VencimentoCarteiraComponent } from './vencimento-carteira/vencimento-carteira.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UltimasOcorrenciasComponent } from './ultimas-ocorrencias/ultimas-ocorrencias.component';



@NgModule({
  declarations: [VencimentoCarteiraComponent, UltimasOcorrenciasComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RegTripModule { }
