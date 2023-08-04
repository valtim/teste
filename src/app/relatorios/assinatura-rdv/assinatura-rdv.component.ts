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
  @Input() nomeArquivo: string;    
  @Output() retorno = new EventEmitter();

  mostrarLoading = false;
  anexos = [];
  EmailAssinante: string;
  passo: number = 1;
  EsignUrl: '';
  idJoinArquivosAssinado: string;

  constructor(private api: ApiService, private apiTurmas: ApiTurmasService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {    
    this.mostrarLoading = true;
    this.passo = 1;

    this.criarArquivoRDV(()=>{            

      if ((this.DadosAssinatura.Emails != null) && (this.DadosAssinatura.Emails.length > 0)) {
        this.EmailAssinante = this.DadosAssinatura.Emails[0].Email;
        if ((this.DadosAssinatura.Emails[0].EsignUrl) && (this.DadosAssinatura.Emails[0].EsignUrl != '')) {
          this.passo = 3;
          this.EsignUrl = this.DadosAssinatura.Emails[0].EsignUrl;
        }
      } else {
        this.EmailAssinante = "suporte@sistemasol.com.br";
      }

      // Para testes
      // this.EmailAssinante = 'lgapontes@gmail.com';

      if (
        (this.DadosAssinatura.AssinaturaRDV) &&
        (this.DadosAssinatura.AssinaturaRDV.JoinArquivosSemAssinar) &&
        (this.DadosAssinatura.AssinaturaRDV.JoinArquivosSemAssinar.Id) &&
        (this.passo == 3)
      ) {
        this.passo = 4;
      }

      if (
        (this.DadosAssinatura.Assinatura) &&
        (this.DadosAssinatura.Assinatura.Assinado) &&
        (this.DadosAssinatura.AssinaturaRDV) &&
        (this.DadosAssinatura.AssinaturaRDV.JoinArquivosAssinado) &&
        (this.DadosAssinatura.AssinaturaRDV.JoinArquivosAssinado.Id) &&
        (this.passo == 4)
      ) {
        this.DadosAssinatura.Status = true;
        this.idJoinArquivosAssinado = this.DadosAssinatura.AssinaturaRDV.JoinArquivosAssinado.Id;
        this.passo = 5;
      }

      this.mostrarLoading = false;
    });    
  }

  obterStatusAssinatura(): string {
    if (this.passo == 1) {
      return "PASSO 1 - Upload dos arquivos"
    }
    if (this.passo == 2) {
      return "PASSO 2 - Confirmar e-mail e enviar arquivos"
    }
    if (this.passo == 3) {
      return "PASSO 3 - Assine os arquivos"
    }
    if (this.passo == 4) {
      return "PASSO 4 - Verifique a assinatura"
    }
    return 'Assinatura realizada!';
  }

  criarArquivoRDV(callback): void {
    if ((!this.DadosAssinatura.Assinatura) || (!this.DadosAssinatura.Assinatura.Arquivos) || (this.DadosAssinatura.Assinatura.Arquivos.length == 0)) {      
      const formData = new FormData();      

      this.nomeArquivo = this.nomeArquivo.replace(/ /g, '_');      
      formData.append('file[0]', this.blobPDF, this.nomeArquivo);
      this.apiTurmas.postUploadSign(this.DadosAssinatura.Assinatura.Id,formData).then((arquivos) => {
        this.DadosAssinatura.Assinatura.Arquivos = [];
        if ((arquivos) && (arquivos.length == 1)) {
          let arquivo = arquivos[0];          
          this.DadosAssinatura.Assinatura.Arquivos.push(arquivo);
        }                                
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
    if ((this.DadosAssinatura.Assinatura.Arquivos == null) || this.DadosAssinatura.Assinatura.Arquivos.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Erro:', detail: 'É necessário ter no mínimo 1 anexo para assinar!' });
    } else {
      if (!this.validarEmail(this.EmailAssinante)) {
        this.messageService.add({ severity: 'error', summary: 'Erro:', detail: 'E-mail inválido!' });
      } else {
        this.mostrarLoading = true;    

        this.api.assinarRDV(this.DadosAssinatura.Assinatura.Id,this.EmailAssinante,this.nomeArquivo).then((dados: any) => {                    
          this.DadosAssinatura.AssinaturaRDV.JoinArquivosSemAssinar = dados.JoinArquivosSemAssinar;
          this.DadosAssinatura.Assinatura.TransientDocumentId = dados.TransientDocumentId;
          this.DadosAssinatura.Assinatura.AgreementId = dados.AgreementId;
                    
          if ((dados.EsignUrl) && (dados.EsignUrl != '')) {                        
            if ((this.DadosAssinatura.Emails != null) && (this.DadosAssinatura.Emails.length > 0)) {                          
              this.DadosAssinatura.Emails[0].Email = dados.EmailAssinante;
              this.DadosAssinatura.Emails[0].EsignUrl = dados.EsignUrl;
            }

            this.EsignUrl = dados.EsignUrl;                              
            this.passo = 3;
          }          
          this.mostrarLoading = false;                
        });
      }
    }    
  }

  validarEmail(email): boolean {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );    
  }

  assinarArquivos(): void {
    if (this.EsignUrl != '') {
      window.open(this.EsignUrl, "_blank");
      this.passo = 4;
    } else {      
      this.messageService.add({ severity: 'error', summary: 'Erro:', detail: 'Não foi possível gerar o link de assinatura!' });
    }    
  }

  verificarAssinatura(): void {    
    this.mostrarLoading = true;
    
    this.api.obterStatusRDV(this.DadosAssinatura.Assinatura.Id,this.nomeArquivo).then((dados: any) => {                

      if (dados.ErroGerarArquivo) {
        this.messageService.add({ severity: 'error', summary: 'Erro:', detail: 'A Assinatura ainda não foi realizada!' });
      } else {
        this.DadosAssinatura.Assinatura.Status = dados.Status;      
        this.DadosAssinatura.AssinaturaRDV.JoinArquivosAssinado = dados.JoinArquivosAssinado;
        this.DadosAssinatura.Status = dados.StatusAssinatura;
        this.idJoinArquivosAssinado = dados.idJoinArquivosAssinado;

        if ((this.DadosAssinatura.Status) && (this.idJoinArquivosAssinado) && (this.idJoinArquivosAssinado != '')) {
          this.passo = 5;
          this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Assinatura foi realizada!' });      
          this.DadosAssinatura.atualizar(true);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Erro:', detail: 'A Assinatura ainda não foi realizada!' });
        }
      }

      this.mostrarLoading = false;      
    });
  }

  downloadArquivoAssinado(): void {
    if (this.passo == 5) {
      this.abrirArquivo(this.idJoinArquivosAssinado);
    }
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
              this.passo = 2;
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
    window.open(this.api.url + 'arquivo/'+id,'_blank');
  }

}
