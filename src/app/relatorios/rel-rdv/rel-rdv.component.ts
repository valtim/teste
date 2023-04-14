import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rel-rdv',
  templateUrl: './rel-rdv.component.html',
  styleUrls: ['./rel-rdv.component.css']
})
export class RelRdvComponent implements OnInit {
  semErros: any;

  constructor(private api: ApiService, private router: Router) { }

  rdv: any;
  tudoPronto = false;
  urlLogo: string;
  id_busca: string;
  cancelada: boolean = false;

  ngOnInit(): void {
    this.api.getClienteLogado().then(x => {
      this.urlLogo = `/assets/img/${x}.png`;
    });

    const lista = this.router.url.split('/');

    this.id_busca = lista[lista.length - 1];


    this.tudoPronto = false;
    this.api.getRDV(this.id_busca).then(x => {
      this.rdv = x;
      this.tudoPronto = true;
      this.semErros = true;
      this.cancelada = this.rdv.Cancelada;
    }).catch((e) => {
      if ( e.status == 404)
      {
        this.semErros = false;
        this.tudoPronto = true;
        alert('db não encontrado no banco');
      }
    })


  }

}
