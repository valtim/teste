import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  dataSelecionada: Date;
  funcionalidades: string[];
  funcionalidadeSelecionada: string;
  carregando: boolean = true;
  registros: any[];
  nenhumRegistroEncontrado: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {    
    this.api.getLogFuncionalidades().then(funcionalidades => {
      this.carregando = false;
      this.funcionalidades = funcionalidades;
      this.funcionalidades.unshift('Todas');
    });
  }

  rodarRelatorio(): void {
    this.carregando = true;
    let data = "";
    if (this.dataSelecionada != null) {
      data = this.dataSelecionada.toString().split("T")[0];
    }
    let funcionalidade = "";
    if (this.funcionalidadeSelecionada != null) {
      funcionalidade = this.funcionalidadeSelecionada;
    }
    this.api.getLogs(funcionalidade,data).then(registros => {
      this.registros = registros;
      if ((this.registros == null) || (this.registros.length == 0)) {
        this.nenhumRegistroEncontrado = true;
      } else {
        this.nenhumRegistroEncontrado = false;
      }
      this.carregando = false;
    });
  }

}
