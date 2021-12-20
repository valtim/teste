import { Component, OnInit, Input } from '@angular/core';
import { Turma } from 'src/app/models/Turma';

@Component({
  selector: 'app-conteudo-curricular',
  templateUrl: './conteudo-curricular.component.html',
  styleUrls: ['./conteudo-curricular.component.css']
})
export class ConteudoCurricularComponent implements OnInit {

  turma: Turma;
  @Input() diasTurma = [];
  @Input() iPeriodo = 0;
  @Input() conteudos = [];

  constructor() { }

  ngOnInit(): void {
    
  }

  mostrarConteudo() {
    return this.conteudos[this.iPeriodo];
  }

}
