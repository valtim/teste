import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { MessageService } from 'primeng/api';
import { ApiTurmasService } from 'src/app/shared/api.turmas.service';

@Component({
  selector: 'app-notificar-envolvidos',
  templateUrl: './notificar-envolvidos.component.html',
  styleUrls: ['./notificar-envolvidos.component.css'],
  providers: [MessageService]
})
export class NotificarEnvolvidosComponent implements OnInit {
  @Input() turma: string;
  listaEnvolvidos = [];

  constructor(
    private api: ApiTurmasService,
    private messageService: MessageService
  ) { }

  createEmailJson(envolvido) {
    const inicio = new Date(envolvido.inicioTreinamento).toLocaleDateString();
    const fim = new Date(envolvido.fimTreinamento).toLocaleDateString();

    let html = `<h1>Olá ${envolvido.nome}</h1>`;
    html += `<p>Você foi matriculado no treinamento <b>${envolvido.nomeTreinamento}</b> `;
    html += `que ocorrerá em <b>${envolvido.local}</b> `;
    html += `entre os dias <b>${inicio}</b> e `;
    html += `<b>${fim}.</p>`;
    html += `<p>Atenciosamente, Setor de Treinamentos.</p>`;

    const envolvidoJson = {
      To : envolvido.email,
      CC : '',
      Bcc : '',
      Subject : `Treinamento: ${envolvido.nomeTreinamento}`,
      HTML: html
    };

    return envolvidoJson;
  }

  onNotificar() {
    this.listaEnvolvidos.forEach( item => {
      const envolvido = this.createEmailJson(item);
      this.api.postNotificarEnvolvidoTurma(envolvido).then(_ => _);
    });
    this.messageService.add({severity: 'success', summary: 'Sucesso!', detail: 'Notificação feita'});
    this.api.postTurmaStatus({
      nome: 'Notificação aos envolvidos',
      completo: true,
      TurmaId: this.turma,
    }).then((resp) => {
      console.log(resp);
    });
  }

  ngOnInit() {
    if (this.turma) {
      this.api.getEnvolvidosTurma(this.turma).then(resp => this.listaEnvolvidos = resp);
    }
  }

}
