import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { ApiTurmasService } from 'src/app/shared/api.turmas.service';

@Component({
  selector: 'app-lista-anexos',
  templateUrl: './lista-anexos.component.html',
  styleUrls: ['./lista-anexos.component.css']
})
export class ListaAnexosComponent implements OnInit {
  @Input() turma: string;
  listaArquivos = [];

  getListOfFile() {
    this.api.getListOfAnexos(this.turma).then(resp => {
      this.listaArquivos = resp;
      console.log("Lista arquivos: ", this.listaArquivos);
    });
  }

  constructor(
    private api: ApiTurmasService
  ) { }

  ngOnInit() {
      setTimeout(this.getListOfFile.bind(this), 2000);
  }

}
