import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-troca-senha',
  templateUrl: './troca-senha.component.html',
  styleUrls: ['./troca-senha.component.css']
})
export class TrocaSenhaComponent implements OnInit {

  public username: string;
  public senhaAntiga: string;
  public senhaNova: string;

  constructor(private api: ApiService, private app: AppComponent) { }

  ngOnInit() {
    this.app.setTitle('Trocar Senha');
    this.username = this.api.username;
  }

  saveNewPassword() {
    const user = {
      Username: this.username,
      Password: this.senhaAntiga,
      NewPassword: this.senhaNova
    };
    this.api.postTrocaSenha(user).then((response) => {

    });
  }

}
