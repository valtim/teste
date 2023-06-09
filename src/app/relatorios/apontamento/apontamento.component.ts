import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../shared/api.service";

@Component({
  selector: 'app-apontamento',
  templateUrl: './apontamento.component.html',
  styleUrls: ['./apontamento.component.css']
})
export class ApontamentoComponent implements OnInit {

  tudoPronto: boolean;
  dataSelecionada: Date;
  apontamentos: any[];
  codigos: any[];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    var date = new Date();
    this.dataSelecionada = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.rodarRelatorio();
  }

  rodarRelatorio(){
    this.tudoPronto = false;

    this.api.getApontamentos(this.dataSelecionada.getMonth(),this.dataSelecionada.getFullYear()).then(x => {
      this.codigos = x.Codigos;
      this.apontamentos = x.Apontamentos;      
      this.tudoPronto = true;
    });        
  }

}
