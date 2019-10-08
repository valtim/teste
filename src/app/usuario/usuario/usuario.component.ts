import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  public usuario = {
    Id: '',
    Username: '',
    Tripulante: { Id: '' },
    Senha: '',
    PerfisHabilitados: []
  };
  public loading = false;
  public tripulantes = [];
  public perfis = [];
  constructor(
    private app: AppComponent,
    private route: ActivatedRoute,
    private api: ApiService) { }

  ngOnInit() {
    this.app.setTitle('Usuário');
    this.loading = true;
    if (this.route.snapshot.paramMap.get('id') !== 'novo') {
      this.api.getUsuario().then((response: any) => {
        this.tripulantes = response.Tripulantes;
        this.perfis = response.Perfil;
        this.usuario = (response.Lista as Array<any>).filter((user) => {
          return user.Id === this.route.snapshot.paramMap.get('id');
        })[0];
        if (!this.usuario.Tripulante) {
          this.usuario.Tripulante = {
            Id: ''
          };
        }
        this.loading = false;
      });
    } else {
      this.api.getUsuario().then((response: any) => {
        this.tripulantes = response.Tripulantes;
        this.perfis = response.Perfil;
        this.loading = false;
      });
    }
  }

  addRemoreAcesso(event: any) {
    if (event.target.checked) {
      this.usuario.PerfisHabilitados.push({
        Id: event.target.value
      });
    } else {
      this.usuario.PerfisHabilitados.splice(this.usuario.PerfisHabilitados.indexOf({ Id: event.target.value }), 1);
    }
  }

  checkPerfil(id: string) {
    return this.usuario.PerfisHabilitados.filter((perfil) => {
      return perfil.Id === id;
    }).length;
  }

  saveUsuario() {
    if (!this.usuario.Tripulante.Id) {
      this.usuario.Tripulante = null;
    }

    this.loading = true;
    this.api.postUsuario([this.usuario]).then((response) => {
      this.api.message = {
        show: true,
        type: 'success',
        title: 'Sucesso',
        message: 'As informações do usuário foram salvas com sucesso.'
      };
      this.loading = false;
    });
  }

}
