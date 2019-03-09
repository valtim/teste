import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-troca-senha',
  templateUrl: './troca-senha.component.html',
  styleUrls: ['./troca-senha.component.css']
})
export class TrocaSenhaComponent implements OnInit {

  public user = {
    Username: '',
    Password: '',
    NewPassword: ''
  };
  public loading = false;

  constructor(private api: ApiService, private app: AppComponent) { }

  ngOnInit() {
    this.app.setTitle('Trocar Senha');
    this.user.Username = this.api.username;
  }

  saveNewPassword() {
    this.loading = true;
    this.api.postTrocaSenha(this.user).then((response) => {
      this.api.message = {
        show: true,
        type: 'success',
        title: 'Sucesso',
        message: 'Sua senha foi alterada com sucesso.'
      };
      this.loading = false;
    }).catch((error) => {
      if (error.status === 403) {
        this.api.message = {
          show: true,
          type: 'error',
          title: 'Senha incorreta',
          message: 'Verifique sua antiga senha, ela não está correta.'
        };
      }
      this.loading = false;
    });
  }

}
