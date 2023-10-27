import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css'],
  providers: [MessageService]
})
export class TituloComponent implements OnInit {

  @Input() titulo;
  @Input() carregando;

  exibir = false;

  currentApplicationVersion;

  usuario;

  constructor(private api: ApiService, private messageService: MessageService) { }

  ngOnInit() {
    this.api.getUsuarioLogado(window.location.href).then(x => {
      this.usuario = x;
      this.currentApplicationVersion = environment.appVersion;
    }).catch(x => {
      if (x.status == 401) {
        this.messageService.add({ severity: 'error', summary: 'Sessão Encerrada', detail: 'Sua sessão foi encerrada, será necessário logar novamente' });
        window.location.href = "/logoff";
        return;
      }
      this.messageService.add({ severity: 'error', summary: 'Sessão Encerrada', detail: 'Erro ao tentar buscar e-mail do usuário, tente logar novamente' });
    })
  }

  exibir_menu() {
    this.exibir = !this.exibir;
  }

}
