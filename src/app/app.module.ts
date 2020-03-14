import { TripulanteComponent } from './reg-trip/tripulante/tripulante.component';
import { RegTripModule } from './reg-trip/reg-trip.module';
import { HomeComponent } from './home/home.component';
import { SegurancaModule } from './seguranca/seguranca.module';
import { ControleDaFadigaModule } from './controle-da-fadiga/controle-da-fadiga.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BocaVooComponent } from './relatorios/boca-voo/boca-voo.component';
import { BocaDiaComponent } from './relatorios/boca-dia/boca-dia.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BocaVooComponent,
    BocaDiaComponent,
    // TripulanteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // SharedModule,
    ControleDaFadigaModule,
    SegurancaModule,
    RegTripModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
