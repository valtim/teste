import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {

  @Input() certTreinamento: any;
  @Input() certAluno: any;
  @Input() certInstrutor: any;
  @Input() dataConclusao: any;
  @Input() localCurso: any;

  treinamento: any;
  aluno: any;
  instrutor: any;
  conclusao: Date;
  local: string;

  ngOnInit(): void {
    this.aluno = this.certAluno;
    this.treinamento = this.certTreinamento;
    this.instrutor = this.certInstrutor;
    this.conclusao = this.dataConclusao[1];
    this.local = this.localCurso;
  }

}
