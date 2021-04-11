import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rel-rdv',
  templateUrl: './rel-rdv.component.html',
  styleUrls: ['./rel-rdv.component.css']
})
export class RelRdvComponent implements OnInit {

  constructor(private api : ApiService, private router: Router) { }

  rdv;

  tudoPronto = false;

  urlLogo;


  id_busca;

  ngOnInit(): void {
    this.urlLogo = this.api.getLogo();

    const lista = this.router.url.split('/');

    this.id_busca = lista[lista.length -1];


    this.tudoPronto = false;
    this.api.postRelRDV (
      {
        rdv : this.id_busca,
      }).then(x => {
        this.rdv = x.valores[0];
        // this.rdv.Linhas.forEach(x => {
        //   x.
        // });
        this.tudoPronto = true;
      })


  }

}
