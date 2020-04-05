import { VencimentoCarteiraComponent } from './vencimento-carteira/vencimento-carteira.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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


import { SharedModule } from './shared/shared.module';
import { VisualizarAnaliseDeRiscoComponent } from './visualizar-analise-de-risco/visualizar-analise-de-risco.component';
import { DocumentoImpressoComponent } from './documento-impresso/documento-impresso.component';
import { CabecalhoImpressaoComponent } from './cabecalho-impressao/cabecalho-impressao.component';
import { PaxTransportadosComponent } from './relatorios/pax-transportados/pax-transportados.component';
import { UltimasOcorrenciasComponent } from './ultimas-ocorrencias/ultimas-ocorrencias.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
