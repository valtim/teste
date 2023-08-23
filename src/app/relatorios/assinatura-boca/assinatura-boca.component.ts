import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from "primeng/api";
import { ApiService } from 'src/app/shared/api.service';
import { ApiTurmasService } from 'src/app/shared/api.turmas.service';

@Component({
  selector: 'app-assinatura-boca',
  templateUrl: './assinatura-boca.component.html',
  styleUrls: ['./assinatura-boca.component.css'],
  providers: [MessageService]
})
export class AssinaturaBocaComponent implements OnInit {

  @Input() DadosAssinatura: any;
  @Input() blobPDF: any;
  @Input() nomeArquivo: string;
  @Output() retorno = new EventEmitter();

  mostrarLoading = false;
  anexos: [];
  EmailAssinante: string;
  passo: number = 1;
  EsignUrl: '';
  idArquivoAssinado: string;
  EmailsDestino:string[] = [];
  assinaturasRDVs: [];

  constructor(private api: ApiService, private apiTurmas: ApiTurmasService, private router: Router, private messageService: MessageService) { }

  ngOnInit(): void {    
    this.mostrarLoading = true;
    this.passo = 1;

    this.criarArquivoBoca(()=>{            

      if ((this.DadosAssinatura.Emails != null) && (this.DadosAssinatura.Emails.length > 0)) {
        this.EmailAssinante = this.DadosAssinatura.Emails[0].Email;
        if ((this.DadosAssinatura.Emails[0].EsignUrl) && (this.DadosAssinatura.Emails[0].EsignUrl != '')) {
          this.passo = 2;
          this.EsignUrl = this.DadosAssinatura.Emails[0].EsignUrl;
        }
      } else {
        this.EmailAssinante = "suporte@sistemasol.com.br";
      }

      // Para testes
      //this.EmailAssinante = 'lgapontes@gmail.com';
      
      if ((this.DadosAssinatura.BocaEmails != null) && (this.DadosAssinatura.BocaEmails.length > 0)) {
        this.EmailsDestino = this.DadosAssinatura.BocaEmails.map(function(item: string) {
          return item['Email'];
        });        

        // Para testes
        /*
        this.EmailsDestino = [];
        this.EmailsDestino.push('lgapontes@gmail.com');
        this.EmailsDestino.push('contato.flechamagica@gmail.com');        
        */
      }

      this.organizarArquivos(()=>{        
        if (
          (this.DadosAssinatura.Assinatura) &&
          (this.DadosAssinatura.Assinatura.Assinado) &&
          (this.DadosAssinatura.AssinaturaBoca) &&
          (this.DadosAssinatura.AssinaturaBoca.ArquivoAssinado) &&
          (this.DadosAssinatura.AssinaturaBoca.ArquivoAssinado.Id)
        ) {
          this.DadosAssinatura.Status = true;
          this.idArquivoAssinado = this.DadosAssinatura.AssinaturaBoca.ArquivoAssinado.Id;
          this.passo = 3;
        }
  
        this.verificarStatusRDVs();
      });                        
    });    

  }

  verificarStatusRDVs() {
    this.mostrarLoading = true;
    
    if ( (this.DadosAssinatura.DiariosDeBordo) && (this.DadosAssinatura.DiariosDeBordo.length > 0) ) {
      let DiariosDeBordo_Id = this.DadosAssinatura.DiariosDeBordo.map((diario: any) => { return diario['Id']; });
      
      this.api.postStatusAssinaturaBoca({
        DiariosDeBordo_Id: DiariosDeBordo_Id
      }).then((dadosAssinaturas: any) => {                            
        this.assinaturasRDVs = dadosAssinaturas;        

        let todosAssinados = this.assinaturasRDVs.every(v => v['Assinado']);        
        if (todosAssinados && (this.passo >= 3)) {
          this.passo = 4;
          
          if (this.DadosAssinatura.AssinaturaBoca.Enviado) {
            this.DadosAssinatura.atualizar(true);           
            this.passo = 5;
          }          
        }

        this.mostrarLoading = false;
      });
    } else {
      this.mostrarLoading = false;
    }
  }

  abrirLinkRDV(NumeroDaFolha) {
    window.open('rel-rdv/'+NumeroDaFolha,'_blank');
  }

  validarEmailChips(email) {
    if (this.validarEmail(email.value)) {
      return true;
    } else {
      this.EmailsDestino.pop();
      this.messageService.add({ severity: 'error', summary: 'Erro:', detail: 'E-mail inválido!' });
      return false;
    }    
  }

