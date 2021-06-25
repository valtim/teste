import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-listar-jornada',
  templateUrl: './listar-jornada.component.html',
  styleUrls: ['./listar-jornada.component.css']
})
export class ListarJornadaComponent implements OnInit {


  data = new Date();
  dados;
  
  locale_pt;

  gerente : boolean = false ;
  analista : boolean = false ;

  carregando = true;


  constructor(private api: ApiService, private router: Router) {
    this.locale_pt = this.api.getLocale('pt');
  }
  ngOnInit(): void {
    this.rodarRelatorio();
  }


  rodarRelatorio(){

    this.carregando = true;

    this.api.getJornadaImpressaoPeloMesAno(this.data).then(x=>{
        this.dados = x.Jornadas;
        this.gerente = x.Gerente;
        this.analista = x.Analista;
        this.carregando = false;
    })
  }

  imprimir(id : string){
    window.open(`https://aeroleo.controledafadiga.com.br/imprimir-jornada/${id}`);
  }

}
