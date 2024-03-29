import { LOCALE_ID, NgModule } from '@angular/core';
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
import { VencimentoCarteiraComponent } from './treinamento/vencimento-carteira/vencimento-carteira.component';
import { EditarVencimentoComponent } from './treinamento/editar-vencimento/editar-vencimento.component';
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
import { InformativoComponent } from './cadastro/informativo/informativo.component';
import { ListaInformativoComponent } from './cadastro/lista-informativo/lista-informativo.component';
import { IncompatibilidadeComponent } from './cadastro/incompatibilidade/incompatibilidade.component';
import { AnexosComponent } from './treinamento/anexos/anexos.component';
import { CertificadoComponent } from './treinamento/certificado/certificado.component';
import { ComentarioComponent } from './treinamento/comentario/comentario.component';
import { ConteudoCurricularComponent } from './treinamento/conteudo-curricular/conteudo-curricular.component';
import { ListaAnexosComponent } from './treinamento/lista-anexos/lista-anexos.component';
import { RegistroFrequenciaComponent } from './treinamento/registro-frequencia/registro-frequencia.component';
import { TreinamentoListComponent } from './treinamento/treinamento-list/treinamento-list.component';
import { TurmaComponent } from './treinamento/turma/turma.component';
import { TurmaListComponent } from './treinamento/turma-list/turma-list.component';


import { MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser';
import { SOLSharedModule } from './shared/sol.shared.module';
import { BuscaBiComponent } from './bi/busca-bi/busca-bi.component';
import { ControleDeAcessoEditComponent } from './cadastro/controle-de-acesso-edit/controle-de-acesso-edit.component';
import { DeslocamentoComponent } from './cadastro/deslocamento/deslocamento.component';
import { ModificadorComponent } from './cadastro/modificador/modificador.component';
import { GraficoComponent } from './controle-da-fadiga/grafico/grafico.component';
import { GraficoFadigaComponent } from './grafico-fadiga/grafico-fadiga.component';

import { ControleDeAcessoComponent } from './cadastro/controle-de-acesso/controle-de-acesso.component';
import { GrupoDePerguntaComponent } from './cadastro/grupo-de-pergunta/grupo-de-pergunta.component';
import { FichaDeAvaliacaoComponent } from './cadastro/ficha-de-avaliacao/ficha-de-avaliacao.component';
import { FichaDeAvaliacaoEditComponent } from './cadastro/ficha-de-avaliacao-edit/ficha-de-avaliacao-edit.component';
import { FichaDeAvaliacaoItemComponent } from './cadastro/ficha-de-avaliacao-item/ficha-de-avaliacao-item.component';
import { GerenciarTripulantesComponent } from './administracao/gerenciar-tripulantes/gerenciar-tripulantes.component';
import { InstrutorComponent } from './treinamento/instrutor/instrutor.component';
import { EditarGerenciarTripulantesComponent } from './administracao/editar-tripulantes/editar-gerenciar-tripulantes.component';
import { DuplaAdmComponent } from './escala/dupla-adm/dupla-adm.component';
import { HTMLPipe } from './shared/pipe/toHTML';
import { SafeHtmlPipe } from './shared/pipe/safeHTML';
import { BlocoComponent } from './cadastro/bloco/bloco.component';
import { RelVencimentoTreinamentoComponent } from './relatorios/rel-vencimento-treinamento/rel-vencimento-treinamento.component';
import { LoginLdapComponent } from './login-ldap/login-ldap.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RelMedicaoComponent } from './relatorios/rel-medicao/rel-medicao.component';
import { BaseDoTripulanteComponent } from './cadastro/base-do-tripulante/base-do-tripulante.component';
import { CadastroEmailCdoComponent } from './cadastro/cadastro-email-cdo/cadastro-email-cdo.component';
import { ApontamentoComponent } from './relatorios/apontamento/apontamento.component';
import { AssinaturaRDVComponent } from './relatorios/assinatura-rdv/assinatura-rdv.component';
import { AssinaturaBocaComponent } from './relatorios/assinatura-boca/assinatura-boca.component';
import { EditarTreinamentoComponent } from './treinamento/editar-treinamento/editar-treinamento.component';
import { TripulanteEscalaComponent } from './escala/tripulante-escala/tripulante-escala.component';
import { OrdenarCertificadoComponent } from './treinamento/ordenar-certificado/ordenar-certificado.component';
import { EmailEscalaComponent } from './escala/email-escala/email-escala.component';
import { EmailDiarioFadigaComponent } from './cadastro/email-diario-fadiga/email-diario-fadiga.component';
import { EmailDiarioCdoComponent } from './cadastro/email-diario-cdo/email-diario-cdo.component';
import { CcoComponent } from './painel/cco/cco.component';
import { FlightStripComponent } from './operacoes/flight-strip/flight-strip.component';
import { LoggingComponent } from './seguranca/logging/logging.component';
import { CurriculosComponent } from './cadastro/curriculos/curriculos.component';
import { EditarCurriculoComponent } from './cadastro/editar-curriculo/editar-curriculo.component';
import { JornadaDiariaComponent } from './escala/jornada-diaria/jornada-diaria.component';
import { RelatorioAlunoComponent } from './treinamento/relatorio-aluno/relatorio-aluno.component';
import { CadastroEmailBocaComponent } from './cadastro/cadastro-email-boca/cadastro-email-boca.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
const rodandoLocal = window.location.host == 'localhost:4200';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

registerLocaleData(localePt);

@NgModule({
  providers: [
     {provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  declarations: [
    AppComponent,
    AnexosComponent,
    CertificadoComponent,
    ComentarioComponent,
    ConteudoCurricularComponent,
    ListaAnexosComponent,
    RegistroFrequenciaComponent,
    TreinamentoListComponent,
    TurmaComponent,
    EditarTreinamentoComponent,
    TurmaListComponent,
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
    DeslocamentoComponent,
    ModificadorComponent,
    GraficoComponent,
    GraficoFadigaComponent,
    ControleDeAcessoComponent,
    GrupoDePerguntaComponent,
    FichaDeAvaliacaoComponent,
    FichaDeAvaliacaoEditComponent,
    FichaDeAvaliacaoItemComponent,
    GerenciarTripulantesComponent,
    InstrutorComponent,
    EditarGerenciarTripulantesComponent,
    DuplaAdmComponent,
    HTMLPipe,
    SafeHtmlPipe,
    BlocoComponent,
    RelVencimentoTreinamentoComponent,
    LoginLdapComponent,
    RelMedicaoComponent,
    BaseDoTripulanteComponent,
    CadastroEmailCdoComponent,
    ApontamentoComponent,
    AssinaturaRDVComponent,
    AssinaturaBocaComponent,
    TripulanteEscalaComponent,
    OrdenarCertificadoComponent,
    EmailEscalaComponent,
    EmailDiarioFadigaComponent,
    EmailDiarioCdoComponent,
    FlightStripComponent,
    LoggingComponent,
    CcoComponent,
    CurriculosComponent,
    EditarCurriculoComponent,
    JornadaDiariaComponent,
    RelatorioAlunoComponent,
    CadastroEmailBocaComponent,
  ],
  imports: [
    AppRoutingModule,
    SegurancaModule,
    SOLSharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),



    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: rodandoLocal ? '48d2da0e-fbf4-4d65-9603-6eeaf26d8e26' : '024988d2-731e-442f-a3a0-875bb1b2881a',
        authority: rodandoLocal ? 'https://login.microsoftonline.com/1e711a1a-50e8-4cd4-a3d5-9acccd8b52eb' : 'https://login.microsoftonline.com/6d722de3-c021-4a75-a539-f83210c2706d',
        redirectUri: 'https://' + window.location.host
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
      }
    }), null, null)
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }


