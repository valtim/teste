import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
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
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PickListModule } from 'primeng/picklist';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FieldsetModule } from 'primeng/fieldset';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { FileUploadModule } from 'primeng/fileupload';

import { NgModule } from '@angular/core';

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
import { InformativoComponent } from './cadastro/informativo/informativo.component';
import { ListaInformativoComponent } from './cadastro/lista-informativo/lista-informativo.component';
import { IncompatibilidadeComponent } from './cadastro/incompatibilidade/incompatibilidade.component';


import { AgendaComponent } from './treinamento/agenda/agenda.component';
import { AnexosComponent } from './treinamento/anexos/anexos.component';
import { CertificadoComponent } from './treinamento/certificado/certificado.component';
import { ComentarioComponent } from './treinamento/comentario/comentario.component';
import { ConteudoCurricularComponent } from './treinamento/conteudo-curricular/conteudo-curricular.component';
import { EnviarValidacaoComponent } from './treinamento/enviar-validacao/enviar-validacao.component';
import { ListaAnexosComponent } from './treinamento/lista-anexos/lista-anexos.component';
import { NotificarEnvolvidosComponent } from './treinamento/notificar-envolvidos/notificar-envolvidos.component';
import { NovoTreinamentoComponent } from './treinamento/novo-treinamento/novo-treinamento.component';
import { RegistroFrequenciaComponent } from './treinamento/registro-frequencia/registro-frequencia.component';
import { TreinamentoListComponent } from './treinamento/treinamento-list/treinamento-list.component';
import { TurmaComponent } from './treinamento/turma/turma.component';
import { TurmaListComponent } from './treinamento/turma-list/turma-list.component';
import { TurmaStatusComponent } from './treinamento/turma-status/turma-status.component';


import { MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';
import { TituloComponent } from './shared/titulo/titulo.component';
import { MenuComponent } from './shared/menu/menu.component';
import { ConfirmacaoComponent } from './shared/confirmacao/confirmacao.component';
import { SOLSharedModule } from './shared/sol.shared.module';
import { BuscaBiComponent } from './bi/busca-bi/busca-bi.component';
import { ControleDeAcessoEditComponent } from './cadastro/controle-de-acesso-edit/controle-de-acesso-edit.component';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
const rodandoLocal = window.location.host == 'localhost:4200';

@NgModule({
  declarations: [
    AppComponent,


    AgendaComponent,
    AnexosComponent,
    CertificadoComponent,
    ComentarioComponent,
    ConteudoCurricularComponent,
    EnviarValidacaoComponent,
    ListaAnexosComponent,
    NotificarEnvolvidosComponent,
    RegistroFrequenciaComponent,
    TreinamentoListComponent,
    TurmaComponent,
    NovoTreinamentoComponent,
    TurmaListComponent,
    TurmaStatusComponent,


    AnaliseDeRiscoComponent,
    CabecalhoImpressaoComponent,
    CadastroDeEmailReporteComponent,
    ComunicarTripulantesComponent,
    ContratoComponent,
    ControleDeTripulantesComponent,
    CrudComponent,
    DocumentoImpressoComponent,
    DuplaComponent,
    DuplaDetalheComponent,
    EditarComposicaoComponent,
    EditarEscalaComponent,
    EditarIndisponibilidadeComponent,
    EditarVencimentoComponent,
    ErrosNoDbComponent,
    EscalaDoDiaComponent,
    EscalaMensalComponent,
    EscalaSemanalComponent,
    FadigaComponent,
    HomeComponent,
    HorasVoadasQuinzenaComponent,
    HorasVoadasTripulanteComponent,
    ImprimirJornadaNovoComponent,
    IncompatibilidadeComponent,
    IndisponibilidadeComponent,
    InformativoComponent,
    ListaInformativoComponent,
    ListarJornadaComponent,
    LogoffComponent,
    MotivoDaIndisponibilidadeComponent,
    MotivoDoAtrasoComponent,
    MotivoDoErroNoPreenchimentoComponent,
    ObservacaoDbComponent,
    PaxTransportadosComponent,
    PesquisaBasicaComponent,
    PrevisaoDoDiaComponent,
    QuinzenaComponent,
    RelBocaComponent,
    RelCdoComponent,
    RelConsCombComponent,
    RelControleSpotComponent,
    RelDiarioHorasVoadasComponent,
    RelEscalaPtbrComponent,
    RelIndisponibilidadeComponent,
    RelListaRdvComponent,
    RelPontualidadeComponent,
    RelPousoComponent,
    RelRdvComponent,
    RelStatusDaFrotaComponent,
    TipoDeOcorrenciaComponent,
    TratamentoDaFadigaComponent,
    TrilhoComponent,
    UltimasDatasComponent,
    VencimentoCarteiraComponent,
    VisualizarAnaliseDeRiscoComponent,
    VoosRealizadosComponent,
    BuscaBiComponent,
    ControleDeAcessoEditComponent,



  ],
  imports: [
    AppRoutingModule,
    SegurancaModule,
    SOLSharedModule,




    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: rodandoLocal ? '48d2da0e-fbf4-4d65-9603-6eeaf26d8e26' : '024988d2-731e-442f-a3a0-875bb1b2881a',
        authority: rodandoLocal ? 'https://login.microsoftonline.com/1e711a1a-50e8-4cd4-a3d5-9acccd8b52eb' : 'https://login.microsoftonline.com/6d722de3-c021-4a75-a539-f83210c2706d',
        redirectUri: window.location.href
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      }
    }), null, null)
  ],
  providers: [

  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }


