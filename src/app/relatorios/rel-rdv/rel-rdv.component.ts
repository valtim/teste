import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { GuidUtil } from 'src/app/shared/GuidUtil';

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

      this.api.getAssinaturaRDV(this.rdv.Id).then((dados: any) => {

        // TODO
        console.log(dados);

        this.DadosAssinatura = dados;
        this.statusAssinatura = this.DadosAssinatura.Status;
        this.desabilitarBotaoAssinatura = false;
        
        this.tudoPronto = true;
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

  abrirDialogoAssinatura(): void {
    this.desabilitarBotaoAssinatura = true;
    this.tudoPronto = true;

    this.convertoToPDF((pdf: any) => {
      this.blobPDF = pdf;
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
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      callback({ 
        img: canvas.toDataURL('image/png'), 
        width: this.screen.nativeElement.offsetWidth, 
        height: this.screen.nativeElement.offsetHeight
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

  /*
  obterOuCriarAssinatura(dados: any): void {
    let criar = false;
    if (!dados.Assinatura) criar = true;
    else if (!dados.Assinatura.Id) criar = true;    

    if (criar) {
      dados.Assinatura = {
        Id: GuidUtil.NewGuid(),        
        TransientDocumentId: null,
        AgreementId: null,
        Status: '',
        Arquivos: []
      };
      dados.AssinaturaRDV = {
        Id: GuidUtil.NewGuid(),
        Assinatura: dados.Assinatura,
        DiarioDeBordo: dados.DiarioDeBordo,
        NumeroDaFolha: dados.DiarioDeBordo.NumeroDaFolha
      };
      if (dados.Emails && dados.Emails.length == 1) {
        dados.Emails[0].Assinatura = dados.Assinatura;                        
      }
    }

    return dados;
  }
  */

}
