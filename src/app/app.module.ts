import { VencimentoCarteiraComponent } from './vencimento-carteira/vencimento-carteira.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import localept from '@angular/common/locales/pt';


import { registerLocaleData } from '@angular/common';


import { HomeComponent } from './home/home.component';
import { SegurancaModule } from './seguranca/seguranca.module';
import { ControleDaFadigaModule } from './controle-da-fadiga/controle-da-fadiga.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { MultiSelectModule } from 'primeng/multiselect';


import { SharedModule } from './shared/shared.module';
import { VisualizarAnaliseDeRiscoComponent } from './visualizar-analise-de-risco/visualizar-analise-de-risco.component';
import { DocumentoImpressoComponent } from './documento-impresso/documento-impresso.component';
import { CabecalhoImpressaoComponent } from './cabecalho-impressao/cabecalho-impressao.component';
import { PaxTransportadosComponent } from './relatorios/pax-transportados/pax-transportados.component';
import { UltimasOcorrenciasComponent } from './ultimas-ocorrencias/ultimas-ocorrencias.component';
import { RelPousoComponent } from './relatorios/rel-pouso/rel-pouso.component';
import { RelConsCombComponent } from './rel-cons-comb/rel-cons-comb.component';




registerLocaleData(localept, 'pt');

// import { MatSliderModule } from '@angular/material/slider';
// import { MatFormFieldModule } from '@angular/material/form-field';

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
    VencimentoCarteiraComponent,
    UltimasOcorrenciasComponent,
    RelPousoComponent,
    RelConsCombComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    ControleDaFadigaModule,
    SegurancaModule,
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
    MultiSelectModule,
    // MatFormFieldModule,
    // MatSliderModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
