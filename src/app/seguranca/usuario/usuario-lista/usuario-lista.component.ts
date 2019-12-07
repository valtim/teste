import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent implements OnInit {

  public usuarios = [];
  public trato = '';
  public loading = false;
  private usuariosFiter = [];
  private saveUsuarios = [];

  constructor(
    private api: ApiService,
    private app: AppComponent,
    private router: Router) { }

  ngOnInit() {
    // this.app.setTitle('Usuários');
    this.loading = true;
    this.api.getUsuario().then((response: any) => {
      this.usuarios = response.Lista;
      this.usuariosFiter = this.usuarios;
      this.loading = false;
    });
  }

  search() {
    this.usuarios = this.usuariosFiter.filter((usuario) => {
      if (!this.trato) {
        return true;
      }
      return this.trato && usuario.Username.toLowerCase().includes(this.trato.toLowerCase());
    });
  }

  excluirUsuario(e: any) {
    if (e.target.checked) {
      this.saveUsuarios.push(this.usuarios.filter((usuario) => {
        return usuario.Id === e.target.name;
      })[0]);

      this.saveUsuarios.map((usuario) => {
        usuario.Ativo = false;
      });
    } else {
      for (let index = 0; index < this.saveUsuarios.length; index++) {
        if (this.saveUsuarios[index].Id === e.target.name) {
          this.saveUsuarios.splice(index, 1);
        }
      }
    }
  }

  saveUsuario() {
    this.loading = true;
    this.api.postUsuario(this.saveUsuarios).then((response) => {
      this.api.message = {
        show: true,
        type: 'success',
        title: 'Sucesso',
        message: 'As informações do usuário foram salvas com sucesso.'
      };
      this.loading = false;
    });
  }

  novoUsuario() {
    this.router.navigate(['usuario/novo']);
  }

}
