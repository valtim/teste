import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from "primeng/api";
import { ApiService } from 'src/app/shared/api.service';
import { ApiTurmasService } from 'src/app/shared/api.turmas.service';

@Component({
  selector: 'app-assinatura-rdv',
  templateUrl: './assinatura-rdv.component.html',
  styleUrls: ['./assinatura-rdv.component.css'],
  providers: [MessageService]
})
export class AssinaturaRDVComponent implements OnInit {

  @Input() DadosAssinatura: any;
  @Input() blobPDF: any;  
  @Output() retorno = new EventEmitter();

  mostrarLoading = false;
  liberarBotaoEnviarEmail = false;
  anexos = [];

  constructor(private api: ApiService, private apiTurmas: ApiTurmasService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {
    this.mostrarLoading = true;

    console.log(this.DadosAssinatura);

    this.criarArquivoRDV(()=>{
      this.liberarBotaoEnviarEmail = true;      
      this.mostrarLoading = false;

      //this.DadosAssinatura.Status = true;
    });    
  }

  criarArquivoRDV(callback): void {
    if ((!this.DadosAssinatura.Assinatura) || (!this.DadosAssinatura.Assinatura.Arquivos) || (this.DadosAssinatura.Assinatura.Arquivos.length == 0)) {      
      const formData = new FormData();
      let nomeArquivo = 'Relatorio RDV ' + this.DadosAssinatura.DiarioDeBordo.NumeroDaFolha + '.pdf';
      nomeArquivo = nomeArquivo.replace(/ /g, '_');      
      formData.append('file[0]', this.blobPDF, nomeArquivo);
      this.apiTurmas.postUploadSign(this.DadosAssinatura.Assinatura.Id,formData).then((arquivos) => {
        this.DadosAssinatura.Assinatura.Arquivos = [];
        if ((arquivos) && (arquivos.length == 1)) {
          let arquivo = arquivos[0];          
          this.DadosAssinatura.Assinatura.Arquivos.push(arquivo);
        }
        console.log(arquivos);                        
        callback();
      });      
    } else {
      callback();
    }
  }

  uploadCompleto = (args: any): void => {
    this.DadosAssinatura.Assinatura.Arquivos = args;    
  }

  enviarEmail(): void {
    this.mostrarLoading = false;
    this.liberarBotaoEnviarEmail = false;
    this.retorno.emit();
  }

  uploadAnexos(event) {   
    this.mostrarLoading = true;
    const formData = new FormData();
    event.files.forEach((arq, index) => {
      let nameFile = arq.name.replace(/ /g, '_');            
      formData.append(`file[${index}]`, arq, nameFile);
    
      if (index == (event.files.length - 1)) {
        this.apiTurmas.postUploadSign(this.DadosAssinatura.Assinatura.Id,formData).then((arquivos) => {                    
          arquivos.forEach((arquivo, indexArquivos) => {            
            this.DadosAssinatura.Assinatura.Arquivos.push(arquivo);
            if (indexArquivos == (arquivos.length - 1)) {
              this.mostrarLoading = false;              
            }
          });                    
        });        
      }
    });    
  }

  apagarAnexo(id : string){
    this.mostrarLoading = true;
    this.apiTurmas.deleteAnexo(id).then(() => { 
      let deletado = this.DadosAssinatura.Assinatura.Arquivos.find(x=>x.Id != id);
      this.DadosAssinatura.Assinatura.Arquivos = this.DadosAssinatura.Assinatura.Arquivos.filter(x=>x.Id != id);
      this.mostrarLoading = false;
    });
  }

  abrirArquivo(id : string) {
    console.log(id);
    window.open(this.apiTurmas.URLCORE + 'api/arquivo/'+id,'_blank');
  }

}
