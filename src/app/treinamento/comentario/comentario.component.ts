import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { ApiTurmasService } from 'src/app/shared/api.turmas.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {
  private httpOptions: any;

  @Input() turma: string;
  comentarios = [];
  perfil: any;

  constructor(
    private api: ApiTurmasService
  ) { }

  ngOnInit() {
    this.api.getUsuarioLogado().then(resp => {
      this.perfil = resp;
    });
    this.getComentarios();
  }



  onSubmit(f: NgForm) {

    if (f.valid) {
      console.log('Perfil: ', this.perfil);

      const novoComentario = {
        comentario: f.value.comentario,
        TurmaId: this.turma,
        instrutorId: '30ce7d00-e078-11e7-a923-0026b94bb39e'
      };

      this.api.postComentario(novoComentario).then(resp => {
        this.getComentarios();
      });

      f.setValue({
        comentario: ''
      });

    }
  }

  getComentarios() {
    this.api.getComentariosByTurma(this.turma).then(resp => this.comentarios = resp);
  }

}
