import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { FadigaComponent } from './fadiga/fadiga.component';
import { TratamentoDaFadigaComponent } from './tratamento-da-fadiga/tratamento-da-fadiga.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComunicarTripulantesComponent } from './comunicar-tripulantes/comunicar-tripulantes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    TratamentoDaFadigaComponent,
  FadigaComponent,
  ComunicarTripulantesComponent]
})
export class ControleDaFadigaModule { }
