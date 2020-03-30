import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';

import { FadigaComponent } from './fadiga/fadiga.component';
import { TratamentoDaFadigaComponent } from './tratamento-da-fadiga/tratamento-da-fadiga.component';
import { ComunicarTripulantesComponent } from './comunicar-tripulantes/comunicar-tripulantes.component';
import { PesquisaBasicaComponent } from './pesquisa-basica/pesquisa-basica.component';
import { RelatorioFadigaComponent } from './relatorio-fadiga/relatorio-fadiga.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    TratamentoDaFadigaComponent,
    FadigaComponent,
    ComunicarTripulantesComponent,
    PesquisaBasicaComponent,
    RelatorioFadigaComponent,]
})
export class ControleDaFadigaModule { }