  validarEmail(email): boolean {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );    
  }

  obterStatusAssinatura(): string {
    if (this.passo < 4) {
      return "PASSO 1 - Gerar PDFs de todos os RDVs"
    }
    if (this.passo == 4) {
      return "PASSO 4 - Envie os manifestos de voos"
    }
    return 'Assinatura realizada!';
  }

  criarArquivoBoca(callback): void {
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

  organizarArquivos(callback): void {        

    this.api.assinarBoca(this.DadosAssinatura.Assinatura.Id,this.EmailAssinante,this.nomeArquivo).then((dados: any) => {                    
      
      this.DadosAssinatura.Assinatura = dados.Assinatura;      
      this.DadosAssinatura.AssinaturaBoca = dados.AssinaturaBoca;                          

      if ((dados.EsignUrl) && (dados.EsignUrl != '')) {                        
        if ((this.DadosAssinatura.Emails != null) && (this.DadosAssinatura.Emails.length > 0)) {                          
          this.DadosAssinatura.Emails[0].Email = dados.EmailAssinante;
          this.DadosAssinatura.Emails[0].EsignUrl = dados.EsignUrl;
        }

        this.EsignUrl = dados.EsignUrl;                              
        this.passo = 2;        
      }          
      
      callback();
    });
    
    /*
    if (!this.validarEmail(this.EmailAssinante)) {
      this.messageService.add({ severity: 'error', summary: 'Erro:', detail: 'E-mail inválido!' });
    } else {
      
    } 
    */   
  }

  enviarManifesto(): void {
    this.mostrarLoading = true;

    if (this.passo = 4) {

      if (this.EmailsDestino.length == 0) {
        this.messageService.add({ severity: 'error', summary: 'Erro:', detail: 'Preencha ao menos um e-mail para receber os manifestos!' });
        this.mostrarLoading = false;
      } else {
        let base = '';
        if ((this.DadosAssinatura.AssinaturaBoca.BaseDoTripulante) && (this.DadosAssinatura.AssinaturaBoca.BaseDoTripulante.ICAO)) {
          base = ' - ' + this.DadosAssinatura.AssinaturaBoca.BaseDoTripulante.ICAO;
        }
        
        let data = '';
        if (this.DadosAssinatura.AssinaturaBoca.BocaData) {
          let partes = this.DadosAssinatura.AssinaturaBoca.BocaData.split('-');               
          if (partes.length == 3) {
            // 2023-06-05
            data = ' - ' + partes[2] + '/' + partes[1] + '/' + partes[0];
          }
        }      

        let DiariosDeBordo_Id = this.DadosAssinatura.DiariosDeBordo.map((diario: any) => { return diario['Id']; });

        let emailManifestos = this.createEmailJson(
          this.EmailsDestino,
          base,
          data,
          this.DadosAssinatura.Assinatura.Id,
          DiariosDeBordo_Id
        );        

        this.api.postEmailManifestos(emailManifestos).then(retorno=>{                        
          if (retorno.Enviado) {
            this.DadosAssinatura.atualizar(true);
            this.DadosAssinatura.AssinaturaBoca.Enviado = true;
            this.passo = 5;
            this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Relatório de Manifestos enviado com sucesso!' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Erro:', detail: 'Ocorreu um erro ao enviar o email dos manifestos!' });
          }

          this.mostrarLoading = false;
        });
      }
            
    }
  }

  createEmailJson(emails,base,data,id,DiariosDeBordo_Id) {
    let html = `Prezados,`;
    html += `Seguem anexos Boca e RDV's de SBVT do dia ${data}.`;
    html += `<br><br>`;
    html += `Bristow Group, Inc.<br>`;
    html += `Cabo Frio Airport<br>`;
    html += `Cabo Frio, RJ, 28900-000<br>`;
    html += `Office: +55 (22) 2647-9584`;
    html += `<br><br>`;
    html += `Confidence in flight. Worldwide.`;

    const envolvidoJson = {
      To : emails,
      CC : '',
      Bcc : '',
      Subject : `RELATÓRIOS E MANIFESTOS DE VOOS BRISTOW${base}${data}`,
      HTML: html,
      Assinatura_Id: id,
      DiariosDeBordo_Id: DiariosDeBordo_Id
    };

    return envolvidoJson;
  }

  assinarArquivos(): void {
    if (this.EsignUrl != '') {
      window.open(this.EsignUrl, "_blank");      
    } else {      
      this.messageService.add({ severity: 'error', summary: 'Erro:', detail: 'Não foi possível gerar o link de assinatura!' });
    }    
  }

  verificarAssinatura(): void {      
    this.mostrarLoading = true;
    
    this.api.obterStatusBoca(this.DadosAssinatura.Assinatura.Id,this.nomeArquivo).then((dados: any) => {                

      if (dados.ErroGerarArquivo) {
        this.messageService.add({ severity: 'error', summary: 'Erro:', detail: 'A Assinatura ainda não foi realizada!' });
      } else {
        this.DadosAssinatura.Assinatura.Status = dados.Status;      
        this.DadosAssinatura.AssinaturaBoca.ArquivoAssinado = dados.ArquivoAssinado;
        this.DadosAssinatura.Status = dados.StatusAssinatura;
        this.idArquivoAssinado = dados.idArquivoAssinado;

        if ((this.DadosAssinatura.Status) && (this.idArquivoAssinado) && (this.idArquivoAssinado != '')) {
          this.passo = 3;
          this.messageService.add({ severity: 'success', summary: 'SOL Sistemas', detail: 'Assinatura foi realizada!' });                
        } else {
          this.messageService.add({ severity: 'error', summary: 'Erro:', detail: 'A Assinatura ainda não foi realizada!' });
        }
      }

      this.mostrarLoading = false;      
    });    
  }

  downloadArquivoAssinado(): void {
    if (this.passo >= 3) {
      this.abrirArquivo(this.idArquivoAssinado);
    }
  }

  uploadAnexos(event) {
    // Não precisa subir arquivos    
  }

  apagarAnexo(id : string){
    // Não pode apagar os anexos
  }

  abrirArquivo(id : string) {    
    window.open(this.apiTurmas.url + 'arquivo/'+id,'_blank');
  }

}
