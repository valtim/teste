// import { TripulanteComponent } from './reg-trip/tripulante/tripulante.component';
import { RegTripModule } from './reg-trip/reg-trip.module';
import { HomeComponent } from './home/home.component';
import { SegurancaModule } from './seguranca/seguranca.module';
import { ControleDaFadigaModule } from './controle-da-fadiga/controle-da-fadiga.module';
// import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BocaVooComponent } from './relatorios/boca-voo/boca-voo.component';
import { BocaDiaComponent } from './relatorios/boca-dia/boca-dia.component';
import { GraficoComponent } from './grafico/grafico.component';
import { AnaliseDeRiscoComponent } from './analise-de-risco/analise-de-risco.component';
import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';


import { TituloComponent } from './shared/titulo/titulo.component';
import { SharedModule } from './shared/shared.module';
import { VisualizarAnaliseDeRiscoComponent } from './visualizar-analise-de-risco/visualizar-analise-de-risco.component';
import { DocumentoImpressoComponent } from './documento-impresso/documento-impresso.component';
import { CabecalhoImpressaoComponent } from './cabecalho-impressao/cabecalho-impressao.component';
import { PaxTransportadosComponent } from './relatorios/pax-transportados/pax-transportados.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BocaVooComponent,
    BocaDiaComponent,
    GraficoComponent,
    AnaliseDeRiscoComponent,
    VisualizarAnaliseDeRiscoComponent,
    DocumentoImpressoComponent,
    CabecalhoImpressaoComponent,
    PaxTransportadosComponent,
    // TituloComponent,
    // TripulanteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    ControleDaFadigaModule,
    SegurancaModule,
    RegTripModule,
    ReactiveFormsModule,
    FormsModule,
    ChartModule,
    ListboxModule,
    CalendarModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    TableModule,
    AccordionModule,
    // TableModule,
    // DropdownModule
  ],
  // exports: [
  //    TituloComponent,
  // ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
