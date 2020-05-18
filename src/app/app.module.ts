import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import localept from '@angular/common/locales/pt';

import { registerLocaleData } from '@angular/common';

import { SharedModule } from './shared/shared.module';
import { SegurancaModule } from './seguranca/seguranca.module';
//import { ControleDaFadigaModule } from './controle-da-fadiga/!controle-da-fadiga.module';

import { AppRoutingModule } from './app-routing.module';
import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GraficoComponent } from './grafico/grafico.component';
import { AnaliseDeRiscoComponent } from './relatorios/analise-de-risco/analise-de-risco.component';
import { VisualizarAnaliseDeRiscoComponent } from './relatorios/visualizar-analise-de-risco/visualizar-analise-de-risco.component';
import { DocumentoImpressoComponent } from './documento-impresso/documento-impresso.component';
import { CabecalhoImpressaoComponent } from './relatorios/cabecalho-impressao/cabecalho-impressao.component';
import { PaxTransportadosComponent } from './relatorios/pax-transportados/pax-transportados.component';
import { UltimasOcorrenciasComponent } from './relatorios/ultimas-ocorrencias/ultimas-ocorrencias.component';
import { RelPousoComponent } from './relatorios/rel-pouso/rel-pouso.component';
import { RelConsCombComponent } from './relatorios/rel-cons-comb/rel-cons-comb.component';
import { HorasVoadasQuinzenaComponent } from './relatorios/horas-voadas-quinzena/horas-voadas-quinzena.component';
import { HorasVoadasTripulanteComponent } from './relatorios/horas-voadas-tripulante/horas-voadas-tripulante.component';
import { RelBocaComponent } from './relatorios/rel-boca/rel-boca.component';
import { RelRdvComponent } from './relatorios/rel-rdv/rel-rdv.component';
import { RelListaRdvComponent } from './relatorios/rel-lista-rdv/rel-lista-rdv.component';
import { VoosRealizadosComponent } from './relatorios/voos-realizados/voos-realizados.component';
import { VencimentoCarteiraComponent } from './relatorios/vencimento-carteira/vencimento-carteira.component';
import { EditarVencimentoComponent } from './relatorios/editar-vencimento/editar-vencimento.component';
import { RelStatusDaFrotaComponent } from './relatorios/rel-status-da-frota/rel-status-da-frota.component';
import { RelControleDeCombustivelComponent } from './relatorios/rel-controle-de-combustivel/rel-controle-de-combustivel.component';
import { RelDiarioHorasVoadasComponent } from './relatorios/rel-diario-horas-voadas/rel-diario-horas-voadas.component';
import { ControleDeTripulantesComponent } from './relatorios/controle-de-tripulantes/controle-de-tripulantes.component';
import { TratamentoDaFadigaComponent } from './controle-da-fadiga/tratamento-da-fadiga/tratamento-da-fadiga.component';
import { FadigaComponent } from './controle-da-fadiga/fadiga/fadiga.component';
import { ComunicarTripulantesComponent } from './controle-da-fadiga/comunicar-tripulantes/comunicar-tripulantes.component';
import { PesquisaBasicaComponent } from './controle-da-fadiga/pesquisa-basica/pesquisa-basica.component';
import { RelatorioFadigaComponent } from './controle-da-fadiga/relatorio-fadiga/relatorio-fadiga.component';
import { RelEscalaPtbrComponent } from './relatorios/rel-escala-ptbr/rel-escala-ptbr.component';
import { LogoffComponent } from './logoff/logoff.component';




registerLocaleData(localept, 'pt');

// import { MatSliderModule } from '@angular/material/slider';
// import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    HorasVoadasQuinzenaComponent,
    HorasVoadasTripulanteComponent,
    RelBocaComponent,
    RelRdvComponent,
    RelListaRdvComponent,
    VoosRealizadosComponent,
    EditarVencimentoComponent,
    RelStatusDaFrotaComponent,
    RelControleDeCombustivelComponent,
    RelDiarioHorasVoadasComponent,
    ControleDeTripulantesComponent,
    ComunicarTripulantesComponent,
    PesquisaBasicaComponent,
    RelatorioFadigaComponent,
    TratamentoDaFadigaComponent,
    FadigaComponent,
    RelEscalaPtbrComponent,
    LogoffComponent,

  ],
  imports: [
    //ControleDaFadigaModule,
    // TratamentoDaFadigaComponent,
    // FadigaComponent,
    // ComunicarTripulantesComponent,
    // PesquisaBasicaComponent,
    // RelatorioFadigaComponent,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
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
    DropdownModule,
    InputMaskModule,
    ToastModule,
    MenubarModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
