import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from "primeng/api";
import { ApiService } from 'src/app/shared/api.service';
import { GuidUtil } from 'src/app/shared/GuidUtil';

@Component({
  selector: 'app-assinatura-rdv',
  templateUrl: './assinatura-rdv.component.html',
  styleUrls: ['./assinatura-rdv.component.css'],
  providers: [MessageService]
})
export class AssinaturaRDVComponent implements OnInit {

  @Input() DadosAssinatura: any;
  @Output() retorno = new EventEmitter();

  mostrarLoading = false;
  liberarBotaoEnviarEmail = false;

  constructor(private api: ApiService, private router: Router, private messageService: MessageService) { }

  obterOuCriarAssinatura(): void {
    let criar = false;
    if (!this.DadosAssinatura.Assinatura) criar = true;
    else if (!this.DadosAssinatura.Assinatura.Id) criar = true;    

    if (criar) {
      this.DadosAssinatura.Assinatura = {
        Id: GuidUtil.NewGuid(),        
        TransientDocumentId: null,
        AgreementId: null,
        Status: '',
        Arquivos: []
      };
      this.DadosAssinatura.AssinaturaRDV = {
        Id: GuidUtil.NewGuid(),
        Assinatura: this.DadosAssinatura.Assinatura,
        DiarioDeBordo: this.DadosAssinatura.DiarioDeBordo,
        NumeroDaFolha: this.DadosAssinatura.DiarioDeBordo.NumeroDaFolha
      };
      if (this.DadosAssinatura.Emails && this.DadosAssinatura.Emails.length == 1) {
        this.DadosAssinatura.Emails[0].Assinatura = this.DadosAssinatura.Assinatura;                        
      }
    }
  }

  ngOnInit(): void {
    this.mostrarLoading = true;
    this.obterOuCriarAssinatura();

    this.liberarBotaoEnviarEmail = true;
    //this.DadosAssinatura.Status = true;
    this.mostrarLoading = false;
  }

  enviarEmail(): void {
    this.mostrarLoading = false;
    this.liberarBotaoEnviarEmail = false;
    this.retorno.emit();
  }

}
