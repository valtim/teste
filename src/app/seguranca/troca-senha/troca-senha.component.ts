import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-troca-senha',
  templateUrl: './troca-senha.component.html',
  styleUrls: ['./troca-senha.component.css']
})
export class TrocaSenhaComponent implements OnInit {

  public user = {
    Username: '',
    Password: '',
    NewPassword: '',
    NewPassword2: ''
  };
  public loading = false;

  exibirMensagem = false;
  mensagem = '';

  constructor(private api: ApiService) { }

  ngOnInit() {
    // this.app.setTitle('Trocar Senha');
    this.user.Username = this.api.username;
  }

  retornoDoDialogo(retorno) {

    if (!retorno.Confirmado) {
      //this.closeModal('dialogo-jornada');
      this.exibirMensagem = false;
      return;
    }
  }


  saveNewPassword() {
    this.loading = true;
    this.api.postTrocaSenha(this.user).then((response) => {
      this.mensagem = "Senha alterada com sucesso!"
      this.exibirMensagem = true;
      this.loading = false;
    }).catch((error) => {
      if (error.status === 403) {
        this.mensagem = "Verifique sua antiga senha, ela não está correta."
        this.exibirMensagem = true;
        this.loading = false;
      }
      this.loading = false;
    });
  }

}
