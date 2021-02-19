import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent implements OnInit {

  constructor() { }

  ordenacao = (a, b): number => {
    if (a.Ordem != b.Ordem)
      return a.Ordem - b.Ordem;

    if (a.Nome > b.Nome) {
      return 1;
    }
    return -1;

  }

  ngOnInit(): void {
  }

}
