import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-validar-jornada',
  templateUrl: './validar-jornada.component.html',
  styleUrls: ['./validar-jornada.component.css']
})
export class ValidarJornadaComponent implements OnInit {


  data = new Date();
  dados;
  
  locale_pt;

  gerente : boolean = false ;
  analista : boolean = false ;

  carregando = true;


  constructor(private api: ApiService) {
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

}
