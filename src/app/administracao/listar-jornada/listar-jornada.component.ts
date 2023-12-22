import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-listar-jornada',
  templateUrl: './listar-jornada.component.html',
  styleUrls: ['./listar-jornada.component.css']
})
export class ListarJornadaComponent implements OnInit {


  data = new Date();
  dados;
  
  locale_pt;

  gerente : boolean = false ;
  analista : boolean = false ;

  carregando = false;

  jornadasSelecionadas : string[] = [];


  constructor(private api: ApiService, private router: Router) {
    this.locale_pt = this.api.getLocale('pt');
  }
  ngOnInit(): void {
    // this.rodarRelatorio();
  }


  rodarRelatorio(){

    this.carregando = true;

    this.api.getJornadaImpressaoPeloMesAno(this.data).then(x=>{
        this.dados = x.Jornadas;
        this.gerente = x.Gerente;
        this.analista = x.Analista;
        this.carregando = false;
    })
  }

  imprimirPdf(){
    this.api.postPdfJornada(this.data, this.jornadasSelecionadas).subscribe(
      data => {
        switch (data.type) {
          // case HttpEventType.DownloadProgress:
          //   this.downloadStatus.emit( {status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100)});
          //   break;
          case HttpEventType.Response:
            //this.downloadStatus.emit( {status: ProgressStatusEnum.COMPLETE});
            const downloadedFile = new Blob([data.body], { type: data.body.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = 'teste.zip';
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
            break;
        }
      },
      error => {
        // this.downloadStatus.emit( {status: ProgressStatusEnum.ERROR});
      }
    );

  }

  imprimir(id : string){
    window.open(`https://${this.api.getClienteLogado()}.controledafadiga.com.br/imprimir-jornada/${id}`);
  }

}
