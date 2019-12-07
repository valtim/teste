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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // SharedModule,
    ControleDaFadigaModule,
    SegurancaModule,
    RegTripModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
