import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { getLocaleDateTimeFormat } from '@angular/common';

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


  constructor(private api: ApiService) {
    this.locale_pt = this.api.getLocale('pt');
  }
  ngOnInit(): void {
    this.rodarRelatorioDeHoje();
  }


  rodarRelatorio(){


    this.api.getJornadaImpressaoPeloMesAno(this.data).then(x=>{
        this.dados = x.Jornadas;
        this.gerente = x.Gerente;
        this.analista = x.Analista;
    })
  }

  rodarRelatorioDeHoje(){


    this.api.getJornadaImpressaoPeloMesAno(new Date(Date.now())).then(x=>{
        this.dados = x.Jornadas;
        this.gerente = x.Gerente;
        this.analista = x.Analista;
    })
  }

}
