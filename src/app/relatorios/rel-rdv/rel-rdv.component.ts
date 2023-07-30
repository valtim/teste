import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-rel-rdv',
  templateUrl: './rel-rdv.component.html',
  styleUrls: ['./rel-rdv.component.css']
})
export class RelRdvComponent implements OnInit {
  semErros: any;

  constructor(private api: ApiService, private router: Router) { }

  exibirAssinatura = false;
  DadosAssinatura: any = { Status: false };
  blobPDF: any;
  statusAssinatura = false;
  desabilitarBotaoAssinatura = false;
  nomeArquivo: string;

  rdv: any;
  tudoPronto = false;
  urlLogo: string;
  id_busca: string;
  cancelada: boolean = false;

  ngOnInit(): void {
    this.api.getClienteLogado().then(x => {
      this.urlLogo = `/assets/imgs/${x}.png`;
    });

    const lista = this.router.url.split('/');

    this.id_busca = lista[lista.length - 1];


    this.tudoPronto = false;
    this.api.getRDV(this.id_busca).then(x => {
      this.rdv = x;      
      this.semErros = true;
      this.cancelada = this.rdv.Cancelada;
      this.nomeArquivo = this.definirNomeArquivo();

      this.api.baseAssinaturaRDV(this.rdv.Id).then((base: any) => {        
        
        if ((base != null) && (base != undefined) && (base.Ok)) {
      
          this.api.getAssinaturaRDV(this.rdv.Id).then((dados: any) => {                
            this.DadosAssinatura = dados;
            this.statusAssinatura = this.DadosAssinatura.Status;
            this.desabilitarBotaoAssinatura = false;
  
            this.DadosAssinatura.atualizar = (Status) => {
              this.statusAssinatura = Status;
              console.log('Status da Assinatura: ' + Status);
            }
    
            this.tudoPronto = true;
          });

        } else {
          console.log(base);
          this.DadosAssinatura = { Status: false };
          this.desabilitarBotaoAssinatura = true;
          this.tudoPronto = true;
        }     
      });
      
    }).catch((e) => {
      if ( e.status == 404)
      {
        this.semErros = false;
        this.tudoPronto = true;
        alert('db não encontrado no banco');
      }
    })
  }

  definirNomeArquivo(): string {
    let parteData = '00-00';    
    if ( (this.rdv.DataDoDiario) && (this.rdv.DataDoDiario.length != '')) {
      let partesData = this.rdv.DataDoDiario.split('T')[0].split('-');
      parteData = partesData[2] + '-' + partesData[1];
    }
    let tempNumeroDoVoo = '000000000';
    if (this.rdv.Linhas.length > 0) {
      tempNumeroDoVoo = this.rdv.Linhas[0].NumeroDoVoo;
    }
    // PR-AEH - 13-07 -508460284 -236604.pdf
    return this.rdv.Prefixo.PrefixoCompleto + '_' + parteData + '_' + tempNumeroDoVoo + '_' + this.rdv.NumeroDaFolha + '.pdf';
  }

  abrirDialogoAssinatura(): void {
    this.tudoPronto = false;
    this.desabilitarBotaoAssinatura = true;    
        
    this.convertoToPDF((pdf: any) => {      
      this.blobPDF = pdf;
      this.tudoPronto = true;
      this.exibirAssinatura = true;
    });
  }

  fecharDialogoAssinatura(): void {    
    this.exibirAssinatura = false;
    this.statusAssinatura = this.DadosAssinatura.Status;
    this.desabilitarBotaoAssinatura = false;
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
      let doc = new jsPDF('l', 'px', [imageData.width+20, imageData.height+420]);      
      doc.addImage(
        imageData.img,
        'PNG',
        10,
        10,
        imageData.width,
        imageData.height
      );
      callback(doc.output('blob'));
      //doc.save('arquivo.pdf'); -> para baixar o arquivo, se fosse o caso
    });
  }

}
