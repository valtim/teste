import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DataUtil } from 'src/app/shared/DataUtil';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-rel-boca',
  templateUrl: './rel-boca.component.html',
  styleUrls: ['./rel-boca.component.css']
})
export class RelBocaComponent implements OnInit {

  dados;
  cols;

  filtroRetorno;

  relatorioConsultado = false;
  tudoPronto = false;
  locale_pt;
  baseDeOperacao;
  baseDeOperacaoSelecionada;
  data: Date;

  TotalDeVoos;
  AeronavesUtilizadas;
  BaseDeOperacoes: any;


  statusAssinatura = false;
  desabilitarBotaoAssinatura = true;

  nomeArquivo: string;
  exibirAssinatura = false;
  DadosAssinatura: any = { Status: false };
  blobPDF: any;
  NumerosDosVoos: [];
  Rdv: any[];
  emails = "cc-AVTA@petrobras.com.br; coordvoocabofrio <coordvoocabofrio@bristowgroup.com>; Transporte Aereo e Resgate PB-LOG <TARPB@petrobras.com.br>; taereo.cabofrio@petrobras.com.br; Nelson Pinheiro <Nelson.Pinheiro@bristowgroup.com>; Inglison Oliveira <inglison.oliveira@bristowgroup.com>";
  assinaturas: any;

  constructor(private api: ApiService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const date = new Date();
    this.data = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.locale_pt = this.api.getLocale('pt');

    // Para testar
    // this.data = new Date(2023, 5, 5);

    this.api.getCombosRestrito('BaseDeOperacao').then(x => {

      this.baseDeOperacao = x.BaseDeOperacao;
      this.baseDeOperacaoSelecionada = this.baseDeOperacao[0];

      //this.rodarRelatorio();
      this.tudoPronto = true;
      this.relatorioConsultado = false;

    })



  }


  emailBOCA() {
    
    this.tudoPronto = false;
    this.api.emailBOCA(this.data.toISOString().split('T')[0], this.baseDeOperacaoSelecionada.Id, { emails: this.emails }).then(
      x => {
        alert('email enviado');
        this.tudoPronto = true;
      }
    ).catch(x => {
      alert('erro ao enviar email');
      this.tudoPronto = true;
    })
  }


  pesquisarEnviados(){
    this.relatorioConsultado = false;
    this.tudoPronto = false;
    this.blobPDF = undefined;
    this.api.getRelBoca(this.data.toISOString().split('T')[0], this.baseDeOperacaoSelecionada.Id).then( x=>{
      this.assinaturas = x;
      this.tudoPronto = true;
    } );
  }

  rodarRelatorio() {
    this.tudoPronto = false;
    this.relatorioConsultado = false;

    this.api.getRelBocaPdf(this.data.toISOString().split('T')[0], this.baseDeOperacaoSelecionada.Id).subscribe((blob: any) => {


      this.blobPDF = this.sanitizer.bypassSecurityTrustResourceUrl(
        URL.createObjectURL(blob)
      );


      this.relatorioConsultado = true;
      this.tudoPronto = true;
      //this.blobPDF = blob;
      // var resume = result["data"];
      // var fileName = resume.resumeName;
      // var fileType = resume.resumeType;

      // const file = new Blob([resume.resume], { type: fileType });//Is this correct or do i need to use 'application/octet-stream' here?

      //saveAs(file, fileName);
    });

    // this.api.postRelBoca(
    //   {
    //     data: this.data,
    //     clientes: [{ 'Id': '31965f5a-e078-11e7-a923-0026b94bb39e' },
    //     { 'Id': 'cfd3aa3b-5c1d-4796-abec-1de79cb7a998' }],
    //     base: this.baseDeOperacaoSelecionada
    //   }).then(x => {

    //     //colunas = colunas, filtro = filtro, listas = listas
    //     this.cols = x.colunas;
    //     this.dados = x.valores;
    //     this.Rdv = x.Rdv;
    //     this.Rdv.forEach(x => { x.Link = this.api.url + 'RelRdv/pdf/' + x.Id });
    //     this.filtroRetorno = x.filtroRetorno;
    //     this.TotalDeVoos = x.TotalDeVoos;
    //     this.AeronavesUtilizadas = x.AeronavesUtilizadas;
    //     this.BaseDeOperacoes = x.BaseDeOperacoes;
    //     this.NumerosDosVoos = x.NumerosDosVoos;




    //     //  this.api.postAssinaturaBoca({
    //     //     BaseDoTripulante_Id: this.BaseDeOperacoes.Id,
    //     //     DataBoca: this.data,
    //     //     NumerosDosVoos: this.NumerosDosVoos
    //     //   }).then((dados: any) => {                          
    //     //     this.DadosAssinatura = dados;          
    //     //     this.desabilitarBotaoAssinatura = false;
    //     //     this.nomeArquivo = this.definirNomeArquivo();

    //     //     this.DadosAssinatura.atualizar = (Status) => {
    //     //       this.statusAssinatura = Status;
    //     //       console.log('Status da Assinatura: ' + Status);
    //     //     }

    //     //     if (
    //     //       (this.DadosAssinatura.Status) &&
    //     //       (this.DadosAssinatura.AssinaturaBoca) && 
    //     //       (this.DadosAssinatura.AssinaturaBoca.Enviado)
    //     //     ) {
    //     //       this.statusAssinatura = true;
    //     //     }          

    //     //   });

    //     this.tudoPronto = true;
    //     this.relatorioConsultado = true;
    //   })
    //   .catch(x => {

    //   })
  }

  formatarDataAssinaturaBoca(): string {
    let data = '0000-00-00';
    if (this.data) {
      data = DataUtil.formatDateURL(this.data);
    }
    return data;
  }

  abrirDialogoAssinatura(): void {

    this.convertoToPDF((pdf: any) => {
      this.blobPDF = pdf;
      this.exibirAssinatura = true;
    });
  }

  fecharDialogoAssinatura(): void {
    this.exibirAssinatura = false;
    this.statusAssinatura = this.DadosAssinatura.Status;
  }

  definirNomeArquivo(): string {
    let parteData = '00-00';
    if (this.data) {
      let temp = DataUtil.formatDateURL(this.data).split('-');
      parteData = temp[2] + '-' + temp[1];
    }
    let tempICAO = 'AAA';

    if ((this.DadosAssinatura.BaseDoTripulante) && (this.DadosAssinatura.BaseDoTripulante.ICAO)) {
      tempICAO = this.DadosAssinatura.BaseDoTripulante.ICAO;
    }
    // BOCA - SBVT - 13-07.pdf
    return 'BOCA_' + tempICAO + '_' + parteData + '.pdf';
  }

  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;

  converterRelatorioParaImagem(callback) {
    let width = this.screen.nativeElement.offsetWidth;
    let height = this.screen.nativeElement.offsetHeight;

    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      callback({
        img: canvas.toDataURL('image/png'),
        width: width,
        height: height
      });
    });
  }

  convertoToPDF(callback) {
    this.converterRelatorioParaImagem(imageData => {
      var base64 = document.getElementById('imageid');
      let doc = new jsPDF('l', 'px', [imageData.width + 20, imageData.height + 420]);
      doc.addImage(
        imageData.img,
        'PNG',
        10,
        10,
        imageData.width,
        imageData.height
      );
      callback(doc.output('blob'));
    });
  }

}
