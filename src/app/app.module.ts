import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import localept from '@angular/common/locales/pt';

import { registerLocaleData } from '@angular/common';

import { SharedModule } from './shared/shared.module';
import { SegurancaModule } from './seguranca/seguranca.module';

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AnaliseDeRiscoComponent } from './relatorios/analise-de-risco/analise-de-risco.component';
import { VisualizarAnaliseDeRiscoComponent } from './relatorios/visualizar-analise-de-risco/visualizar-analise-de-risco.component';
import { DocumentoImpressoComponent } from './documento-impresso/documento-impresso.component';
import { CabecalhoImpressaoComponent } from './relatorios/cabecalho-impressao/cabecalho-impressao.component';
import { PaxTransportadosComponent } from './relatorios/pax-transportados/pax-transportados.component';
import { RelPousoComponent } from './relatorios/rel-pouso/rel-pouso.component';
import { RelConsCombComponent } from './relatorios/rel-cons-comb/rel-cons-comb.component';
import { HorasVoadasQuinzenaComponent } from './relatorios/horas-voadas-quinzena/horas-voadas-quinzena.component';
import { HorasVoadasTripulanteComponent } from './relatorios/horas-voadas-tripulante/horas-voadas-tripulante.component';
import { RelCdoComponent } from './relatorios/rel-cdo/rel-cdo.component';
import { RelBocaComponent } from './relatorios/rel-boca/rel-boca.component';
import { RelRdvComponent } from './relatorios/rel-rdv/rel-rdv.component';
import { RelListaRdvComponent } from './relatorios/rel-lista-rdv/rel-lista-rdv.component';
import { VoosRealizadosComponent } from './relatorios/voos-realizados/voos-realizados.component';
import { VencimentoCarteiraComponent } from './relatorios/vencimento-carteira/vencimento-carteira.component';
import { EditarVencimentoComponent } from './relatorios/editar-vencimento/editar-vencimento.component';
import { RelStatusDaFrotaComponent } from './relatorios/rel-status-da-frota/rel-status-da-frota.component';
import { RelDiarioHorasVoadasComponent } from './relatorios/rel-diario-horas-voadas/rel-diario-horas-voadas.component';
import { ControleDeTripulantesComponent } from './relatorios/controle-de-tripulantes/controle-de-tripulantes.component';
import { TratamentoDaFadigaComponent } from './controle-da-fadiga/tratamento-da-fadiga/tratamento-da-fadiga.component';
import { FadigaComponent } from './controle-da-fadiga/fadiga/fadiga.component';
import { ComunicarTripulantesComponent } from './controle-da-fadiga/comunicar-tripulantes/comunicar-tripulantes.component';
import { PesquisaBasicaComponent } from './controle-da-fadiga/pesquisa-basica/pesquisa-basica.component';
import { RelEscalaPtbrComponent } from './relatorios/rel-escala-ptbr/rel-escala-ptbr.component';
import { LogoffComponent } from './logoff/logoff.component';
import { RelOperacaoDeSoloComponent } from './relatorios/rel-operacao-de-solo/rel-operacao-de-solo.component';
import { CrudComponent } from './cadastro/crud/crud.component';
import { RelControleSpotComponent } from './relatorios/rel-controle-spot/rel-controle-spot.component';
import { MotivoDoAtrasoComponent } from './cadastro/motivo-do-atraso/motivo-do-atraso.component';
import { RelIndisponibilidadeComponent } from './relatorios/rel-indisponibilidade/rel-indisponibilidade.component';
import { RelPontualidadeComponent } from './relatorios/rel-pontualidade/rel-pontualidade.component';
import { CadastroDeEmailReporteComponent } from './controle-da-fadiga/cadastro-de-email-reporte/cadastro-de-email-reporte.component';
import { IndisponibilidadeComponent } from './cadastro/indisponibilidade/indisponibilidade.component';
import { ContratoComponent } from './cadastro/contrato/contrato.component';
import { EditarIndisponibilidadeComponent } from './cadastro/editar-indisponibilidade/editar-indisponibilidade.component';
import { ImprimirJornadaNovoComponent } from './administracao/validar-jornada/validar-jornada.component';
import { MotivoDaIndisponibilidadeComponent } from './cadastro/motivo-da-indisponibilidade/motivo-da-indisponibilidade.component';
import { MotivoDoErroNoPreenchimentoComponent } from './cadastro/motivo-do-erro-no-preenchimento/motivo-do-erro-no-preenchimento.component';
import { ObservacaoDbComponent } from './cadastro/observacao-db/observacao-db.component';
import { CertificadoComponent } from './treinamento/certificado/certificado.component';
import { UltimasDatasComponent } from './relatorios/ultimas-datas/ultimas-datas.component';
import { TipoDeOcorrenciaComponent } from './cadastro/tipo-de-ocorrencia/tipo-de-ocorrencia.component';
import { PrevisaoDoDiaComponent } from './escala/previsao-do-dia/previsao-do-dia.component';
import { EscalaMensalComponent } from './escala/escala-mensal/escala-mensal.component';
import { EditarEscalaComponent } from './escala/editar-escala/editar-escala.component';
import { EditarComposicaoComponent } from './escala/editar-composicao/editar-composicao.component';
import { ListarJornadaComponent } from './administracao/listar-jornada/listar-jornada.component';
import { QuinzenaComponent } from './cadastro/quinzena/quinzena.component';
import { TrilhoComponent } from './escala/trilho/trilho.component';
import { EscalaDoDiaComponent } from './escala/escala-do-dia/escala-do-dia.component';
import { DuplaComponent } from './escala/dupla/dupla.component';
import { DuplaDetalheComponent } from './escala/dupla-detalhe/dupla-detalhe.component';
import { EscalaSemanalComponent } from './escala/escala-semanal/escala-semanal.component';
import { ErrosNoDbComponent } from './relatorios/erros-no-db/erros-no-db.component';
import { RelGenericoComponent } from './relatorios/rel-generico/rel-generico.component';




