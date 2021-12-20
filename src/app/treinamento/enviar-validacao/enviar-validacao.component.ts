import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { MessageService } from 'primeng/api';
import { ApiTurmasService } from 'src/app/shared/api.turmas.service';

@Component({
  selector: 'app-enviar-validacao',
  templateUrl: './enviar-validacao.component.html',
  styleUrls: ['./enviar-validacao.component.css'],
  providers: [MessageService]
})
export class EnviarValidacaoComponent implements OnInit {
  @Input() turma: string;
  listaEmails = ['calistene.Coluciuc@bristowgroup.com', 'paulo.lima@bristowgroup.com'];
  infosTurma: any;

  constructor(
    private api: ApiTurmasService,
    private messageService: MessageService
  ) { }

  createEmailJson(envolvido) {
    const inicio = new Date(envolvido.inicioTreinamento).toLocaleDateString();
    const fim = new Date(envolvido.fimTreinamento).toLocaleDateString();

    let html = `<h1>Prezado,</h1>`;
    html += `<p>O treinamento <b>${envolvido.nomeTreinamento}</b> `;
    html += `realizado no <b>${envolvido.local}</b> `;
    html += `entre os dias <b>${inicio}</b> e `;
    html += `<b>${fim}</b>, está disponível para sua validação.</p>`;
    html += `<p>Atenciosamente.</p>`;

    const envolvidoJson = {
      To : envolvido.email,
      CC : '',
      Bcc : 'williampereiradepaula@gmail.com',
      Subject : `Treinamento a ser Validado: ${envolvido.nomeTreinamento}`,
      HTML: html
    };

    return envolvidoJson;
  }

  onValidar() {
    this.listaEmails.forEach( item => {
      const notificar = {
        email: item,
        nomeTreinamento: this.infosTurma.treinamento.nome,
        local: this.infosTurma.local,
        inicioTreinamento: this.infosTurma.inicioTreinamento,
        fimTreinamento: this.infosTurma.fimTreinamento
      }
      const notificarEmail = this.createEmailJson(notificar);
      console.log(notificarEmail)
      this.api.postNotificarEnvolvidoTurma(notificarEmail).then(_ => _);
    });
    this.messageService.add({severity: 'success', summary: 'Sucesso!', detail: 'Treinamento enviado para validação'});
    this.api.postTurmaStatus({
      nome: 'Treinamento enviado para validação',
      completo: true,
      TurmaId: this.turma,
    }).then((resp) => {
      console.log(resp);
    });
  }

  ngOnInit() {
    if (this.turma) {
      this.api.getTurmaById(this.turma).then(resp => {
        this.infosTurma = resp;
      });
    }
  }

}