registerLocaleData(localept, 'pt');

// import { MatSliderModule } from '@angular/material/slider';
// import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    //GraficoComponent,
    AnaliseDeRiscoComponent,
    VisualizarAnaliseDeRiscoComponent,
    DocumentoImpressoComponent,
    CabecalhoImpressaoComponent,
    PaxTransportadosComponent,
    VencimentoCarteiraComponent,
    RelPousoComponent,
    RelConsCombComponent,
    HorasVoadasQuinzenaComponent,
    HorasVoadasTripulanteComponent,
    RelCdoComponent,
    RelBocaComponent,
    RelRdvComponent,
    RelListaRdvComponent,
    VoosRealizadosComponent,
    EditarVencimentoComponent,
    RelStatusDaFrotaComponent,
    RelDiarioHorasVoadasComponent,
    ControleDeTripulantesComponent,
    ComunicarTripulantesComponent,
    PesquisaBasicaComponent,
    TratamentoDaFadigaComponent,
    FadigaComponent,
    RelEscalaPtbrComponent,
    LogoffComponent,
    RelOperacaoDeSoloComponent,
    CrudComponent,
    RelControleSpotComponent,
    MotivoDoAtrasoComponent,
    RelIndisponibilidadeComponent,
    RelPontualidadeComponent,
    CadastroDeEmailReporteComponent,
    IndisponibilidadeComponent,
    ContratoComponent,
    EditarIndisponibilidadeComponent,
    ListarJornadaComponent,
    ImprimirJornadaNovoComponent,
    MotivoDaIndisponibilidadeComponent,
    MotivoDoErroNoPreenchimentoComponent,
    ObservacaoDbComponent,
    CertificadoComponent,
    UltimasDatasComponent,
    TipoDeOcorrenciaComponent,
    PrevisaoDoDiaComponent,
    EscalaMensalComponent,
    EditarEscalaComponent,
    EditarComposicaoComponent,
    QuinzenaComponent,
    TrilhoComponent,
    EscalaDoDiaComponent,
    DuplaComponent,
    DuplaDetalheComponent,
    EscalaSemanalComponent,
    ErrosNoDbComponent,
    RelGenericoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    SegurancaModule, 
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
